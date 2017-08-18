<?php

namespace App\Repositories;


use App\Article;


class ArticleRepository{


	protected $model;

	public function __construct(Article $article){
		$this->model = $article;
	}


	public function All(){
		return $this->model->get();
	}
}

?>