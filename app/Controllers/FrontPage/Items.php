<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\Items as Model;

class Items extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Items'
      ];

      $this->template($this->data, 'items');
   }

   public function getNFTContent() {
      $model = new Model();
      $content = $model->getNFTContent($this->getVar);
      return $this->response->setJSON($content);
   }

   public function getDetailProfile() {
      $model = new Model();
      $content = $model->getDetailProfile($this->post);
      return $this->response->setJSON($content);
   }

}