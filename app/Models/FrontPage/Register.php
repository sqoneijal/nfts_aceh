<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Register extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function handleVerify($post = []) {
      try {
         $table = $this->db->table('tb_users');
         $table->where('email', $post['email']);
         $table->update([
            'password' => password_hash($post['password'], PASSWORD_BCRYPT),
            'modified' => date('Y-m-d H:i:s'),
            'status' => '1'
         ]);

         $this->setUserLogin($post['email']);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   protected function setUserLogin($email) {
      try {
         $table = $this->db->table('tb_users');
         $table->select('id, avatar, display_name, email, email as username');
         $table->where('email', $email);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = trim($data[$field]);
            }
         }
         
         $session = \Config\Services::session();
         $session->set($response);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function submit($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            if ($val) {
               $data[$key] = trim($val);
            } else {
               $data[$key] = is_numeric($val) ? $val : null;
            }
         }
         
         $data['role'] = '2';
         $data['uploaded'] = date('Y-m-d H:i:s');
         $data['email'] = strtolower($data['email']);
         $data['username'] = strtolower(explode('@', $data['email'])[0]);

         $table = $this->db->table('tb_users');
         $table->insert($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}