<?php

namespace App\Validation\Admin;

class Blogs {

   public function hapus($post = []) {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.email,user_modified]',
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_blogs.id,id]'
         ],
      ];
   }

   public function submit($post = []) {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.email,user_modified]',
         ],
         'id' => [
            'rules' => ($post['pageType'] === 'insert' ? 'permit_empty' : 'required|numeric|is_not_unique[tb_blogs.id,id]')
         ],
         'title' => [
            'rules' => 'required',
         ],
      ];
   }
   
}