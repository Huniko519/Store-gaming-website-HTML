<?php
    date_default_timezone_set('UTC');
    require_once('config.php'); // Path to config file

    // If count of instagram items is not fall back to default setting
    $userID = filter_input(INPUT_GET, 'userID', FILTER_SANITIZE_SPECIAL_CHARS);
    $number = filter_input(INPUT_GET, 'count', FILTER_SANITIZE_NUMBER_INT);

    if(!$userID) {
        $userID = USER_ID;
    }

    // cache
    if(CACHE_ENABLED) {
        // Generate cache key from query data
        $cache_key = md5(
            var_export(array($userID, $number), true) . HASH_SALT
        );

        $cache_path = dirname(__FILE__) . '/cache/';

        // create cache folder
        if (!file_exists($cache_path)) {
            mkdir($cache_path, 0777, true);
        }

        // Remove old files from cache dir
        foreach (glob($cache_path . '*') as $file) {
            if (filemtime($file) < time() - CACHE_LIFETIME) {
                unlink($file);
            }
        }

        // If cache file exists - return it
        if(file_exists($cache_path . $cache_key)) {
            header('Content-Type: application/json');

            echo file_get_contents($cache_path . $cache_key);
            exit;
        }
    }

    $url = 'https://api.instagram.com/v1/users/' . $userID . '/media/recent/?access_token=' . ACCESS_TOKEN . '&count=' . $number;

    // Return JSON Object
    header('Content-Type: application/json');

    // get instagram images
    $content = file_get_contents($url);
    $content = json_decode($content, true);

    if($content && $content['data']) {
        $content = json_encode($content['data']);
        echo $content;
        if(CACHE_ENABLED) {
            file_put_contents($cache_path . $cache_key, $content);
        }
    }
