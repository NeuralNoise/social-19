<?php

class NewsController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}


    public function actionGetall()
    {
        $newsCollection = News::model()->findAll();
        $newsAttributes = array();
        foreach($newsCollection as $key=>$object){
            $newsAttributes[] = $object->attributes;
        }
        $this->sendJSON($newsAttributes);
    }

    public function actionSearch($value)
    {
        $ctiteria = new CDbCriteria();
        $ctiteria->addSearchCondition('title',$value);
        $ctiteria->addSearchCondition('description',$value,true,'OR');
        $newsCollection=News::model()->findAll($ctiteria);

        $newsAttributes = array();
        foreach($newsCollection as $key=>$object){
            $newsAttributes[] = $object->attributes;
        }
        $this->sendJSON($newsAttributes);
    }

	// Uncomment the following methods and override them if needed
	/*
	public function filters()
	{
		// return the filter configuration for this controller, e.g.:
		return array(
			'inlineFilterName',
			array(
				'class'=>'path.to.FilterClass',
				'propertyName'=>'propertyValue',
			),
		);
	}

	public function actions()
	{
		// return external action classes, e.g.:
		return array(
			'action1'=>'path.to.ActionClass',
			'action2'=>array(
				'class'=>'path.to.AnotherActionClass',
				'propertyName'=>'propertyValue',
			),
		);
	}
	*/
}