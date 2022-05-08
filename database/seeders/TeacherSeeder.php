<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
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

            0 => array('teacher_name' => 'Teacher 1','teacher_code'=>'TCR001','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),
            1 => array('teacher_name' => 'Teacher 2','teacher_code'=>'TCR002','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),
            2 => array('teacher_name' => 'Teacher 3','teacher_code'=>'TCR003','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),

        );
        Teacher::insert($dataArray);
    }
}
