# 📱 Análisis Estratégico — App Móvil PIP

## Estado Actual

Lo que ya tienes implementado y funcionando:

| Módulo | Estado | Notas |
|---|---|---|
| Feed / Novedades | ✅ Completo | SSE en tiempo real, reacciones, comentarios |
| KPIs del día | ✅ Completo | Filtrado por puesto (`positionId`) |
| Checklist diario | ✅ Completo | Submit + resultado del día |
| Evaluaciones a empleados | ✅ Completo | Con respuestas y finalización |
| Evaluaciones 360 | ✅ Completo | Encuestas por competencia |
| Incidencias | ✅ Completo | CRUD + seguimiento |
| Organigrama | ✅ Completo | Vista jerárquica |
| Perfil del usuario | ✅ Completo | Datos personales |
| Vacantes disponibles | ⚠️ Backend listo | Sin pantalla en la app todavía |
| Próximos eventos | ✅ Completo | Cumpleaños, aniversarios, etc. |

---

## 🚦 Lo que Ya Tienes vs. Lo que Te Falta

El backend ya tiene controladores para **vacantes** (`VacancyController`) pero la app no los consume. Hay servicios definidos en `api-client.ts` que tampoco tienen pantalla: el endpoint `FeedController` con SSE está bien aprovechado.

El `AuthUser` tiene estos campos clave para el control de acceso:
```ts
level: number | null      // Nivel jerárquico del empleado
divisionId: number | null // División
branchId: number | null   // Sucursal
positionId: number | null // Puesto
positionName: string      // Nombre del puesto
```

---

## 🔥 Funcionalidades Recomendadas por Prioridad

### 🔴 ALTA PRIORIDAD — Impacto inmediato para el usuario

#### 1. 💼 Bolsa de Trabajo Interna
**¿Por qué?** Ya tienes el backend (`VacancyController`, `VacanteModels`). Solo falta la pantalla.
- Ver vacantes disponibles con descripción, área, sucursal
- Postularse con un solo tap
- Estado de postulación ("En revisión", "Seleccionado", etc.)
- **Solo visible si el empleado cumple criterios** (nivel, área)

> Esto aumenta la retención interna y fomenta el crecimiento del personal.

---

#### 2. 🔔 Centro de Notificaciones
**¿Por qué?** Actualmente las notificaciones push no existen en la app. Tienes SSE para el feed, pero nada más.
- Inbox de notificaciones (evaluaciones pendientes, nuevas vacantes, incidencias resueltas)
- Badge con contador no leído en el ícono de la tab
- Historial de notificaciones
- **Push notifications** con Expo Notifications

> Es la funcionalidad con mayor impacto en la retención y engagement de la app.

---

#### 3. 📅 Mis Solicitudes / Autoservicio
**¿Por qué?** Los empleados necesitan hacer trámites sin ir a RH.
- Solicitud de vacaciones / días libres
- Solicitud de permisos (médico, personal)
- Constancias laborales
- Ver historial de solicitudes y estatus
- **Solo operativos y mandos medios** pueden solicitar; RH y gerentes aprueban

---

### 🟡 MEDIA PRIORIDAD — Diferenciador importante

#### 4. 📊 Histórico de Mi Desempeño
**¿Por qué?** El checklist diario acumula datos pero no hay vista de tendencia para el empleado.
- Gráfica de mis KPIs por semana/mes
- Comparativa con el promedio del equipo
- Racha de días con checklist completado ("streak")
- Mis resultados de evaluaciones anteriores

---

#### 5. 👥 Directorio de Contactos
**¿Por qué?** Ya tienes el organigrama, pero no hay manera fácil de contactar a alguien.
- Buscar empleados por nombre o puesto
- Ver teléfono, correo, sucursal
- Botón de llamar / correo directo desde la app
- Organizado por División → Sucursal → Departamento

> Diferente al organigrama: este es funcional para comunicación, el organigrama es para ver jerarquía.

---

#### 6. 🎯 Metas Personales / OKRs
**¿Por qué?** Complementa los KPIs automáticos del checklist con objetivos cualitativos.
- El jefe define metas para el empleado
- El empleado puede actualizarlas con avance
- Indicador de cumplimiento al final del período

---

### 🟢 BAJA PRIORIDAD — Para fases futuras

#### 7. 🏆 Gamificación / Reconocimientos
- Sistema de puntos por racha de checklists completados
- Ranking del equipo (opt-in)
- Reconocimientos entre compañeros ("¡Buen trabajo, @colega!")

#### 8. 📸 Registro de Evidencias por Turno
- Foto geolocalizada al inicio/fin del turno
- Útil para personal de campo o sucursales

---

## 🎭 Control de Acceso por Perfil

### El problema actual
Actualmente **todos los usuarios ven las mismas tabs**, independientemente de si son:
- Un empleado operativo
- Un supervisor / jefe de área
- Un gerente de división
- Alguien de RH / Administración

### Solución propuesta: Hook `useRole`

Basándome en el campo `level` del `AuthUser` y en cómo el sistema ya filtra KPIs por `positionId`, propongo este esquema:

```ts
// Esquema de niveles (a confirmar con tu negocio)
// level <= 2  → Empleado operativo
// level 3-5  → Supervisor / Mando medio
// level 6+   → Gerente / Dirección
// divisionId = X → RH (a definir cuál es el ID)

export function useRole() {
  const { user } = useAuth();
  
  const isManager = (user?.level ?? 0) >= 6;
  const isSupervisor = (user?.level ?? 0) >= 3;
  const isHR = user?.divisionId === HR_DIVISION_ID; // Ajustar el ID
  
  return {
    canViewTeamKPIs: isManager || isSupervisor,
    canApproveRequests: isManager || isHR,
    canManageVacancies: isHR,
    canViewAllIncidencias: isManager || isSupervisor,
    canCreateFeedPost: isHR || isManager,
    canSeeOwnKPIs: true, // Todos
    canSeeEvaluations: true, // Todos
  };
}
```

### Pantallas / Tabs por Perfil

| Feature | Operativo | Supervisor | Gerente | RH |
|---|:---:|:---:|:---:|:---:|
| Feed / Novedades | ✅ | ✅ | ✅ | ✅ |
| Mis KPIs | ✅ | ✅ | ✅ | ❌ |
| KPIs de mi equipo | ❌ | ✅ | ✅ | ✅ |
| Checklist | ✅ | ✅ | ✅ | ❌ |
| Evaluaciones | ✅ | ✅ | ✅ | ✅ |
| Mis Incidencias | ✅ | ✅ | ✅ | ✅ |
| Incidencias del equipo | ❌ | ✅ | ✅ | ✅ |
| Solicitudes (crear) | ✅ | ✅ | ✅ | ❌ |
| Solicitudes (aprobar) | ❌ | ✅ | ✅ | ✅ |
| Vacantes (ver) | ✅ | ✅ | ✅ | ✅ |
| Vacantes (gestionar) | ❌ | ❌ | ✅ | ✅ |
| Organigrama | ✅ | ✅ | ✅ | ✅ |
| Crear publicación en Feed | ❌ | ❌ | ✅ | ✅ |

---

## 🏗️ Arquitectura para Control de Acceso

### ¿Dónde implementarlo?

**Opción A — Solo en la UI (recomendada para iniciar)**
- Ocultar tabs/botones según rol
- Fácil de implementar, ya tienes `user.level` en contexto
- El backend sigue validando con `[Authorize]`

**Opción B — Backend + UI (ideal para datos sensibles)**
- El API ya rechaza peticiones no autorizadas por token JWT
- Agregar roles/claims adicionales en el JWT
- La UI esconde y el backend bloquea (defensa en profundidad)

### Implementación mínima recomendada

```tsx
// En _layout.tsx — mostrar/ocultar tabs según nivel
const { user } = useAuth();
const isSupervisorOrAbove = (user?.level ?? 0) >= 3;

// Solo mostrar la tab de "Equipo" si es supervisor o más
{isSupervisorOrAbove && (
  <NativeTabs.Trigger name="equipo">
    <Label>Mi Equipo</Label>
    ...
  </NativeTabs.Trigger>
)}
```

---

## 📋 Recomendación de Roadmap

```
Fase 1 (Inmediato — 2-3 semanas):
  ├── Hook useRole() con lógica de niveles
  ├── Ocultar/mostrar tabs según perfil
  ├── Pantalla de Vacantes (backend ya está listo)
  └── Push Notifications básicas (Expo Notifications)

Fase 2 (1-2 meses):
  ├── Módulo de Solicitudes (vacaciones/permisos)
  ├── Histórico de Desempeño con gráficas
  └── Vista "Mi Equipo" para supervisores

Fase 3 (3-6 meses):
  ├── Directorio de Contactos mejorado
  ├── OKRs / Metas personales
  └── Gamificación / Reconocimientos
```

---

## ❓ Preguntas Clave para Definir Roles

1. **¿Cómo están definidos los niveles en tu base de datos?** 
   El campo `Level` existe en `Empleados`, pero necesito saber el rango de valores reales para mapear correctamente a roles.

2. **¿Qué división o puesto identifica a RH?** 
   Para poder distinguir a los de RH del resto.

3. **¿Los supervisores deben ver los KPIs de su equipo o solo los propios?**

4. **¿Quieres mantener 5 tabs o prefieres un menú lateral (drawer) para perfiles con más opciones?**
