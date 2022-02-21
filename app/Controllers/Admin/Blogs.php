<?php

namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Admin as Controller;
use App\Models\Admin\Blogs as Model;
use App\Validation\Admin\Blogs as Validate;

class Blogs extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Blogs',
         'internalCss' => datatable['css'],
         'internalJs' => [
            datatable['js'],
            tinymce['js'],
         ],
      ];

      $this->template($this->data, 'blogs');
   }

   public function hapus() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->hapus())) {
         $model = new Model();
         $model->hapus($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil dihapus.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->submit($this->post))) {
         $model = new Model();
         $model->submit($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function getData() {
      $model = new Model();
      $query = $model->getData($this->getVar);
   
      $i = $this->post['start'];
      $response = [];
      foreach ($query as $data) {
         $i++;
   
         $action = '<div class="btn-group">';
         $action .= '<a class="btn btn-sm btn-warning" href="#" id="edit" data-bs-original-title="Edit" data-bs-toggle="tooltip" data-bs-placement="top"><i class="ri-edit-2-line"></i></a>';
         $action .= '<a class="btn btn-sm btn-danger" href="#" id="delete" data-bs-original-title="Delete" data-bs-toggle="tooltip" data-bs-placement="top"><i class="ri-delete-bin-line"></i></a>';
         $action .= '</div>';
   
         $result = [];
         $result['detailContent'] = $data;
         $result[] = '<a href="/blog/'.$data['slug'].'">'.$data['title'].'</a>';
         $result[] = $data['likes'];
         $result[] = $data['views'];
         $result[] = $data['share'];
         $result[] = $data['uploaded'];
         $result[] = $action;
   
         $response[] = $result;
      }
   
      $output = array(
         'draw'            => intval($this->post['draw']),
         'recordsTotal'    => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data'            => $response
      );
      return $this->response->setJSON($output);
   }

}