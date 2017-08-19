<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            
            $table->string('title');
            $table->text('content')->nullable();
            $table->string('excerpt')->nullable();
            $table->string('slug')->unique();
            $table->string('thumbnail')->nullable();
            $table->string('status')->default('publish');
            $table->boolean('comment_status')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->integer('view_count')->unsigned()->default(0)->index();
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
