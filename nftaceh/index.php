<!DOCTYPE html>
<html lang="en">
	<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head>
		<meta charset="UTF-8" />
		<meta name="title" content="NFT Aceh" />
		<meta name="description" content="Official Website NFT Aceh Community" />
		<meta
			name="keywords"
			content="Official Website NFT Aceh Community"
			/>
		<meta name="robots" content="index, follow" />
		<meta name="language" content="English" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>NFT Aceh </title>
		<meta name="msapplication-TileColor" content="#da532c" />
		<meta name="theme-color" content="#ffffff" />
		<!-- 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈 STYLES -->
		<link rel="stylesheet" href="assets/css/plugins/remixicon.css" />
		<link
			rel="stylesheet"
			href="assets/css/plugins/bootstrap.min.css"
			/>
		<link
			rel="stylesheet"
			href="assets/css/plugins/swiper-bundle.min.css"
			/>
		<link rel="stylesheet" href="assets/css/style.css" />
	</head>
	<body class="body">

		<div class="overflow-hidden">

			<div class="bg-dark py-10">
				<div class="container">
					<div
						class="text-center
						d-flex
						justify-content-between
						space-x-10
						align-items-center">
						<div class="space-x-10 d-flex align-items-center">
							<lottie-player
								src="https://assets6.lottiefiles.com/private_files/lf30_kqshlcsx.json"
								background="404.html"
								speed="2"
								style="width: 50px; height: 50px"
								loop
								autoplay></lottie-player>
							<p class="color_white">
								Dark mode is now
								<span style="color: rgb(0, 255, 170)">Available </span>
							</p>
						</div>

						<div class="mode_switcher space-x-10">
							<a href="#" class="light d-flex align-items-center is_active">
								<i class="ri-sun-fill"></i> Light
							</a>
							<a href="#" class="dark d-flex align-items-center">
								<i class="ri-moon-fill"></i> Dark
							</a>
						</div>
					</div>
				</div>
			</div>
			<?php include ('header.php'); ?>
			
			<?php
			if (isset($_GET['about-us']))
			  include('about-us.php');
			elseif (isset($_GET['explorer']))
			  include('explorer.php');
			  
			elseif (isset($_GET['creators']))
			  include('creators.php');
			  
			elseif (isset($_GET['contact-us']))
			  include('contact-us.php');
			 
			elseif (isset($_GET['blog']))
			  include('blog.php');
			
			elseif (isset($_GET['register']))
			  include('register.php');
			  
		  else
			include ('home.php'); 
		  ?>
		
		<?php include ('footer.php'); ?>
			<script>
			    $(".dark").on('click', function (e) {
			
				document.getElementById("img_js").src = "assets/img/bg/in_hero1_dark.png"
			
			
			});
			$(".light").on('click', function (e) {
				document.getElementById("img_js").src = "assets/img/bg/in_hero1.png"
			});
			</script>
		</div>
		<!-- 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈 SCRIPTS -->
		<script src="assets/js/jquery-3.6.0.js"></script>
		<script src="assets/js/bootstrap.bundle.min.js"></script>
		<script src="assets/js/swiper-bundle.min.js"></script>
		<script src="assets/js/gsap.min.js"></script>
		<script src="assets/js/ScrollTrigger.min.js"></script>
		<script src="assets/js/sticky-sidebar.js"></script>
		<script src="assets/js/script.js"></script>
		<script src="../cdn.jsdelivr.net/npm/web3%40latest/dist/web3.min.html"></script>
		<script src="../unpkg.com/moralis%401.2.4/dist/moralis.js"></script>
		<script src="assets/js/nft.js"></script>
		<script
			src="../unpkg.com/%40lottiefiles/lottie-player%401.5.4/dist/lottie-player.js"></script>
	</body>
</html>