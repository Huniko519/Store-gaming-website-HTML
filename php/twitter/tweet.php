<?php
    date_default_timezone_set('UTC');
    require_once("twitteroauth/twitteroauth.php"); // Path to twitteroauth library
    require_once('config.php'); // Path to config file

    // Check if keys are in place
    if (CONSUMER_KEY === '' || CONSUMER_SECRET === '') {
        echo 'You need a consumer key and secret keys. Get one from <a href="https://dev.twitter.com/apps">dev.twitter.com/apps</a>';
        exit;
    }

    // If count of tweets is not fall back to default setting
    $username = filter_input(INPUT_GET, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
    $number = filter_input(INPUT_GET, 'count', FILTER_SANITIZE_NUMBER_INT);
    $exclude_replies = filter_input(INPUT_GET, 'exclude_replies', FILTER_SANITIZE_SPECIAL_CHARS);
    $list_slug = filter_input(INPUT_GET, 'list_slug', FILTER_SANITIZE_SPECIAL_CHARS);
    $hashtag = filter_input(INPUT_GET, 'hashtag', FILTER_SANITIZE_SPECIAL_CHARS);

    if(!$username) {
        $username = USER_NAME;
    }

	if(CACHE_ENABLED) {
        // Generate cache key from query data
        $cache_key = md5(
            var_export(array($username, $number, $exclude_replies, $list_slug, $hashtag), true) . HASH_SALT
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

    /**
     * adds a link around any entities in a twitter feed
     * twitter entities include urls, user mentions, hashtags and media
     * http://stackoverflow.com/a/15390225
     *
     * @author     mcrumley
     * @param      object $tweet a JSON tweet object v1.1 API
     * @return     string tweet
     */
    function add_tweet_entity_links($tweet) {
        $text = $tweet->text;
        $entities = isset($tweet->entities) ? $tweet->entities : array();

        $replacements = array();
        if (isset($entities->hashtags)) {
            foreach ($entities->hashtags as $hashtag) {
                list ($start, $end) = $hashtag->indices;
                $replacements[$start] = array($start, $end,
                    "<a href=\"https://twitter.com/search?q={$hashtag->text}\">#{$hashtag->text}</a>");
            }
        }
        if (isset($entities->urls)) {
            foreach ($entities->urls as $url) {
                list ($start, $end) = $url->indices;
                // you can also use $url['expanded_url'] in place of $url['url']
                $replacements[$start] = array($start, $end,
                    "<a href=\"{$url->url}\">{$url->display_url}</a>");
            }
        }
        if (isset($entities->user_mentions)) {
            foreach ($entities->user_mentions as $mention) {
                list ($start, $end) = $mention->indices;
                $replacements[$start] = array($start, $end,
                    "<a href=\"https://twitter.com/{$mention->screen_name}\">@{$mention->screen_name}</a>");
            }
        }
        if (isset($entities->media)) {
            foreach ($entities->media as $media) {
                list ($start, $end) = $media->indices;
                $replacements[$start] = array($start, $end,
                    "<a href=\"{$media->url}\">{$media->display_url}</a>");
            }
        }

        // sort in reverse order by start location
        krsort($replacements);

        foreach ($replacements as $replace_data) {
            list ($start, $end, $replace_text) = $replace_data;
            $text = mb_substr($text, 0, $start, 'UTF-8') . $replace_text . mb_substr($text, $end, NULL, 'UTF-8');
        }

        return $text;
    }

    /**
     * Gets connection with user Twitter account
     * @param  String $cons_key     Consumer Key
     * @param  String $cons_secret  Consumer Secret Key
     * @param  String $oauth_token  Access Token
     * @param  String $oauth_secret Access Secrete Token
     * @return Object               Twitter Session
     */
    function getConnectionWithToken($cons_key, $cons_secret, $oauth_token, $oauth_secret)
    {
        $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_secret);

        return $connection;
    }

    // Connect
    $connection = getConnectionWithToken(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET);

    // Get Tweets
    if (!empty($list_slug)) {
      $params = array(
          'owner_screen_name' => $username,
          'slug' => $list_slug,
          'per_page' => $number
      );

      $url = '/lists/statuses';
    } else if($hashtag) {
      $params = array(
          'count' => $number,
          'q' => '#'.$hashtag
      );

      $url = '/search/tweets';
    } else {
      $params = array(
          'count' => $number,
          'exclude_replies' => $exclude_replies,
          'screen_name' => $username
      );

      $url = '/statuses/user_timeline';
    }

    $tweets = $connection->get($url, $params);

    // format date and prepare links in text
    foreach($tweets as $i => $tweet) {
        $tweets[$i]->text_entitled = add_tweet_entity_links($tweets[$i]);

        $date = date_parse($tweet->created_at);

        if($date['year'] == date('Y')) {
            $date = date('j F', strtotime($tweet->created_at));
        } else {
            $date = date('j F Y', strtotime($tweet->created_at));
        }
        $tweets[$i]->date_formatted = $date;
    }

    // Return JSON Object
    header('Content-Type: application/json');

    $tweets = json_encode($tweets);
    if(CACHE_ENABLED) file_put_contents($cache_path . $cache_key, $tweets);
    echo $tweets;
