<?php

namespace App\Validation\FrontPage;

class Upload {

   public function updateItem() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.email,user_modified]',
            'label' => 'user modified'
         ],
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_nft.id,id]',
            'label' => 'ID item'
         ],
         'id_user' => [
            'rules' => 'required|numeric|is_not_unique[tb_users.id,id_user]',
            'label' => 'ID user'
         ],
         'title' => [
            'rules' => 'required'
         ],
         'image' => [
            'rules' => 'required'
         ],
      ];
   }

   public function submit() {
      return [
         'user_modified' => [
            'rules' => 'required|is_not_unique[tb_users.email,user_modified]',
            'label' => 'user modified'
         ],
         'id_user' => [
            'rules' => 'required|numeric|is_not_unique[tb_users.id,id_user]',
            'label' => 'ID user'
         ],
         'title' => [
            'rules' => 'required'
         ],
         'image' => [
            'rules' => 'required'
         ],
      ];
   }
   
}