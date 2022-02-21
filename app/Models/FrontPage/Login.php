<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Login extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function submit($post = []) {
      try {
         $table = $this->db->table('tb_users');
         $table->select('id, avatar, display_name, email, email as username, password');
         $table->where('email', trim($post['username']));

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $row = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $row[$field] = trim($data[$field]);
            }
         }
         
         return password_verify($post['password'], $row['password']) ? $row : false;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}