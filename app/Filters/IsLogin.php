<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class IsLogin implements FilterInterface {

   public function before(RequestInterface $request, $arguments = null) {
      $session = \Config\Services::session()->get();
      
      if (!@$session['id'] && !@$session['role']) {
         return redirect()->to(site_url('login'))->with('error', "Invalid Credential");
      }
   }

   public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}

}