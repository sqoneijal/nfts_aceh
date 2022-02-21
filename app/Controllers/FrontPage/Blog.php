<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\Blog as Model;
use App\Validation\FrontPage\Blog as Validate;

class Blog extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Blogs',
      ];

      $this->template($this->data, 'blog');
   }

   public function detail($slug) {
      $this->post['ip_address'] = $this->request->getIPAddress();
      $this->post['slug'] = $slug;
      
      $model = new Model();
      $model->updateView($this->post);

      $this->data = [
         'title' => 'Detail'
      ];

      $this->template($this->data, 'blogdetail');
   }

   public function share() {
      $getVar = $this->request->getVar();

      $this->post['ip_address'] = $this->request->getIPAddress();
      $this->post['slug'] = $getVar['source'];
      $this->post['to_social'] = $getVar['to'];

      $model = new Model();
      $model->share($this->post);

      if ($getVar['to'] === 'facebook') {
         return redirect()->to('https://www.facebook.com/sharer/sharer.php?u=' . site_url('blog/' . $getVar['source']));
      } else if ($getVar['to'] === 'twitter') {
         return redirect()->to('https://twitter.com/intent/tweet?url=' . site_url('blog/' . $getVar['source']));
      }
   }

   public function likeContent() {
      $this->post['ip_address'] = $this->request->getIPAddress();

      $model = new Model();
      $content = $model->likeContent($this->post);
      return $this->response->setJSON($content);
   }

   public function subscribe() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->subscribe())) {
         $model = new Model();
         $model->subscribe($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Subscribe success.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function getRecentBlog() {
      $model = new Model();
      $content = $model->getRecentBlog($this->getVar);
      return $this->response->setJSON($content);
   }

   public function getDetailContent() {
      $model = new Model();
      $content = $model->getDetailContent($this->post);
      return $this->response->setJSON($content);
   }

   public function getData() {
      $model = new Model();
      $content = $model->getdata($this->getVar);
      return $this->response->setJSON($content);
   }

}