<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Upload extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getDetailEdit($post = []) {
      try {
         $table = $this->db->table('tb_nft');
         $table->where('id', $post['id']);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = trim($data[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function updateItem($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            if ($val) {
               $data[$key] = trim($val);
            } else {
               $data[$key] = is_numeric($val) ? $val : null;
            }
         }

         $data['modified'] = date('Y-m-d H:i:s');
         
         $table = $this->db->table('tb_nft');
         $table->where('id', $data['id']);
         $table->update($data);
         return $data['id'];
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

         $data['uploaded'] = date('Y-m-d H:i:s');
         
         $table = $this->db->table('tb_nft');
         $table->insert($data);
         return $this->db->insertID('tb_nft_id_seq');
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}