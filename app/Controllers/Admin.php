<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class Admin extends BaseController {

   protected $env = 'development';

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);

      $session = $this->getUserLogin();
      $role = $session['role'];
      if ($role !== '1') {
         die('Anda tidak memiliki akses.');
      }
   }

   public function template($content = [], $fileJs) {
      $internalCss[] = $this->internalCss($content);
		$internalJs[] = $this->internalJs($content);

      $getUserLogin = $this->getUserLogin();
		
		$data['title'] = $content['title'];
      $data['internalCss'] = css_tag($internalCss);
		$data['internalJs'] = script_tag($internalJs);
      $data['webpack_js'] = $this->generateWebpackJS($fileJs);
      $data['segment'] = $this->setSegment();
      $data['users'] = json_encode(count($getUserLogin) > 0 ? $getUserLogin : []);

		echo view('Admin', $data);
   }

   public function getUserLogin() {
      try {
         $db = \Config\Database::connect();
         $session = \Config\Services::session();

         $table = $db->table('tb_users');
         $table->select('id, avatar, display_name, email as username, role');
         $table->where('id', $session->get('id'));

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = trim($data[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   protected function generateWebpackJS($fileJs) {
      if ($this->env === 'development') {
         return script_tag([
            'http://localhost:8081/vendor.js',
            'http://localhost:8081/topbar.js',
            'http://localhost:8081/navigation.js',
            "http://localhost:8081/{$fileJs}.js"
         ]);
      } else {
         $path = ROOTPATH . 'public/bundle/admin/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);

         $script_tag[] = base_url("bundle/admin/{$content['vendor.js']}");
         $script_tag[] = base_url("bundle/admin/{$content['topbar.js']}");
         $script_tag[] = base_url("bundle/admin/{$content['navigation.js']}");
         $script_tag[] = base_url("bundle/admin/{$content[$fileJs . '.js']}");

         return script_tag($script_tag);
      }
   }

}