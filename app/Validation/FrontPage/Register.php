<?php

namespace App\Validation\FrontPage;

class Register {

   public function handleVerify() {
      return [
         'email' => [
            'rules' => 'required|valid_email|is_not_unique[tb_users.email,email]',
            'label' => 'email',
            'errors' => [
               'is_not_unique' => 'The email you are trying to enter is not registered.'
            ]
         ],
         'password' => [
            'rules' => 'required|matches[confirm_password]',
            'label' => 'password'
         ],
         'confirm_password' => [
            'rules' => 'required|matches[password]',
            'label' => 'confirm password'
         ],
      ];
   }

   public function submit() {
      return [
         'display_name' => [
            'rules' => 'required',
            'label' => 'display name'
         ],
         'email' => [
            'rules' => 'required|valid_email|is_unique[tb_users.email,email]',
            'label' => 'email',
            'errors' => [
               'is_unique' => 'The email you entered is already registered, please use a different one.'
            ]
         ],
      ];
   }
   
}