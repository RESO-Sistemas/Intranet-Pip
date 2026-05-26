<?php

class SessionManager
{
    // Evitar re-abrir la sesión después de session_write_close().
    // $_SESSION sigue disponible para lectura después del cierre.
    private static $started = false;

    public static function init()
    {
        if (self::$started) return;
        if (session_status() === PHP_SESSION_ACTIVE) {
            self::$started = true;
            return;
        }
        if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
            session_start();
            self::$started = true;
        }
    }

    // Libera el lock de sesión después de leer los datos necesarios.
    // Llamar en endpoints que solo leen la sesión (nunca escriben).
    // Tras esto, $_SESSION sigue accesible y self::$started=true
    // previene que init() re-abra (y re-bloquee) la sesión.
    public static function releaseAfterRead()
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            session_write_close();
        }
    }

    /**
     * Crea una sesión de usuario con sus datos
     */
    public static function login($userData)
    {
        self::init();
        
        // Regenerar el Session ID por seguridad (previene session fixation)
        session_regenerate_id(true);
        
        $_SESSION['NoEmpleado'] = $userData['NoEmpleado'];
        $_SESSION['nivel'] = $userData['Nivel'];
        $_SESSION['IdDivision'] = $userData['IdDivision'];
        $_SESSION['IdSucursal'] = $userData['IdSucursal'];
        $_SESSION['idSPuesto'] = $userData['IdPuesto'];
        $_SESSION['idCentroCosto'] = $userData['IdCentroCosto'];
        $_SESSION['nombre'] = $userData['Nombre'];
        $_SESSION['sesion'] = 'activa';
        $_SESSION['tipo_sesion'] = '1';
        $_SESSION['verificaSesion'] = 'activa';
        $_SESSION['login_time'] = time();

        // Compatibilidad con paginas legacy que aun validan cookies en lugar de session.
        $cookieExpire = time() + (86400 * 30);
        setcookie('NoEmpleado', (string) $userData['NoEmpleado'], $cookieExpire, '/');
        setcookie('nivel', (string) $userData['Nivel'], $cookieExpire, '/');
        setcookie('IdDivision', (string) $userData['IdDivision'], $cookieExpire, '/');
        setcookie('IdSucursal', (string) $userData['IdSucursal'], $cookieExpire, '/');
        setcookie('idSPuesto', (string) $userData['IdPuesto'], $cookieExpire, '/');
        setcookie('idCentroCosto', (string) $userData['IdCentroCosto'], $cookieExpire, '/');
        setcookie('nombre', (string) $userData['Nombre'], $cookieExpire, '/');
        setcookie('sesion', 'activa', time() + (86400 * 300), '/');
        setcookie('tipo_sesion', '1', $cookieExpire, '/');
        setcookie('verificaSesion', 'activa', $cookieExpire, '/');
    }

    /**
     * Destruye la sesión del usuario y elimina la cookie PHPSESSID
     */
    public static function logout()
    {
        self::init();
        
        // Limpiar todas las variables de sesión
        $_SESSION = array();
        
        // Eliminar la cookie de sesión (PHPSESSID)
        if (isset($_COOKIE[session_name()])) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(), 
                '', 
                time() - 3600,
                $params["path"], 
                $params["domain"],
                $params["secure"], 
                $params["httponly"]
            );
            unset($_COOKIE[session_name()]);
        }

        foreach (['NoEmpleado', 'nivel', 'IdDivision', 'IdSucursal', 'idSPuesto', 'idCentroCosto', 'nombre', 'sesion', 'tipo_sesion', 'verificaSesion'] as $cookieName) {
            if (isset($_COOKIE[$cookieName])) {
                setcookie($cookieName, '', time() - 3600, '/');
                unset($_COOKIE[$cookieName]);
            }
        }

        // Destruir la sesión completamente
        session_destroy();
    }

    /**
     * Verifica si hay una sesión activa
     */
    public static function isLoggedIn()
    {
        self::init();
        return isset($_SESSION['sesion']) && $_SESSION['sesion'] === 'activa';
    }

    /**
     * Obtiene un dato de la sesión
     */
    public static function get($key)
    {
        self::init();
        return isset($_SESSION[$key]) ? $_SESSION[$key] : null;
    }

    /**
     * Establece un dato en la sesión
     */
    public static function set($key, $value)
    {
        self::init();
        $_SESSION[$key] = $value;
    }

    /**
     * Verifica si existe un dato en la sesión
     */
    public static function has($key)
    {
        self::init();
        return isset($_SESSION[$key]);
    }

    /**
     * Obtiene todos los datos del usuario logueado
     */
    public static function getUserData()
    {
        self::init();
        if (!self::isLoggedIn()) {
            return null;
        }

        return [
            'NoEmpleado' => self::get('NoEmpleado'),
            'nivel' => self::get('nivel'),
            'IdDivision' => self::get('IdDivision'),
            'IdSucursal' => self::get('IdSucursal'),
            'idSPuesto' => self::get('idSPuesto'),
            'idCentroCosto' => self::get('idCentroCosto'),
            'nombre' => self::get('nombre')
        ];
    }

    /**
     * Redirige a login si no hay sesión activa
     */
    public static function requireLogin($redirectTo = 'login.php')
    {
        self::init();
        if (!self::isLoggedIn()) {
            header("Location: $redirectTo");
            exit();
        }
    }
}
