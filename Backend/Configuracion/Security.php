<?php
/**
 * Security.php
 * Configuración de seguridad para encriptación de tokens
 * 
 * IMPORTANTE: Esta clave debe ser única y segura.
 * NO compartir este archivo en repositorios públicos.
 */

class Security
{
    /**
     * Clave secreta para encriptación AES-256
     * CAMBIAR EN PRODUCCIÓN por una clave única generada con:
     * openssl_rand_pseudo_bytes(32)
     */
    const ENCRYPTION_KEY = 'K1yn3t_S3cur3_K3y_2025_P0stul4nt3s_Ar4v3s_Pr0t3ct3d';
    
    /**
     * Método de encriptación
     */
    const ENCRYPTION_METHOD = 'AES-256-CBC';
    
    /**
     * Longitud del IV (Initialization Vector)
     */
    const IV_LENGTH = 16;
    
    /**
     * Obtiene la clave de encriptación procesada
     * @return string Clave de 32 bytes para AES-256
     */
    public static function getEncryptionKey()
    {
        // Asegurar que la clave tenga exactamente 32 bytes (256 bits)
        return hash('sha256', self::ENCRYPTION_KEY, true);
    }
    
    /**
     * Genera una clave aleatoria para uso en producción
     * @return string Clave en formato hexadecimal
     */
    public static function generateRandomKey()
    {
        return bin2hex(openssl_random_pseudo_bytes(32));
    }
}
