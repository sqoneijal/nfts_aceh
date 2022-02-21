<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Explorer extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getCreators($post = []) {
      try {
         $limit = 8;

         $table = $this->db->table('tb_users tu');
         $table->select('tu.id, tu.avatar, tu.display_name, tn.title, tn.image, tn.id as id_nft');
         $table->join('tb_nft tn', 'tn.id_user = tu.id');
         $table->orderBy('tn.id', 'desc');
         $table->limit($limit, (int) $post['page'] * $limit);

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