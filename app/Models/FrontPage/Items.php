<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Items extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getNFTContent($post = []) {
      try {
         $limit = 6;

         $table = $this->db->table('tb_nft tn');
         $table->select('tn.id, tn.title, tn.image, tn.link_place_bid');
         $table->where('tn.id_user', $post['id_user']);
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

   public function getDetailProfile($post = []) {
      try {
         $table = $this->db->table('tb_users tu');
         $table->select('tu.avatar, tu.display_name, tu.opensea_url, tu.rarible_url, tu.foundation_url, tu.facebook_username,
         tu.discord_username, tu.tiktok_username, tu.telegram_number, tu.whatsapp_number, tu.email_notification, tu.hidden_contact,
         tu.hidden_social_media, tu.account_private, tu.twitter_username, tu.bio, tu.bg_profile, date_format(tu.uploaded, \'%Y\') as since');
         $table->where('tu.id', $post['id_user']);

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