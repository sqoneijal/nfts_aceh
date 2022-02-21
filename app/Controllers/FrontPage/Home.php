<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\Common;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\Home as Model;

class Home extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'NFT Aceh'
      ];

      $this->template($this->data, 'home');
   }

   public function getDaftarKategori() {
      $model = new Common();
      $content = $model->getDaftarKategori();
      return $this->response->setJSON($content);
   }

   public function topMember() {
      $model = new Model();
      $content = $model->topMember();
      return $this->response->setJSON($content);
   }

   public function getDaftarCreators() {
      $model = new Model();
      $content = $model->getDaftarCreators($this->getVar);
      return $this->response->setJSON($content);
   }

}