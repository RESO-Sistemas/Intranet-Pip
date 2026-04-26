<?php

class SessionManager
{
    public static function init()
    {
        if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
            session_start();
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
