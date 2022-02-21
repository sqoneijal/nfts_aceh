<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.

$routes->get('/', '\App\Controllers\FrontPage\Home::index');

$routes->group('/', ['namespace' => 'App\Controllers\FrontPage'], function($routes) {
   $routes->group('home', function($routes) {
      $routes->get('topmember', 'Home::topMember');
      $routes->get('getdaftarcreators', 'Home::getDaftarCreators');
      $routes->get('getdaftarkategori', 'Home::getDaftarKategori');
   });

   $routes->group('login', function($routes) {
      $routes->get('logout', 'Login::logout');
      $routes->get('/', 'Login::index');
      $routes->get('logout', 'Login::logout');

      $routes->post('submit', 'Login::submit');
   });

   $routes->group('register', function($routes) {
      $routes->get('/', 'Register::index');
      $routes->get('verify/(:any)', 'Register::verify/$1');

      $routes->post('submit', 'Register::submit');
      $routes->post('handleverify', 'Register::handleVerify');
   });

   $routes->group('profile', function($routes) {
      $routes->get('/', 'Profile::index');
      $routes->get('getlistbgprofile', 'Profile::getListBGProfile');

      $routes->post('getdetailprofile', 'Profile::getDetailProfile');
      $routes->post('changebgprofile', 'Profile::changeBGProfile');
      $routes->post('uploadbgprofile', 'Profile::uploadBGProfile');
      $routes->post('uploadphotoprofile', 'Profile::uploadPhotoProfile');
      $routes->post('submit', 'Profile::submit');
   });

   $routes->group('about', function($routes) {
      $routes->get('/', 'About::index');
      $routes->get('getdata', 'About::getData');

      $routes->post('submit', 'About::submit');
   });

   $routes->group('explorer', function($routes) {
      $routes->get('/', 'Explorer::index');
      $routes->get('getcreators', 'Explorer::getCreators');
      $routes->get('getdaftarkategori', 'Explorer::getDaftarKategori');
   });

   $routes->group('contact', function($routes) {
      $routes->get('/', 'Contact::index');
      $routes->get('getdaftarnegara', 'Contact::getDaftarNegara');
   });

   $routes->group('upload', function($routes) {
      $routes->get('/', 'Upload::index');
      $routes->get('(:num)', 'Upload::edit/$1');
      $routes->get('getdaftarkategori', 'Upload::getDaftarKategori');

      $routes->post('submit', 'Upload::submit');
      $routes->post('getdetailedit', 'Upload::getDetailEdit');
      $routes->post('updateitem', 'Upload::updateItem');
   });

   $routes->group('itemdetail', function($routes) {
      $routes->get('(:num)', 'ItemDetail::index/$1');
      $routes->get('getdetailcontent/(:num)', 'ItemDetail::getDetailContent/$1');
   });

   $routes->group('items', function($routes) {
      $routes->get('/', 'Items::index');

      $routes->post('getdetailprofile', 'Items::getDetailProfile');
      $routes->post('getnftcontent', 'Items::getNFTContent');
   });

   $routes->group('creators', function($routes) {
      $routes->get('/', 'Creators::index');
      $routes->get('getdaftarcreators', 'Creators::getDaftarCreators');
      $routes->get('detail/(:num)', 'Creators::detail/$1');

      $routes->post('searchcreators', 'Creators::searchCreators');
      $routes->post('getdetailcreators', 'Creators::getDetailCreators');
      $routes->post('follow', 'Creators::follow');
      $routes->post('unfollow', 'Creators::unfollow');
      $routes->post('getcreatorsnft', 'Creators::getCreatorsNFT');
   });

   $routes->group('blog', function($routes) {
      $routes->get('/', 'Blog::index');
      $routes->get('getdata', 'Blog::getData');
      $routes->get('getrecentblog', 'Blog::getRecentBlog');
      $routes->get('share', 'Blog::share');
      $routes->get('(:segment)', 'Blog::detail/$1');

      $routes->post('getdetailcontent', 'Blog::getDetailContent');
      $routes->post('subscribe', 'Blog::subscribe');
      $routes->post('likecontent', 'Blog::likeContent');
   });
});

$routes->group('admin', ['namespace' => 'App\Controllers\Admin'], function($routes) {
   $routes->group('dashboard', function($routes) {
      $routes->get('/', 'Dashboard::index');
   });

   $routes->group('blogs', function($routes) {
      $routes->get('/', 'Blogs::index');

      $routes->post('getdata', 'Blogs::getData');
      $routes->post('submit', 'Blogs::submit');
      $routes->post('hapus', 'Blogs::hapus');
   });
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
   require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
