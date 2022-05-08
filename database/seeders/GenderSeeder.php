<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $dataArray = array(

            0 => array('gender_type' => 'Male','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),
            1 => array('gender_type' => 'Female','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),
            2 => array('gender_type' => 'Others','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),

        );
        Gender::insert($dataArray);
    }
}
