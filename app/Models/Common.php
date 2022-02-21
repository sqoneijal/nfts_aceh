<?php

namespace App\Models;

use CodeIgniter\Model;

class Common extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getDaftarKategori() {
      try {
         $table = $this->db->table('tb_mst_kategori');
         $table->orderBy('nama');

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = trim($val[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}