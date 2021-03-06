<?php

class UsersController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}


	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}

    public function actionInvite($id)
    {
        $date = date("Y-m-d H:i:s");
        $inviter=Yii::app()->session['uid'];
        $userId = intval($id);
        //check if inviter already intived this user
        $check = Invitations::model()->findAllBySql("SELECT `id` FROM invitations WHERE `from`=".intval($inviter)." AND `to`=".$userId." LIMIT 0,1");
        if(!$check) {
            //Next check, if user already have this friend
            $userModel = Users::model()->findByPk($inviter);
            if(!empty($userModel->friends)) {
                $friendsArray = explode(",",$userModel->friends);
                if(in_array($id,$friendsArray)){
                    $this->sendJSON(array('status'=>200,'msg'=>'Sorry! But alreadt have this person in friends'));
                }
            }
            Invitations::model()->setIsNewRecord(true);
            Invitations::model()->setAttributes(array('from'=>$inviter,'to'=>$userId,'date'=>$date));
            Invitations::model()->insert();
            $this->sendJSON(array('status'=>200,'msg'=>'You have sent invititaion to this person'));
        } else {
            $this->sendJSON(array('status'=>200,'msg'=>'Sorry! But you have already sent invitations to this person'));
        }
    }

    public function actionCheckinvite()
    {
        $uid = Yii::app()->session['uid'];
        $invitations = Invitations::model()->with('invitations')->findAllByAttributes(array('to'=>$uid));

        $intivationsAttr = array();
        foreach($invitations as $key=>$object){
            $intivationsAttr[$key] = $object->attributes;
            $intivationsAttr[$key] = $object->invitations->attributes;
        }
        $this->sendJSON($intivationsAttr);

    }

    public function actionGetuser($id)
    {
        $model = Users::model()->findByPk($id);
        $model->last_login=date("m-d-Y H:i",strtotime($model->last_login));
        $this->sendJSON($model->attributes);
    }

    public function actionAuthenticate()
    {
        $cookies = Yii::app()->request->cookies;
        if(isset($cookies['rememberme'])) {
            $model = Users::model()->find($cookies['rememberme']->value);
            Yii::app()->session->add('uid', $model->id);
            $this->sendJSON(array('uid'=>Yii::app()->session['uid']));
        }

        if(isset($_SESSION['uid'])) {
            $this->sendJSON(array('uid'=>$_SESSION['uid']));
        } else {
            $this->sendJSON(array('uid'=>null));
        }
    }

    public function actionChangepassword()
    {
        $data = array();
        $putData = json_decode(file_get_contents("php://input"),true);
        $modelName = stripslashes(strip_tags(trim(ucfirst($putData['model']))));

        foreach($putData['Data'] as $key=>$value) {
            $data[$key]=stripslashes(strip_tags(trim($putData['Data'][$key])));
        }
        $model = CActiveRecord::model(ucfirst($modelName));
        $pk = $data['id'];
        $currentPass = $data['cur_pass'];
        unset( $data['cur_pass']);
        unset($data['id']);
        $user = $model->findByPk($pk);
        if($user->password !== $currentPass) {
            return $this->sendJSON(array('status'=>400,'msg'=>'Your current password isn\'t correct'));
        }
        $user->attributes=$data;
        if($user->save(false)){
            return $this->sendJSON(array('status'=>200));
        }else {
            return $this->sendJSON(array('status'=>400));
        }
    }

    public function actionGetrole()
    {
        $session = new CHttpSession();
        $session->open();
        if(isset($session['role'])) {
           $this->sendJSON(array('role'=>$session['role']));
        } else {
            $this->sendJSON(array('role'=>0));
        }
    }

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Users;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST))
		{
            $data = json_decode(file_get_contents("php://input"),true);
            $ckeckExistingUser = Users::model()->findByAttributes(array('email'=>$data['email']));
            if($ckeckExistingUser) {
                $this->sendJSON(array('status'=>500,'msg'=>'Sorry! But current email already exists'));
            }
			$model->attributes=$data;
            if($model->save(false)) {
                Yii::app()->session->add('uid', $model->id);
				$this->sendJSON(array('status'=>200,'id'=>$model->id));
            } else {
                $this->sendJSON(array('status'=>500));
            }
		}


	}

    public function actionGetall($limit=false,$offset=0)
    {
        if($limit !== false && is_numeric(intval($limit))) {

             $usersCollection = Users::model()->findAllBySql("SELECT * FROM users LIMIT ".$offset.",".$limit);
        } else {
             $usersCollection = Users::model()->findAll();
        }

        $usersAttributes = array();
        foreach($usersCollection as $key=>$object){
            $usersAttributes[] = $object->attributes;
        }
        $this->sendJSON($usersAttributes);
    }



    public function actionFriends($id)
    {
        $user = $this->loadModel($id);
        $userFriends = $user->friends;// '2,13'
        $usersArray = explode(",",$userFriends);
        $users = ($userFriends) ? array() : null;
        if(is_array($users)) {
            foreach($usersArray as $currentUser):
                $thisUser=Users::model()->findByPk($currentUser);
                $users[]=$thisUser->attributes;
            endforeach;
        }
        $this->sendJSON($users);

    }

    public function actionSearch($value)
    {
        $ctiteria = new CDbCriteria();
        $ctiteria->addSearchCondition('firstname',$value);
        $ctiteria->addSearchCondition('lastname',$value,true,'OR');
        $usersCollection=Users::model()->findAll($ctiteria);

        $usersAttributes = array();
        foreach($usersCollection as $key=>$object){
            $usersAttributes[] = $object->attributes;
        }
        $this->sendJSON($usersAttributes);
    }


    /**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Users']))
		{
			$model->attributes=$_POST['Users'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}



    public function actionLogout()
    {

        $model = Users::model()->findByPk(Yii::app()->session->get('uid'));
        $timeZone = new DateTimeZone('Europe/Minsk');
        $dateTime = new EDateTime('now',$timeZone);
        $model->last_login=$dateTime->__toString();
        $model->save();
        Yii::app()->getSession()->destroy();
        Yii::app()->request->cookies->clear();
        //unset(Yii::app()->request->cookies['rememberme']);
        $this->sendJSON(array('status'=>200));
    }


    public function actionLogin()
    {
        if(isset($_POST['data'])) {
            $data = $_POST['data'];
            $model = Users::model()->findByAttributes(array('email'=>$data['email'],'password'=>$data['password']));
            if($model) {
                if(isset($data['rememberme'])){
                    $cookie = new CHttpCookie('rememberme', $model->id);
                    $cookie->expire = time()+60*60*24*180;
                    Yii::app()->request->cookies['rememberme'] = $cookie;
                }
                Yii::app()->session->add('uid', $model->id);
                Yii::app()->session->add('role', 1);
                $this->sendJSON(array('status'=>200));
            }

        }
    }

    public function actionDeletefriend($id)
    {
        $currentUser = $this->loadModel($_SESSION['uid']);
        $friendsArray = explode(",",$currentUser->friends);
        $newFriend = array();
        foreach($friendsArray as $currentFriend):
            if($currentFriend===$id){
                continue;
            }
            $newFriend[]=$currentFriend;
        endforeach;
        $currentUser->friends=implode(",",$newFriend);
        $currentUser->save();
        //Delete this friend from another user
        $anotherUser = $this->loadModel($id);
        $friendsArray = explode(",",$anotherUser->friends);
        $newFriend = array();
        foreach($friendsArray as $currentFriend):
            if(intval($currentFriend)===intval(Yii::app()->session['uid'])){
                continue;
            }
            $newFriend[]=$currentFriend;
        endforeach;
        $anotherUser->friends=implode(",",$newFriend);
        $anotherUser->save();
        $this->sendJSON(array('status'=>200));
    }

    public function actionRefuseinvite($id)
    {
        $currentUser = Yii::app()->session['uid'];
        $model = Invitations::model()->findByAttributes(array('to'=>$currentUser,'from'=>$id));
        $model->delete();
        $this->sendJSON(array('status'=>200,'msg'=>'You have refused the invitation'));
    }

    public function actionWritemessage($id)
    {
        $to = intval($id);
        $from = intval(Yii::app()->session['uid']);
        $date = date('Y-m-d H:i:s');
        $messageModel = new Messages();
        $messageModel->attributes = array('from'=>$from,'to'=>$to,'message'=>$_POST['message'],'date'=>$date);
        $messageModel->save(false);
        $this->sendJSON(array('status'=>200,'msg'=>'You have successfully sent a message'));
    }

    public function actionAcceptinvite($id)
    {
        $uid = intval(Yii::app()->session['uid']);
        $id = intval($id);
        $userModel = Users::model()->findByPk($uid);
        if(!empty($userModel->friends)){
            $friendArray = explode(",",$userModel->friends);
            $friendArray[]=$id;
            $newFriendList = implode(",",$friendArray);
            $userModel->friends = $newFriendList;
        } else {
            $userModel->friends = $id;
        }
        $userModel->save();
        $model = Invitations::model()->findByAttributes(array('to'=>$uid,'from'=>$id));
        $model->delete();

        $inviterModel = Users::model()->findByPk($id);
        if(!empty($inviterModel->friends)){
            $friendArray = explode(",",$userModel->friends);
            $friendArray[]=$uid;
            $newFriendList = implode(",",$friendArray);
            $inviterModel->friends = $newFriendList;
        } else {
            $inviterModel->friends = $uid;
        }
        $inviterModel->save();

        $this->sendJSON(array('status'=>200,'msg'=>'You have successfully added this person to yoe friend list'));



    }
	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{

		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Users');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Users('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Users']))
			$model->attributes=$_GET['Users'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Users the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Users::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Users $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='users-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
