<?php

namespace App\Validation\FrontPage;

class Blog {

   public function subscribe() {
      return [
         'email' => [
            'rules' => 'required|valid_email',
         ]
      ];
   }
   
}