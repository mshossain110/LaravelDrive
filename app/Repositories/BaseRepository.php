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


	/**
	 * Store this model object
	 * 
	 * @param array $input
	 * @return mix object
	 * 
	 */

	public function store($input){
		return $this->save($this->model, $input);
	}

	/**
	 * Update The model Using id
	 * 
	 * @param init $id
	 * @return mix object
	 */

	public function update($id, $input){
		$this->model = $this->getById($id);

		return $this->save($this->model, $input);
	}

	/**
     * Update columns in the record by id.
     *
     * @param $id
     * @param $input
     * @return App\Model|User
     */
	
    public function updateColumn($id, $input)
    {
        $this->model = $this->getById($id);

        foreach ($input as $key => $value) {
            $this->model->{$key} = $value;
        }

        return $this->model->save();
    }

	/**
	 * Save model data bu model
	 * 
	 * @uses Use this function to save other model also
	 * 
	 * @param mix model object
	 * @param array $input
	 * 
	 * @return model object
	 */

	public function save($model, $input){
		$model->fill($input);

		$model->save();

		return $model;

	}

	
}

?>