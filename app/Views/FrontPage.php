<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8" />
   <meta name="title" content="NFT Aceh" />
   <meta name="description" content="Official Website NFT Aceh Community" />
   <meta name="keywords" content="Official Website NFT Aceh Community" />
   <meta name="robots" content="index, follow" />
   <meta name="language" content="English" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title><?php echo $title;?></title>
   <meta name="msapplication-TileColor" content="#da532c" />
   <meta name="theme-color" content="#ffffff" />
   <?php
   echo css_tag([
      'assets/css/remixicon.min.css',
      'assets/css/bootstrap.min.css',
      'assets/css/swiper-bundle.min.css',
      'assets/css/style.min.css',
      'assets/css/custom.min.css',
      'assets/css/pace.min.css',
      'assets/css/notification.css'
   ]);
   ?>
</head>
<body class="body">
   <div class="overflow-hidden">
      <div id="root_header"></div>
      <div id="root"></div>
      <footer class="footer__1" id="root_footer"></footer>
   </div>
   <?php
   echo "<script>";
   echo "var segment = {$segment}, content = {$content}, user = {$user};";
   echo "</script>";
   echo script_tag([
      'assets/js/jquery-3.6.0.min.js',
      'assets/js/bootstrap.bundle.min.js',
      'assets/js/swiper-bundle.min.js',
      // 'assets/js/gsap.min.js',
      'assets/js/ScrollTrigger.min.js',
      'assets/js/sticky-sidebar.min.js',
      'assets/js/script.min.js',
      'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js',
      'assets/js/pace.min.js'
   ]);
   echo @$internalJs;
   echo $webpack_js;
   ?>
</body>
</html>