<?php

namespace App\Validation\FrontPage;

class Profile {

   public function submit() {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_users.id,id]',
            'label' => 'ID'
         ],
         'display_name' => [
            'rules' => 'required',
            'label' => 'display name'
         ],
      ];
   }

   public function uploadPhotoProfile() {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_users.id,id]',
            'label' => 'ID'
         ],
      ];
   }

   public function uploadBGProfile() {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_users.id,id]',
            'label' => 'ID'
         ],
      ];
   }

   public function changeBGProfile() {
      return [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_users.id,id]',
            'label' => 'ID'
         ],
         'bg' => [
            'rules' => 'required|is_not_unique[tb_mst_bg_profile.file_name,bg]',
            'label' => 'background image'
         ],
      ];
   }
   
}