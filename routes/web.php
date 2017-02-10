<?php


Route::get('/', 'Home\MainController@index');

Route::post('/main/form/sendEmail', 'Home\FormsController@sendEmail');

Route::get('/blog', 'Blog\BlogController@index');