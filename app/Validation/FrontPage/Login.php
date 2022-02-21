<?php

namespace App\Validation\FrontPage;

class Login {

   public function submit() {
      return [
         'username' => [
            'rules' => 'required|valid_email',
            'label' => 'email'
         ],
         'password' => [
            'rules' => 'required',
         ],
      ];
   }
   
}