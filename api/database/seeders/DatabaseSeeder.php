<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\User;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {


        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password'=>  bcrypt('Abc.123'),
            'user_level'=>1
        ]);
    }
}
