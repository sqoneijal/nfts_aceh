<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\About as Model;

class About extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $getUserLogin = $this->getUserLogin();

      $data['title'] = 'About Us';
      if (@$getUserLogin['role'] === '1') $data['internalJs'] = tinymce['js'];

      $this->template($data, 'about');
   }

   public function submit() {
      $model = new Model();
      $content = $model->submit($this->post);
      return $this->response->setJSON($content);
   }

   public function getData() {
      $model = new Model();
      $content = $model->getData();
      return $this->response->setJSON($content);
   }

}