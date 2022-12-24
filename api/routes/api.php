<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\GetDataController;
use App\Http\Controllers\PhotosController;
use App\Http\Controllers\TempStoreController;
use App\Http\Controllers\TempEmployeeController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\StoreProductController;
use App\Http\Controllers\MailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/send-mail',[MailController::class,'sendEmail']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::get('products', [GetDataController::class, 'getProducts']);
Route::get('categories', [GetDataController::class, 'getCategories']);
Route::get('subcategories', [GetDataController::class, 'getSubCategories']);

Route::get('storeproducts', [GetDataController::class, 'getStoreProducts']);
Route::get('all-products', [GetDataController::class, 'getAllProducts']);

Route::get('sub-categories-by-cat-id', [GetDataController::class, 'getSubCategoriesByCategoryId']);


Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('get_user', [AuthController::class, 'get_user']);

    //product
    Route::post('product', [ProductController::class, 'add']);
    Route::put('product', [ProductController::class, 'update']);
    Route::delete('product/{id}', [ProductController::class, 'delete']);

    //category
    Route::post('category', [CategoryController::class, 'add']);
    Route::post('multiCategory', [CategoryController::class, 'addMulti']);
    Route::put('category',  [CategoryController::class, 'update']);
    Route::delete('category/{id}',  [CategoryController::class, 'delete']);

    //subcategory
    Route::post('subCategory', [SubCategoryController::class, 'add']);
    Route::post('multiSubCategory', [SubCategoryController::class, 'addMulti']);
    Route::put('subcategory',  [SubCategoryController::class, 'update']);
    Route::delete('subcategory/{id}',  [SubCategoryController::class, 'delete']);

    //temp_store
     Route::post('tempstore',[TempStoreController::class,'add']);
     Route::get('tempstores',[TempStoreController::class,'getTempStores']);
     Route::delete('tempstore/{id}',[TempStoreController::class,'delete']);

    //temp_employee
    Route::post('temp-employee',[TempEmployeeController::class,'add']);
    Route::delete('tempemployee/{id}',[TempEmployeeController::class,'delete']);
    Route::post('add-employee',[TempEmployeeController::class,'addEmployee']);
    Route::get('temp-employees',[TempEmployeeController::class,'getAll']);
    Route::get('tempemployees/{id}',[TempEmployeeController::class,'getByStoreId']);
    Route::get('store-employees/{id}',[TempEmployeeController::class,'getEmployeeByStoreId']);

     //store
     Route::post('store',[StoreController::class,'addStore']);
     Route::get('stores',[StoreController::class,'getStores']);
     Route::get('store/{id}',[StoreController::class,'getStoreById']);

     //store_product
     Route::post('store-product',[StoreProductController::class,'add']);

});
