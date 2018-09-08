<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFoldersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('folders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->text('path')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('parent')->nullable();
            $table->string('share_id', 20)->unique;
            $table->string('password')->nullable();
            $table->integer('created_by')->nullable();
            $table->integer('deleted_by')->nullable();
			$table->timestamps();
			$table->softDeletes();

            $table->index('user_id');
            $table->index('share_id');
            $table->index('parent');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('folders');
    }
}
