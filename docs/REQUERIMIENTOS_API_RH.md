# Requerimientos de API para Sincronización de Empleados RH -> PIP

## 1. Objetivo

Definir los datos mínimos que el sistema de RH debe exponer mediante una API para sincronizar empleados y estructura organizacional hacia PIP.

El objetivo es que PIP pueda:

- identificar y actualizar empleados;
- mantener la estructura organizacional;
- resolver relaciones de división, sucursal, puesto y centro de costo;
- soportar organigrama, autorizaciones y procesos dependientes del jefe inmediato;
- evitar capturar manualmente datos maestros que ya existen en RH.

## 2. Alcance de la sincronización

La integración debe considerar como datos maestros de RH las siguientes entidades:

- Empleados
- Divisiones
- Sucursales o departamentos
- Puestos
- Centros de costo
- Jerarquía organizacional

## 3. Requerimiento general de integración

Se solicita que RH entregue una API que permita:

- consultar catálogos completos;
- consultar cambios incrementales por fecha de modificación;
- identificar registros activos e inactivos;
- mantener integridad entre llaves relacionadas;
- obtener la relación jefe-subordinado.

## 4. Entidades y campos requeridos

### 4.1 Empleados

Campos mínimos requeridos:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| NoEmpleado | integer o string corto | Sí | Identificador único del empleado en RH. Debe ser estable. |
| Nombre | string | Sí | Nombre completo del empleado. |
| Email | string | Sí | Correo del empleado. |
| Movil | string | Sí | Teléfono móvil o número de contacto. |
| Nivel | integer | Sí | Nivel jerárquico o administrativo usado en PIP. |
| IdDivision | integer o string | Sí | Llave de la división a la que pertenece. |
| IdSucursal | integer o string | Sí | Llave de la sucursal o departamento. |
| IdPuesto | integer o string | Sí | Llave del puesto del empleado. |
| IdCentroCosto | integer o string | Sí | Llave del centro de costo. |
| Status | boolean o integer | Sí | Indica si el empleado está activo o inactivo. |
| Antiguedad | date | Sí | Fecha de antigüedad o ingreso. |
| FNacimiento | date | Sí | Fecha de nacimiento. |
| RFC | string | Sí | RFC del empleado. |
| CURP | string | Sí | CURP del empleado. |
| NoSeguro | string | Sí | Número de seguro social. |

Campos recomendados adicionales:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| FechaAlta | datetime o date | Recomendado | Fecha de alta del empleado en RH. |
| FechaBaja | datetime o date | Recomendado | Fecha de baja, si aplica. |
| FechaModificacion | datetime | Recomendado | Permite sincronización incremental. |
| JefeInmediatoNoEmpleado | integer o string | Opcional | Alternativa a un endpoint separado de jerarquía. |

## 4.2 Divisiones

Campos base requeridos:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| IdDivision | integer o string | Sí | Identificador único de la división. |
| Division | string | Sí | Nombre de la división. |

Campos recomendados si RH es dueño de reglas operativas:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| LaburaSabados | boolean o integer | Opcional | Indica si la división labora sábados. |
| LaburaDomingos | boolean o integer | Opcional | Indica si la división labora domingos. |
| LaburaDiasFestivos | boolean o integer | Opcional | Indica si la división labora días festivos. |

## 4.3 Sucursales o departamentos

Campos base requeridos:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| IdSucursal | integer o string | Sí | Identificador único de la sucursal o departamento. |
| Sucursal | string | Sí | Nombre de la sucursal o departamento. |
| IdDivision | integer o string | Sí | Relación con la división. |

## 4.4 Puestos

Campos base requeridos:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| IdPuesto | integer o string | Sí | Identificador único del puesto. |
| Puesto | string | Sí | Nombre del puesto. |
| IdDivision | integer o string | Sí | Relación del puesto con la división. |

Campos opcionales si RH ya administra jerarquía por puesto:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| EsJefe | boolean o integer | Opcional | Indica si el puesto tiene rol de jefatura. |
| IdJefesPuesto | array o string | Opcional | Relación de puestos jefes, si RH ya la maneja. |

## 4.5 Centros de costo

Campos base requeridos:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| IdCentroCosto | integer o string | Sí | Identificador único del centro de costo. |
| CentrodeCosto | string | Sí | Descripción o nombre del centro de costo. |

## 4.6 Jerarquía organizacional

Este punto es necesario para soportar organigrama, autorizaciones y procesos donde se necesita conocer el jefe inmediato del empleado.

RH puede resolverlo de cualquiera de estas dos formas:

### Opción A. Endpoint dedicado de jerarquía

Campos requeridos:

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| EmpleadoPadre | integer o string | Sí | NoEmpleado del jefe inmediato. |
| EmpleadoHijo | integer o string | Sí | NoEmpleado del subordinado. |
| FechaModificacion | datetime | Recomendado | Permite sincronización incremental. |

### Opción B. Campo dentro del empleado

| Campo | Tipo sugerido | Obligatorio | Descripción |
|---|---|---:|---|
| JefeInmediatoNoEmpleado | integer o string | Sí | NoEmpleado del jefe inmediato del registro actual. |

La opción B simplifica la API si RH ya maneja esta relación directamente en el maestro de empleados.

## 5. Endpoints sugeridos

Se recomienda que RH exponga, como mínimo, los siguientes endpoints:

- GET /api/rh/divisiones
- GET /api/rh/sucursales
- GET /api/rh/puestos
- GET /api/rh/centros-costos
- GET /api/rh/empleados
- GET /api/rh/jerarquia

También se recomienda soportar filtros como:

- updated_since
- status
- page
- page_size

Ejemplo:

- GET /api/rh/empleados?updated_since=2026-06-01T00:00:00Z

## 6. Reglas de negocio para la integración

- NoEmpleado debe ser único y no debe reciclarse.
- Las llaves IdDivision, IdSucursal, IdPuesto e IdCentroCosto deben existir en sus respectivos catálogos.
- Un empleado inactivo no debe eliminarse físicamente del histórico de RH; debe enviarse con estatus de baja o inactivo.
- La API debe permitir distinguir altas, cambios y bajas.
- Si RH no puede exponer relaciones de jerarquía, PIP tendría que seguir administrándolas localmente, lo cual no es lo ideal.

## 7. Datos que no se requieren desde RH

Los siguientes datos pueden permanecer como responsabilidad local de PIP y no son requisito para la API inicial:

- contraseña del usuario en PIP;
- imagen o foto de perfil;
- firma del empleado;
- token de notificaciones móviles;
- datos médicos o de salud;
- preferencias internas del feed;
- permisos internos por menú;
- turnos operativos, salvo que RH también sea dueño de ese dato;
- saldo o lógica interna de vacaciones, salvo que se defina explícitamente que RH será la fuente oficial.

## 8. Recomendaciones técnicas

- Formato de respuesta JSON.
- Codificación UTF-8.
- Fechas en formato ISO 8601.
- Autenticación por token o API key.
- Capacidad de paginación para catálogos grandes.
- Capacidad de sincronización incremental por fecha de modificación.
- Disponibilidad de ambiente de pruebas antes de pasar a producción.

## 9. Ejemplo de payload mínimo

### Empleado

```json
{
  "NoEmpleado": 1024,
  "Nombre": "Juan Perez Lopez",
  "Email": "juan.perez@empresa.com",
  "Movil": "5551234567",
  "Nivel": 2,
  "IdDivision": 3,
  "IdSucursal": 8,
  "IdPuesto": 14,
  "IdCentroCosto": 4,
  "Status": 1,
  "Antiguedad": "2021-04-15",
  "FNacimiento": "1990-09-10",
  "RFC": "PELJ900910XXX",
  "CURP": "PELJ900910HDFXXX00",
  "NoSeguro": "12345678901",
  "FechaModificacion": "2026-06-11T10:30:00Z"
}
```

### Jerarquía

```json
{
  "EmpleadoPadre": 1001,
  "EmpleadoHijo": 1024,
  "FechaModificacion": "2026-06-11T10:30:00Z"
}
```

## 10. Prioridad de entrega

Prioridad alta:

- Empleados
- Divisiones
- Sucursales
- Puestos
- Centros de costo
- Jerarquía organizacional

Prioridad media:

- Reglas operativas por división
- Fechas de modificación para incremental

Prioridad baja:

- Datos adicionales no críticos para primera sincronización

## 11. Nota operativa

La necesidad de jerarquía organizacional no es opcional desde la perspectiva funcional de PIP, porque impacta directamente organigrama, autorizaciones y flujos asociados al jefe inmediato.

En el código actual esto se refleja, entre otros puntos, en [Backend/Empleados/Empleados.php](Backend/Empleados/Empleados.php#L301) y [Backend/Empleados/Empleados.php](Backend/Empleados/Empleados.php#L1619).