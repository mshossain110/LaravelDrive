<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname', 100);
            $table->string('lastname', 100);
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('password_set_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->string('phone', 14)->nullable();
            $table->string('avatar', 2048)->nullable();
            $table->string('locale', 5)->default('en');
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('zip')->nullable();
            $table->string('timezone')->nullable();
            $table->enum('gender', ['male', 'female', 'none'])->default('male');
            $table->enum('online', ['online', 'offline', 'away'])->default('offline');
            $table->enum('status', ['pending', 'active', 'suspend', 'cencel'])->default('pending');
            $table->timestamp('last_login_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
