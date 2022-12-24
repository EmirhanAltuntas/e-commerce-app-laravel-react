<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temp_stores', function (Blueprint $table) {
            $table->id();
            $table->string('store_name');
            $table->string('tax_number');
            $table->string('tel_number');
            $table->boolean('status')->nullable()->default(false);
            $table->foreignId('user_id')->constranied()->references('id')->on('users');

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
        Schema::dropIfExists('temp_stores');
    }
};
