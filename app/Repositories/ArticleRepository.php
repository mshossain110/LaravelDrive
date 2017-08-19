<?php

namespace App\Repositories;


use App\Article;
use App\Repositories\BaseRepository;


class ArticleRepository{

	/**
	 * Using base Repository class
	 */
	use BaseRepository;


	protected $model;

	public function __construct(Article $article){
		$this->model = $article;
	}
	
}

?>