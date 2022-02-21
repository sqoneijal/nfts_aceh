<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class FrontPage extends BaseController {

   protected $env = 'production';

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
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
      $data['content'] = json_encode($content['content'] ?? []);
      $data['user'] = json_encode(count($getUserLogin) > 0 ? $getUserLogin : []);

		echo view('FrontPage', $data);
   }

   public function getUserLogin() {
      try {
         $db = \Config\Database::connect();
         $session = \Config\Services::session();

         $table = $db->table('tb_users');
         $table->select('id, avatar, display_name, email, email as username, role');
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
            'http://localhost:8081/header.js',
            'http://localhost:8081/footer.js',
            "http://localhost:8081/{$fileJs}.js"
         ]);
      } else {
         $path = ROOTPATH . 'public/bundle/frontpage/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);

         $script_tag[] = base_url("bundle/frontpage/{$content['vendor.js']}");
         $script_tag[] = base_url("bundle/frontpage/{$content['header.js']}");
         $script_tag[] = base_url("bundle/frontpage/{$content['footer.js']}");
         $script_tag[] = base_url("bundle/frontpage/{$content[$fileJs . '.js']}");

         return script_tag($script_tag);
      }
   }

}