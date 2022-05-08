<?php

namespace Database\Seeders;

use App\Models\Term;
use Illuminate\Database\Seeder;

class TermSeeder extends Seeder
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

            0 => array('term_name' => 'Term 1','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),
            1 => array('term_name' => 'Term 2','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),
            2 => array('term_name' => 'Term 3','is_active'=>'1','created_at' => date('Y-m-d H:i:s')),

        );
        Term::insert($dataArray);
    }
}
