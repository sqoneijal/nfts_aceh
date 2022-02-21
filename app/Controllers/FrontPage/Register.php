<?php

namespace App\Controllers\FrontPage;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Controllers\FrontPage as Controller;
use App\Models\FrontPage\Register as Model;
use App\Validation\FrontPage\Register as Validate;

class Register extends Controller {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Register'
      ];

      $this->template($this->data, 'register');
   }

   public function handleVerify() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->handleVerify())) {
         $model = new Model();
         $model->handleVerify($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data saved successfully.';
      } else {
         $response['msg_response'] = 'Please check your input again!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function verify($jwt) {
      try {
         $decode = (array) JWT::decode($jwt, new Key('KQYsG4Hi201ajyEzOSGzr4MVfw==', 'HS256'));
         $email = $decode['email'];

         $this->data = [
            'title' => 'Verify',
            'content' => [
               'email' => $email
            ]
         ];

         $this->template($this->data, 'verify');
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'OK'];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $mail = new PHPMailer(true);
         try {
            //Server settings
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = '';
            $mail->Password   = '';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;
        
            //Recipients
            $mail->setFrom('sqone.developer@gmail.com', 'NFT Aceh');
            $mail->addAddress(strtolower($this->post['email']), $this->post['display_name']);

            $jwt = JWT::encode(['email' => strtolower($this->post['email'])], 'KQYsG4Hi201ajyEzOSGzr4MVfw==', 'HS256');
        
            //Content
            $mail->isHTML(true);
            $mail->Subject = 'Email verfication';
            $mail->Body    = '<p>Please click the following link to verify the account</p>'
                    . '<a href="' . site_url('register/verify/' . $jwt) . '">' . site_url('register/verify/' . $jwt) . '</a>';
        
            $mail->send();

            $model = new Model();
            $model->submit($this->post);
         
            $response['status'] = true;
            $response['msg_response'] = 'Data saved successfully.';
         } catch (Exception $e) {
            $response['msg_response'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
         }
      } else {
         $response['msg_response'] = 'Please double check your input!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

}
