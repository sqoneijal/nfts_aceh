<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Profile extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
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
         unset($data['id']);

         $data['modified'] = date('Y-m-d H:i:s');

         $table = $this->db->table('tb_users');
         $table->where('id', $post['id']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function uploadPhotoProfile($post = []) {
      try {
         $table = $this->db->table('tb_users');
         $table->where('id', $post['id']);
         $table->update([
            'modified' => date('Y-m-d H:i:s'),
            'avatar' => $post['avatar']
         ]);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function changeBGProfile($post = []) {
      try {
         $table = $this->db->table('tb_users');
         $table->where('id', $post['id']);
         $table->update([
            'modified' => date('Y-m-d H:i:s'),
            'bg_profile' => $post['bg']
         ]);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getDetailProfile($id) {
      try {
         $table = $this->db->table('tb_users');
         $table->select('avatar, display_name, opensea_url, rarible_url, foundation_url, email, facebook_username, discord_username,
         tiktok_username, telegram_number, whatsapp_number, email_notification, hidden_contact, hidden_social_media, account_private,
         twitter_username, bio, bg_profile');
         $table->where('id', $id);

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

   public function getListBGProfile() {
      try {
         $table = $this->db->table('tb_mst_bg_profile');
         
         $get = $table->get();
         $result = $get->getResultArray();
         
         $response = [];
         foreach ($result as $data) {
            array_push($response, [
               "thumbnail" => base_url("assets/images/bg/thumbnail/{$data['thumbnail']}"),
               "path" => base_url("assets/images/bg/{$data['file_name']}"),
               'file_name' => $data['file_name']
            ]);
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}