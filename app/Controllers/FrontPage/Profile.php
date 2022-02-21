<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\Profile as Model;
use App\Validation\FrontPage\Profile as Validate;

class Profile extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Profile'
      ];

      $this->template($this->data, 'profile');
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $model->submit($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data saved successfully.';
      } else {
         $response['msg_response'] = 'Please check your input again!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function uploadPhotoProfile() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->uploadPhotoProfile())) {
         $file = $this->request->getFile('file');
         $upload_path = ROOTPATH . 'public/assets/images';

         $upload_file = upload_file($file, ['gif', 'png', 'jpg', 'jpeg'], $upload_path);

         if ($upload_file['status']) {
            $avatar = $upload_file['content'];
            chmod($upload_path . '/' . $avatar, 0777);

            $this->post['avatar'] = $avatar;

            resize_image([
               'image_path' => "{$upload_path}/{$avatar}",
               'width' => 123,
               'height' => 92,
               'save_path' => "{$upload_path}/{$avatar}"
            ]);

            $model = new Model();
            $model->uploadPhotoProfile($this->post);

            $default_avatar = ['default-avatar.png'];
            if (!in_array($this->post['old_file'], $default_avatar))
               @unlink($upload_path . '/' . $this->post['old_file']);
         
            $response['status'] = true;
            $response['msg_response'] = 'Data saved successfully.';
            $response['content'] = base_url('assets/images/' . $avatar);
            $response['avatar'] = $avatar;
         } else {
            $response['msg_response'] = $upload_file['content'];
         }
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function uploadBGProfile() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->uploadBGProfile())) {
         $file = $this->request->getFile('file');
         $upload_path = ROOTPATH . 'public/assets/images/bg';

         $upload_file = upload_file($file, ['gif', 'png', 'jpg', 'jpeg'], $upload_path);

         if ($upload_file['status']) {
            $bg_profile = $upload_file['content'];
            chmod($upload_path . '/' . $bg_profile, 0777);

            $this->post['bg'] = $bg_profile;

            resize_image([
               'image_path' => "{$upload_path}/{$bg_profile}",
               'width' => 1903,
               'height' => 272,
               'save_path' => "{$upload_path}/{$bg_profile}"
            ]);

            $model = new Model();
            $model->changeBGProfile($this->post);

            $default_bg = ['clown.jpg', 'smiley.png', 'cover.png'];
            if (!in_array($this->post['old_bg'], $default_bg))
               @unlink($upload_path . '/' . $this->post['old_bg']);
         
            $response['status'] = true;
            $response['msg_response'] = 'Data saved successfully.';
            $response['content'] = base_url('assets/images/bg/' . $bg_profile);
            $response['bg_profile'] = $bg_profile;
         } else {
            $response['msg_response'] = $upload_file['content'];
         }
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function changeBGProfile() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->changeBGProfile())) {
         $model = new Model();
         $model->changeBGProfile($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data saved successfully.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function getDetailProfile() {
      $model = new Model();
      $content = $model->getDetailProfile($this->post['id']);
      return $this->response->setJSON($content);
   }

   public function getListBGProfile() {
      $model = new Model();
      $content = $model->getListBGProfile();
      return $this->response->setJSON($content);
   }

}