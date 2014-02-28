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

    public function actionGetuser($id)
    {
        $model = Users::model()->find($id);
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

    public function actionGetall()
    {
        $usersCollection = Users::model()->findAll();
        $usersAttributes = array();
        foreach($usersCollection as $key=>$object){
            $usersAttributes[] = $object->attributes;
        }
        $this->sendJSON($usersAttributes);
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
