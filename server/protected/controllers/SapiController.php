<?php

class SapiController extends Controller
{
    public function actionInsert()
    {

        $request = Yii::app()->request;

        if($request->isPostRequest) {
            $modelName = $request->getParam('model');
            $model = CActiveRecord::model(ucfirst($modelName));
            $data = $request->getParam('data',null);
            $data=json_decode($data,true);
            $model->setIsNewRecord(true);
            //$model->save(false,$data);
            if(is_array($data)) {

                foreach($data as $column=>$value):
                    $model->$column=$value;
                endforeach;
                if($model->save(false)){
                    return $this->sendJSON(array('status'=>200,'uid'=>$model->id));
                } else {
                    return $this->sendJSON(array('status'=>400));
                }

            }
        } else {
            throw new CHttpException(404);
        }

    }

    public function actionSession($action)
    {
        $request = Yii::app()->request;
        if($action==='set') {
            if($request->isPostRequest) {
                $_SESSION[$request->getParam('sess_name')]=$request->getParam('sess_val');
                return $this->sendJSON(array('status'=>200));
            }
        }
    }

    public function actionSave()
    {



        $data = array();
        $putData = json_decode(file_get_contents("php://input"),true);
        $modelName = stripslashes(strip_tags(trim(ucfirst($putData['model']))));

        foreach($putData['Data'] as $key=>$value) {
            $data[$key]=stripslashes(strip_tags(trim($putData['Data'][$key])));
        }
        $model = CActiveRecord::model(ucfirst($modelName));
        $pk = $data['id'];
        unset($data['id']);
        $user = $model->findByPk($pk);
        $user->attributes=$data;
        if($user->save(false)){
            return $this->sendJSON(array('status'=>200));
        }else {
            return $this->sendJSON(array('status'=>400));
        }

    }

    public function actionGet($model,$id)
    {
        $model = CActiveRecord::model(ucfirst($model));
        $data = $model->findByPk($id);
        $data->last_login=date("m-d-Y H:i",strtotime($data->last_login));
        return $this->sendJSON($data->attributes);

    }

    public function upload()
    {
        $file = $_FILES['file'];
        move_uploaded_file($_FILES["file"]["tmp_name"], dirname(__FILE__).'/../../../public/uploads/profile/' . $_FILES["file"]["name"]);
        echo 'OK';
    }


}