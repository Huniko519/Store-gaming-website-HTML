<?php
/**
 * Your Instagram Access Token
 * How to get user id - http://jelled.com/instagram/lookup-user-id
 * How to generate access token - http://instagram.pixelunion.net/
 */

// User ID
define('USER_ID', '3177898544');

// Consumer Key
define('ACCESS_TOKEN', '3177898544.50ab03e.65c862f7bb524f38a25a245b23c2c209');

// Cache Settings
define('CACHE_ENABLED', true);
define('CACHE_LIFETIME', 3600); // in seconds
define('HASH_SALT', md5(dirname(__FILE__)));
