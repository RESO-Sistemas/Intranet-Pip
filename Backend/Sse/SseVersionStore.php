<?php

class SseVersionStore
{
    private static function getStorePath()
    {
        return __DIR__ . '/../../tmp/sse_versions.json';
    }

    private static function ensureStore()
    {
        $storePath = self::getStorePath();
        $storeDir = dirname($storePath);

        if (!is_dir($storeDir)) {
            @mkdir($storeDir, 0777, true);
        }

        if (!file_exists($storePath)) {
            $initial = [
                'feed' => 0,
                'dashboard' => 0,
            ];
            @file_put_contents($storePath, json_encode($initial));
        }

        return $storePath;
    }

    public static function readState()
    {
        $storePath = self::ensureStore();
        $defaultState = [
            'feed' => 0,
            'dashboard' => 0,
        ];

        $content = @file_get_contents($storePath);
        if ($content === false || trim($content) === '') {
            return $defaultState;
        }

        $decoded = json_decode($content, true);
        if (!is_array($decoded)) {
            return $defaultState;
        }

        return [
            'feed' => isset($decoded['feed']) ? intval($decoded['feed']) : 0,
            'dashboard' => isset($decoded['dashboard']) ? intval($decoded['dashboard']) : 0,
        ];
    }

    public static function bump($channel)
    {
        $channel = ($channel === 'dashboard') ? 'dashboard' : 'feed';
        $storePath = self::ensureStore();
        $nowVersion = (int) floor(microtime(true) * 1000);
        $defaultState = [
            'feed' => 0,
            'dashboard' => 0,
        ];

        $fp = @fopen($storePath, 'c+');
        if ($fp === false) {
            return;
        }

        if (@flock($fp, LOCK_EX)) {
            $raw = stream_get_contents($fp);
            $state = json_decode($raw, true);
            if (!is_array($state)) {
                $state = $defaultState;
            }

            $state['feed'] = isset($state['feed']) ? intval($state['feed']) : 0;
            $state['dashboard'] = isset($state['dashboard']) ? intval($state['dashboard']) : 0;
            $state[$channel] = $nowVersion;

            ftruncate($fp, 0);
            rewind($fp);
            fwrite($fp, json_encode($state));
            fflush($fp);
            @flock($fp, LOCK_UN);
        }

        fclose($fp);
    }
}

?>