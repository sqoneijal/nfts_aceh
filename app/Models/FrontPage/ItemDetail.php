<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class ItemDetail extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getDetailContent($id, $post = []) {
      try {
         $table = $this->db->table('tb_nft tn');
         $table->select('tn.title, tn.description, tn.image, tn.link_place_bid, tu.display_name, tu.avatar, tu.id as id_user');
         $table->join('tb_users tu', 'tu.id = tn.id_user');
         $table->where('tn.id', $id);

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