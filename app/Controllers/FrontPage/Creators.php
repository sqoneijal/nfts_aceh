<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\Creators as Model;

class Creators extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Creators'
      ];

      $this->template($this->data, 'creators');
   }

   public function detail() {
      $this->data = [
         'title' => 'Detail Creators',
      ];

      $this->template($this->data, 'detail_creators');
   }

   public function getCreatorsNFT() {
      $model = new Model();
      $content = $model->getCreatorsNFT($this->getVar);
      return $this->response->setJSON($content);
   }

   public function unfollow() {
      $model = new Model();
      $content = $model->unfollow($this->post);
      return $this->response->setJSON($content);
   }

   public function follow() {
      $model = new Model();
      $content = $model->follow($this->post);
      return $this->response->setJSON($content);
   }

   public function getDetailCreators() {
      $model = new Model();
      $content = $model->getDetailCreators($this->post);
      return $this->response->setJSON($content);
   }

   public function searchCreators() {
      $model = new Model();
      $content = $model->getDaftarCreators($this->getVar);
      return $this->response->setJSON($content);
   }

   public function getDaftarCreators() {
      $model = new Model();
      $content = $model->getDaftarCreators($this->getVar);
      return $this->response->setJSON($content);
   }

}