<?php

namespace App\Models\FrontPage;

use CodeIgniter\Model;

class Blog extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function share($post = []) {
      try {
         $share = $this->checkOldShare($post);

         if ((int) $share['jumlah'] < 1) {
            $table = $this->db->table('tb_share');
            $table->insert([
               'slug' => $post['slug'],
               'ip_address' => $post['ip_address'],
               'to_social' => $post['to_social'],
               'uploaded' => date('Y-m-d H:i:s')
            ]);
            return true;
         }
         return false;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   protected function checkOldShare($post = []) {
      try {
         $table = $this->db->table('tb_share');
         $table->select('count(*) as jumlah');
         $table->where('slug', $post['slug']);
         $table->where('ip_address', $post['ip_address']);
         $table->where('to_social', $post['to_social']);

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

   public function likeContent($post = []) {
      try {
         $like = $this->getOldLikes($post);

         if ((int) $like['jumlah'] < 1) {
            $table = $this->db->table('tb_likes');
            $table->insert([
               'ip_address' => $post['ip_address'],
               'uploaded' => date('Y-m-d H:i:s'),
               'slug' => $post['slug']
            ]);

            return true;
         } else {
            return false;
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function updateView($post = []) {
      try {
         $views = $this->getOldViews($post);
         
         if ((int) $views['jumlah'] < 1) {
            $table = $this->db->table('tb_views');
            $table->insert([
               'slug' => $post['slug'],
               'ip_address' => $post['ip_address'],
               'uploaded' => date('Y-m-d H:i:s')
            ]);
            return true;
         }
         return false;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   protected function getOldLikes($post = []) {
      try {
         $table = $this->db->table('tb_likes');
         $table->select('count(*) as jumlah');
         $table->where('slug', $post['slug']);
         $table->where('ip_address', $post['ip_address']);

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

   protected function getOldViews($post = []) {
      try {
         $table = $this->db->table('tb_views');
         $table->select('count(*) as jumlah');
         $table->where('slug', $post['slug']);
         $table->where('ip_address', $post['ip_address']);

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

   public function subscribe($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            if ($val) {
               $data[$key] = trim($val);
            } else {
               $data[$key] = is_numeric($val) ? $val : null;
            }
         }
         unset($data['user_modified']);
         
         $checkSubscribe = $this->checkSubscribe($data['email']);
         if ((int) $checkSubscribe['jumlah'] < 1) {
            $data['uploaded'] = date('Y-m-d H:i:s');

            $table = $this->db->table('tb_subscriber');
            $table->insert($data);
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   protected function checkSubscribe($email) {
      try {
         $table = $this->db->table('tb_subscriber');
         $table->select('count(*) as jumlah');
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
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getRecentBlog($post = []) {
      try {
         $limit = 4;

         $table = $this->db->table('tb_blogs tb');
         $table->select('tb.title, tb.content, tb.uploaded, tb.slug');
         $table->where('tb.slug !=', $post['slug']);
         $table->orderBy('tb.modified', 'desc');
         $table->limit($limit, (int) $post['page'] * $limit);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               if ($field === 'uploaded') {
                  $response[$key][$field] = date('M d, Y', strtotime($val[$field]));
               } else {
                  $response[$key][$field] = trim($val[$field]);
               }
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getDetailContent($post = []) {
      try {
         $limit = 6;

         $table = $this->db->table('tb_blogs tb');
         $table->select('tb.title, tb.content, tb.uploaded, coalesce(tb.likes, 0) as likes, coalesce(tb.views, 0) as views,
         coalesce(tb.share, 0) as share, tb.slug, tu.avatar, tu.display_name, tu.role');
         $table->join('tb_users tu', 'tu.email = tb.user_modified');
         $table->where('tb.slug', $post['slug']);
         $table->orderBy('tb.id', 'desc');

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = trim($data[$field]);
            }
            $response['tgl_posting'] = date('d M', strtotime($data['uploaded']));
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getData($post = []) {
      try {
         $limit = 6;

         $table = $this->db->table('tb_blogs tb');
         $table->select('tb.title, tb.content, tb.uploaded, coalesce(tb.likes, 0) as likes, coalesce(tb.views, 0) as views,
         coalesce(tb.share, 0) as share, tb.slug, tu.avatar, tu.display_name, tu.role');
         $table->join('tb_users tu', 'tu.email = tb.user_modified');
         $table->orderBy('tb.id', 'desc');
         $table->limit($limit, (int) $post['page'] * $limit);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = trim($val[$field]);
               $response[$key]['tgl_posting'] = date('d M', strtotime($val['uploaded']));
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}