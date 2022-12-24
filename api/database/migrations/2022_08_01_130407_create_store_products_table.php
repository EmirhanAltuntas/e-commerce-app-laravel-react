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
        Schema::create('store_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constranied()->references('id')->on('stores');;
            $table->foreignId('product_id')->constranied()->references('id')->on('products');;
            $table->float('price');
            $table->smallInteger('stock');
            $table->timestamps();
        });
    }



    public function down()
    {
        Schema::dropIfExists('store_products');
    }
};
