<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\Contact as Model;

class Contact extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Contact Us'
      ];

      $this->template($this->data, 'contact');
   }

   public function getDaftarNegara() {
      $model = new Model();
      $content = $model->getDaftarNegara();
      return $this->response->setJSON($content);
   }

}