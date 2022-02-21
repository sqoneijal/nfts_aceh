<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8" />
   <title><?php echo $title;?></title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta content="Sisterm informasi akademik universitas (SIAKAD)" name="description" />
   <meta content="sqone.developer@gmail.com" name="author" />
   <!-- <link rel="shortcut icon" href="" /> -->
   <?php
   echo @$internalCss;
   echo css_tag([
      'assets/admin/css/bootstrap.min.css',
      'assets/admin/css/icons.min.css',
      'assets/admin/css/app.min-default.min.css',
      'assets/admin/css/notification.css',
      'assets/admin/css/pace.min.css',
      'assets/admin/css/custom.min.css',
   ]);
   ?>
</head>
<body data-sidebar="dark">
   <div id="layout-wrapper">
      <header id="page-topbar"></header>
      <div class="vertical-menu">
         <div data-simplebar class="h-100">
            <div id="sidebar-menu"></div>
         </div>
      </div>
      <div class="main-content" id="root"></div>
   </div>
   <?php
   $app_version = app_version['admin'];
   echo "<script>";
   echo "var segment = {$segment}, user = {$users};";
   echo "</script>";   
   echo script_tag([
      'assets/admin/js/jquery.min.js',
      'assets/admin/js/bootstrap.bundle.min.js',
      'assets/admin/js/metisMenu.min.js',
      'assets/admin/js/simplebar.min.js',
      'assets/admin/js/waves.min.js',
      'assets/admin/js/pace.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.min.js',
   ]);
   echo @$internalJs;
   echo $webpack_js;
   echo '<script>window.Waves.init();';
   echo 'document.querySelector("#app_version").innerHTML = "'.$app_version.'";</script>';
   ?>
</body>
</html>
