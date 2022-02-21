<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Creators extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function getCreatorsNFT($post = []) {
      try {
         $limit = 6;

         $table = $this->db->table('tb_nft tn');
         $table->select('tn.id as id_nft, tn.title, tn.image, tn.link_place_bid');
         $table->where('tn.id_user', $post['id_creators']);
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

   public function unfollow($post = []) {
      try {
         $table = $this->db->table('tb_follow');
         $table->where('id_user', $post['id_user']);
         $table->where('id_follow', $post['id_follow']);
         $table->delete();
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function follow($post = []) {
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
         
         $table = $this->db->table('tb_follow');
         $table->insert($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getDetailCreators($post = []) {
      try {
         $table = $this->db->table('tb_users tu');
         $table->select('tu.avatar, tu.display_name, tu.opensea_url, tu.rarible_url, tu.facebook_username, tu.discord_username,
         tu.tiktok_username, tu.twitter_username, tu.telegram_number, tu.whatsapp_number, tu.hidden_contact, tu.hidden_social_media,
         tu.bio, tu.bg_profile, tu.id as id_creators, case when tf.id_user is null then \'not_following\' else \'following\'
         end as is_follow, coalesce(tf2.jumlah_follower, 0) as jumlah_follower, coalesce(tn.jumlah_items, 0) as jumlah_items,
         date_format(tu.uploaded, \'%Y\') as since', false);
         $table->join('tb_follow tf', 'tf.id_user = ' . (int) $post['user_login'], 'left');
         $table->join('(select id_follow, count(*) as jumlah_follower from tb_follow group by id_follow) tf2', 'tf2.id_follow = tu.id', 'left');
         $table->join('(select id_user, count(*) as jumlah_items from tb_nft group by id_user) tn', 'tn.id_user = tu.id', 'left');
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

   public function getDaftarCreators($post = []) {
      try {
         $limit = 6;

         $table = $this->db->table('tb_users tu');
         $table->select('tu.id, tu.avatar, tu.display_name, tu.bg_profile, coalesce(tn.collection, 0) as collection');
         $table->join('(select id_user, count(*) as collection from tb_nft group by id_user) tn', 'tn.id_user = tu.id', 'left');
         $table->where('tu.status', '1');
         $table->where('tu.account_private', false);
         if (@$post['query']) $table->like('lower(trim(tu.display_name))', trim(strtolower($post['query'])));
         $table->orderBy('tu.id', 'desc');
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