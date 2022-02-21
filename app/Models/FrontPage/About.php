<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class About extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function submit($post = []) {
      try {
         $getData = $this->getData();

         $data = [];
         foreach ($post as $key => $val) {
            if ($val) {
               $data[$key] = trim($val);
            } else {
               $data[$key] = is_numeric($val) ? $val : null;
            }
         }
         
         $data['content'] = htmlentities($data['content']);
         $data['modified'] = date('Y-m-d H:i:s');

         $table = $this->db->table('tb_about');
         if (count($getData) > 0) {
            $table->update($data);
         } else {
            $table->insert($data);
         }

         return ['status' => true, 'msg_response' => 'Data saved successfully.'];
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getData() {
      try {
         $table = $this->db->table('tb_about');
         
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

}