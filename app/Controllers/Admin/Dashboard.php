<?php

namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\Admin as Controller;
use App\Models\Admin\Dashboard as Model;

class Dashboard extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Dashboard'
      ];

      $this->template($this->data, 'dashboard');
   }

   public function getVisitor() {
      $tgl_sekarang = date('Y-m-d');
      $american_date = [];
      $response['labels'] = [];
      for ($i = 0; $i < 30; $i++) {
         $american_date[] = date('Y-m-d', strtotime("-$i days", strtotime($tgl_sekarang)));
         array_push($response['labels'], date('d-m-Y', strtotime("-$i days", strtotime($tgl_sekarang))));
      }

      $model = new Model();
      $getVisitorActiveVisitor = $model->getVisitorActiveVisitor($american_date);

      $date_visitor = [];
      foreach ($getVisitorActiveVisitor as $data) {
         $date_visitor[$data['date_visit']] = (int) $data['jumlah'];
      }

      $current_count = [];
      foreach ($american_date as $date) {
         $current_count[] = ($date_visitor[$date] ? $date_visitor[$date] : 0);
      }

      $series_current = [
         'name' => 'Active Visitor',
         'data' => $current_count
      ];

      $response['series'] = [$series_current];

      return $this->response->setJSON($response);
   }

}