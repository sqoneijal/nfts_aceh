<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\ItemDetail as Model;

class ItemDetail extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Item Detail'
      ];

      $this->template($this->data, 'itemdetail');
   }

   public function getDetailContent($id) {
      $model = new Model();
      $content = $model->getDetailContent($id, $this->getVar);
      return $this->response->setJSON($content);
   }

}