<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->increments('id');
			$table->string('name');
			$table->string('description', 150)->nullable();
			$table->string('file_name');
            $table->string('mime', 50)->nullable();
            $table->string('share_id', 20)->unique;
            $table->string('attach_id', 15)->unique()->nullable();
            $table->integer('file_size')->nullable()->unsigned();
            $table->integer('user_id')->nullable();
            $table->integer('folder_id')->nullable();
            $table->string('password')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
            $table->index('share_id');
            $table->index('attach_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
