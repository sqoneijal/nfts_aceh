<?php
function tgl_indo($tanggal) {
	$bulan = array (
		1 => 'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	);
	$pecahkan = explode('-', $tanggal);
	
	if ($tanggal)
		return $pecahkan[2] . ' ' . $bulan[(int) $pecahkan[1]] . ' ' . $pecahkan[0];
	else
		return '-';
}

function upload_file($file, $ext_allowed = [], $upload_path) {
	// $max_upload = (int) (ini_get('upload_max_filesize'));
	$max_upload = 1;
	$client_mime = $file->getClientMimeType();

	$config_mime = new \Config\Mimes();

	$allowed_mime = [];
	foreach ($ext_allowed as $ext) {
		foreach ($config_mime::$mimes[$ext] as $row) {
			$allowed_mime[] = $row;
		}
	}

	if (in_array($client_mime, $allowed_mime)) {
		if ($max_upload >= (double) $file->getSizeByUnit('mb')) {
			$getRandomName = $file->getRandomName();
			$file->move($upload_path, $getRandomName);

			$response['status'] = true;
			$response['content'] = $getRandomName;
		} else {
			$response['status'] = false;
			$response['content'] = 'The file size you are trying to upload is too large than the maximum allowed '.$max_upload.'MB';
		}
	} else {
		$response['status'] = false;
		$response['content'] = 'The file you are trying to upload is not allowed.';
	}
	return $response;
}

function resize_image($params = []) {
	return \Config\Services::image()
		->withFile($params['image_path'])
		->resize($params['width'], $params['height'], false, 'auto')
		->save($params['save_path']);
}