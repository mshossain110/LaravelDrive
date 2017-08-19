<?php
namespace App\Repositories;

/**
 *Basic Functionality for model Repositories
*/


trait BaseRepository
{

	/**
	 * Get Number of records
	 * 
	 * @return array
	 */

	public function getNumber(){
		return $this->model->count();
	}


	/**
	 * Get all records
	 * 
	 * @return array
	 */

	public function all(){
		return $this->model->all();
	}

	/**
	 * Get Model by id
	 * 
	 * @param $id model id
	 * @return object App\Model::class
	 */

	public function getById($id){
		return $this->model->findOrFail($id);
	}


	/**
	 * Get model get Number of Records
	 * 
	 * @param int $number  Number of Records
	 * @param String $sort orderby
	 * @param String $sortColumn
	 * 
	 * @return array records
	 */

	public function getRecords($number=10, $sort="desc", $sortColumn="created_at"){
		return $this->model->orderby($sortColumn, $sort)->paginate($number);
	}

	/**
	 * Delete the records
	 * 
	 * @param init $id
	 * @return mix;
	 */

	public function destroy($id){
		return $this->getById($id)->delete();
	}

	
}

?>