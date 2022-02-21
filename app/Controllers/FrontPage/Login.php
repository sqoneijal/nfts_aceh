<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage as Controller;
use App\Validation\FrontPage\Login as Validate;
use App\Models\FrontPage\Login as Model;

class Login extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Login'
      ];

      $this->template($this->data, 'login');
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $content = $model->submit($this->post);

         if ($content) {
            $session = \Config\Services::session();
            $session->set(['id' => $content['id']]);

            $response['status'] = true;
            $response['msg_response'] = 'Login is successful, the page is redirected immediately.';
         } else {
            $response['msg_response'] = 'The username or password you entered is wrong!';
         }
      } else {
         $response['msg_response'] = 'Please double check your input!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function logout() {
      $session = \Config\Services::session();

      $session->destroy();
      return redirect()->to('/login');
   }

}