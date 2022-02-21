<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\Common;
use App\Controllers\FrontPage as Controller;
use App\Validation\FrontPage\Upload as Validate;
use App\Models\FrontPage\Upload as Model;

class Upload extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Upload'
      ];

      $this->template($this->data, 'upload');
   }

   public function edit() {
      $this->data = [
         'title' => 'Edit Item'
      ];

      $this->template($this->data, 'edititem');
   }

   public function getDetailEdit() {
      $model = new Model();
      $content = $model->getDetailEdit($this->post);
      return $this->response->setJSON($content);
   }

   public function getDaftarKategori() {
      $model = new Common();
      $content = $model->getDaftarKategori();
      return $this->response->setJSON($content);
   }

   public function updateItem() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->updateItem())) {
         $model = new Model();
         $content = $model->updateItem($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
         $response['content'] = $content;
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $content = $model->submit($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
         $response['content'] = $content;
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

}