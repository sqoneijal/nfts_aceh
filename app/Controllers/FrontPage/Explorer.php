<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\Common;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\Explorer as Model;

class Explorer extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Explorer'
      ];

      $this->template($this->data, 'explorer');
   }

   public function getDaftarKategori() {
      $model = new Common();
      $content = $model->getDaftarKategori();
      return $this->response->setJSON($content);
   }

   public function getCreators() {
      $model = new Model();
      $content = $model->getCreators($this->getVar);
      return $this->response->setJSON($content);
   }

}