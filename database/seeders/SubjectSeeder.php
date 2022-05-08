<?php

namespace Database\Seeders;

use App\Models\Subjects;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
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

            0 => array('subject_name' => 'Maths','subject_code'=>'SUB001','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),
            1 => array('subject_name' => 'Science','subject_code'=>'SUB002','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),
            2 => array('subject_name' => 'History','subject_code'=>'SUB003','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),

        );
        Subjects::insert($dataArray);
    }
}
