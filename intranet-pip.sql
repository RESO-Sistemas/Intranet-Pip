create table ActividadesPlanAccion
(
    idActividadesPlanAccion int auto_increment
        primary key,
    idObjetivosPlanAccion   int                                not null,
    Titulo                  text collate utf8_unicode_ci       null,
    Descripcion             text collate utf8_unicode_ci       null,
    FechaInicio             date                               null,
    FechaFin                date                               null,
    Progreso                int      default 0                 not null,
    FechaRegistro           datetime default CURRENT_TIMESTAMP null
);

create table ArchivosCapacitacion
(
    id     int auto_increment
        primary key,
    nombre varchar(200) null,
    constraint nombre_UNIQUE
        unique (nombre)
)
    engine = InnoDB
    collate = utf8_spanish2_ci;

create table ArchivosFeed
(
    idArchivosFeed int auto_increment
        primary key,
    idFeed         int          not null,
    Archivo        text         not null,
    ContentType    varchar(100) null,
    Content        longblob     null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table ArchivosFeedTest
(
    idArchivosFeed int auto_increment
        primary key,
    idFeed         int                                 not null,
    Archivo        varchar(255)                        null,
    ContentType    varchar(100)                        null,
    Content        longblob                            null,
    Registro       timestamp default CURRENT_TIMESTAMP not null
);

create table AreasTecnicas
(
    IdAreaTecnica      int auto_increment
        primary key,
    NombreArea         varchar(100)                         not null,
    Descripcion        text                                 null,
    Estatus            tinyint(1) default 1                 null,
    FechaCreacion      timestamp  default CURRENT_TIMESTAMP not null,
    FechaActualizacion timestamp  default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);

create table AvancePlanAccionInc
(
    IdAvance          int auto_increment
        primary key,
    IdPlanAccionInc   int                                not null,
    NuevoAvance       int                                not null,
    DescripcionAvance text                               not null,
    FechaRegistro     datetime default CURRENT_TIMESTAMP null
);

create index IdPlanAccionInc
    on AvancePlanAccionInc (IdPlanAccionInc);

create table BitacoraVisitasIndex
(
    idBitacoraVisitasIndex int auto_increment
        primary key,
    NoEmpleado             int                                not null,
    FechaRegistro          datetime default CURRENT_TIMESTAMP not null
);

create table Capacitacion
(
    idCapacitacion         int auto_increment
        primary key,
    Descripcion            text          not null,
    FechaInicio            date          not null,
    FechaFin               date          not null,
    HoraInicio             time          not null,
    HoraFin                time          not null,
    Registro               datetime      not null,
    Status                 int default 1 null,
    Dias                   varchar(100)  not null,
    archivo                varchar(100)  null,
    id_archivoCapacitacion int           null,
    Tipo                   varchar(10)   not null,
    constraint FK_id_archivocapacitacion
        foreign key (id_archivoCapacitacion) references ArchivosCapacitacion (id)
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table CapacitacionDetalle
(
    id              int auto_increment
        primary key,
    id_capacitacion int  not null,
    NoEmpleado      text not null
);

create table Capacitacion_DivxPuesxDpto
(
    id              int auto_increment
        primary key,
    id_capacitacion int  not null,
    NoEmpleado      text not null
)
    engine = InnoDB
    collate = utf8_spanish2_ci;

create table CatalogoLineaEtica
(
    idCatalogoLineaEtica int auto_increment
        primary key,
    Descripcion          varchar(45)   not null,
    Status               int default 1 null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table CentroCostos
(
    IdCentroCosto int          not null
        primary key,
    CentrodeCosto varchar(200) not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table ChecklistEmpleados
(
    IdChecklistEmpleado int auto_increment
        primary key,
    IdChecklist         int                                not null,
    NoEmpleado          varchar(20)                        not null,
    Respuesta           tinyint(1)                         not null comment '1=True, 0=False',
    HoraRevision        datetime default CURRENT_TIMESTAMP not null
)
    engine = InnoDB
    charset = utf8mb4;

create table ChecklistTurnos
(
    IdChecklist int not null,
    IdTurno     int not null,
    primary key (IdChecklist, IdTurno)
);

create index IdTurno
    on ChecklistTurnos (IdTurno);

create table Checklists
(
    IdChecklist       int auto_increment
        primary key,
    Nombre            varchar(200)                                        not null,
    IdPuesto          int                                                 not null,
    Tipo              enum ('Critico', 'No Critico') default 'No Critico' not null,
    RespuestaEsperada tinyint(1)                     default 1            not null,
    IdKpi             int                                                 not null,
    AbreIncidencia    tinyint(1)                     default 0            not null,
    IdTipoIncidencia  int                                                 null
);

create index IdKpi
    on Checklists (IdKpi);

create index IdPuesto
    on Checklists (IdPuesto);

create index fk_chk_tipo_inc
    on Checklists (IdTipoIncidencia);

create table ComentariosFeed
(
    idComentariosFeed      int auto_increment
        primary key,
    idFeed                 int                                not null,
    NoEmpleado             int                                not null,
    Comentario             text                               not null,
    Registro               datetime default CURRENT_TIMESTAMP not null,
    Revisado               int      default 0                 not null,
    Autorizado             int      default 0                 not null,
    UsuarioRevisa          int                                null,
    FechaRevisado          datetime                           null,
    UsuarioCancelaAceptada int                                null,
    FechaCancelaAceptada   datetime                           null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table Competencias
(
    idCompetencias  int auto_increment
        primary key,
    Competencia     varchar(50)   not null,
    Significado     varchar(500)  not null,
    Estatus         int default 1 not null,
    TipoCompetencia int           not null,
    A               text          null,
    B               text          null,
    C               text          null,
    D               text          null,
    E               text          null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table Configuracion
(
    idConfiguracion int auto_increment
        primary key,
    Valor           text collate utf8_unicode_ci         not null,
    Descripcion     varchar(100) collate utf8_unicode_ci not null,
    Status          int default 1                        not null,
    Detalles        varchar(500) collate utf8_unicode_ci not null
);

create table ConfiguracionInicialEvaluacion
(
    idConfiguracionInicialEvaluacion int auto_increment
        primary key,
    IdSucursal                       int not null,
    idEvaluaciones                   int not null
);

create table ConfiguracionPersonalizacion
(
    idConfiguracionPersonalizacion int auto_increment
        primary key,
    MensajeBienvenida              varchar(250) collate utf8_unicode_ci not null,
    TiempoHorasRecoveryPass        int                                  not null,
    PuestoRecibeLineaEtica         text                                 null
);

create table DetalleCapacitacion
(
    idDetalleCapacitacion int auto_increment
        primary key,
    idCapacitacion        int not null,
    idDiasSemana          int not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table DetalleCompetencias
(
    idDetalleCompetencias int auto_increment
        primary key,
    idCompetencias        int                          not null,
    NivelEmpleado         int                          not null,
    CalificacionEsperado  char collate utf8_unicode_ci not null
);

create table DetalleDirectorioExtensiones
(
    idDetalleDirectorioExtensiones int auto_increment
        primary key,
    idDirectorioExtensiones        int           not null,
    NoEmpleado                     int           not null,
    Extension                      int           not null,
    Registro                       datetime      not null,
    Status                         int default 1 not null
);

create table DetalleDirectoriosCorreosTelefonos
(
    idDetalleDirectoriosCorreosTelefonos int auto_increment
        primary key,
    idDirectoriosCorreosTelefonos        int                                 not null,
    NoEmpleado                           int                                 not null,
    Registro                             datetime                            not null,
    Status                               int default 1                       not null,
    Email                                varchar(50) collate utf8_unicode_ci not null,
    Telefono                             varchar(15) collate utf8_unicode_ci not null,
    MarcacionCorta                       int                                 not null
);

create table DetalleEvaluacionesRespondidas
(
    idDetalleEvaluacionesRespondidas int auto_increment
        primary key,
    idEvaluaciones                   int      not null,
    NoEmpleado                       int      not null,
    Registro                         datetime not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table DetalleOrganigrama
(
    idDetalleOrganigrama      int auto_increment
        primary key,
    idOrganigramas            int                           not null,
    idDetalleOrganigramaPadre int                           not null,
    NoEmpleadoHijo            int                           not null,
    Status                    int            default 1      not null,
    Registro                  datetime                      not null,
    Otros                     varchar(45)                   not null,
    Tipo                      varchar(30)                   not null,
    Nivel                     int                           not null,
    CoordenadaY               decimal(10, 2)                not null,
    CoordenadaX               decimal(10, 2)                not null,
    Ancho                     decimal(10, 2) default 170.00 not null,
    Altura                    decimal(10, 2) default 100.00 not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table DiasFestivos
(
    idDiasFestivos int auto_increment
        primary key,
    Descripcion    text collate utf8_unicode_ci        not null,
    Dia            varchar(15) collate utf8_unicode_ci not null,
    Status         int default 1                       not null
);

create table DiasSemana
(
    idDiasSemana int auto_increment
        primary key,
    Dia          varchar(45) not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table DirectorioExtensiones
(
    idDirectorioExtensiones int auto_increment
        primary key,
    Tipo                    varchar(100) collate utf8_unicode_ci not null,
    Status                  int default 1                        not null
);

create table DirectorioSucursales
(
    idDirectorioSucursales int auto_increment
        primary key,
    IdSucursal             int                                  not null,
    Direccion              varchar(250) collate utf8_unicode_ci not null,
    Telefono               varchar(10) collate utf8_unicode_ci  not null,
    NumRed                 varchar(10) collate utf8_unicode_ci  not null,
    Correo                 varchar(100) collate utf8_unicode_ci not null,
    FechaApertura          date                                 not null,
    MarcacionCorta         int(4)                               not null,
    Registro               datetime                             not null,
    Status                 int default 1                        not null
);

create table DirectoriosCorreosTelefonos
(
    idDirectoriosCorreosTelefonos int auto_increment
        primary key,
    Tipo                          varchar(100) collate utf8_unicode_ci not null,
    Status                        int default 1                        not null
);

create table Divisiones
(
    IdDivision         int           not null
        primary key,
    Division           varchar(200)  not null,
    LaburaSabados      int default 1 not null,
    LaburaDomingos     int default 1 not null,
    LaburaDiasFestivos int default 1 not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table DocumentacionEmpleados
(
    IdDocumentacionEmpleado int auto_increment
        primary key,
    NoEmpleado              int                                                                 not null,
    IdTipoDocumento         int                                                                 not null,
    Estatus                 enum ('Completo', 'Pendiente', 'Vencido') default 'Pendiente'       not null,
    FechaCarga              date                                                                null,
    FechaVencimiento        date                                                                null,
    RutaArchivo             varchar(500)                                                        null,
    Observaciones           text                                                                null,
    UsuarioRegistro         int                                                                 null,
    FechaRegistro           timestamp                                 default CURRENT_TIMESTAMP not null,
    FechaActualizacion      timestamp                                 default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint uk_doc_empleado_tipo
        unique (NoEmpleado, IdTipoDocumento)
);

create index idx_docempl_empl_estatus
    on DocumentacionEmpleados (NoEmpleado, Estatus);

create index idx_docempl_empl_fechavence
    on DocumentacionEmpleados (NoEmpleado, FechaVencimiento);

create index idx_docempl_empl_tipodoc
    on DocumentacionEmpleados (NoEmpleado, IdTipoDocumento);

create index idx_docempl_empleado
    on DocumentacionEmpleados (NoEmpleado);

create index idx_docempl_estatus
    on DocumentacionEmpleados (Estatus);

create index idx_docempl_fechavence
    on DocumentacionEmpleados (FechaVencimiento);

create index idx_docempl_tipodoc
    on DocumentacionEmpleados (IdTipoDocumento);

create table EsperaNuevaEvaluacion
(
    idEsperaNuevaEvaluacion int auto_increment
        primary key,
    NoEmpleadoEvalua        int not null,
    NoEmpleadoEvaluado      int not null,
    TipoEvaluador           int not null,
    NoEmpleadoRegistra      int not null,
    NivelEvaluado           int not null
);

create table EsquemaVacunacionCOVID
(
    idEsquemaVacunacionCOVID int auto_increment
        primary key,
    Numero                   int         not null,
    Vacuna                   varchar(45) not null,
    FechaVacunacion          date        null,
    NoEmpleado               int         not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table EstadoMensajesCapacitacion
(
    idEstadoMensajesCapacitacion int auto_increment
        primary key,
    NoEmpleado                   int      not null,
    idCapacitacion               int      not null,
    Registro                     datetime not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table EvaluacionDetalle
(
    idEvaluacionDetalle int auto_increment
        primary key,
    idEvaluaciones      int           not null,
    NoEmpleadoEvalua    int           not null,
    NoEmpleadoEvaluado  int           not null,
    Status              int default 1 not null,
    StatusEvaluado      int default 0 not null,
    JefeEvalua          int default 0 not null,
    ParEvalua           int default 0 not null,
    AutoEvalua          int default 0 not null,
    SubordinadoEvalua   int default 0 not null,
    NivelEvaluado       int           not null,
    PuestoEvaluado      int           not null
);

create table Evaluaciones
(
    idEvaluaciones          int auto_increment
        primary key,
    Titulo                  varchar(150)                          not null,
    TipoEvaluacion          tinyint(1)  default 1                 not null comment '1 = Evaluación 360, 2 = Encuesta Normal',
    Periodicidad            tinyint(1)                            null comment '1 = Diario, 2 = Semanal, 3 = Mensual, 4 = Único',
    FechaInicio             date                                  not null,
    FechaFin                date                                  not null,
    Status                  int         default 1                 not null,
    RetroFechaIni           date                                  not null,
    RetroFechaFin           date                                  not null,
    PlanAFechaIni           date                                  not null,
    PlanAFechaFin           date                                  not null,
    DirigidoA               tinyint     default 1                 not null,
    EmpleadosParticipantes  text                                  null comment 'Lista de NoEmpleado de participantes separados por coma',
    Activado                int         default 0                 not null,
    FechaRegistro           datetime    default CURRENT_TIMESTAMP not null,
    PreguntasAceptadas      int         default 0                 not null,
    TipoSeleccionaSucursal  int                                   null,
    TipoOpcionConfiguracion int                                   null,
    Falla                   varchar(45) default '1'               null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table Eventos
(
    idEventos   int auto_increment
        primary key,
    Titulo      text          not null,
    Descripcion text          not null,
    FechaInicio date          not null,
    FechaFin    date          not null,
    HoraInicio  time          not null,
    HoraFin     time          not null,
    Status      int default 1 not null,
    Registro    datetime      not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table Feed
(
    idFeed          int auto_increment
        primary key,
    Titulo          varchar(250)  not null,
    Descripcion     text          not null,
    Registro        varchar(45)   not null,
    NoEmpleado      int           not null,
    Tipo            varchar(3)    not null,
    Hipervinculo    varchar(250)  null,
    Revisado        int default 0 not null,
    AutorizadoIndex int default 0 not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table Incidencias
(
    IdIncidencia        int auto_increment
        primary key,
    IdChecklist         int                                                                  not null,
    IdTipoIncidencia    int                                                                  null,
    NoEmpleado          varchar(20)                                                          not null,
    Descripcion         text                                                                 not null,
    Evidencia           varchar(500)                                                         null,
    FechaRegistro       datetime                                   default CURRENT_TIMESTAMP null,
    Estado              enum ('Abierta', 'En proceso', 'Resuelta') default 'Abierta'         null,
    FechaResuelto       datetime                                                             null,
    NoEmpleadoResolutor varchar(20)                                                          null
);

create index fk_inc_checklist
    on Incidencias (IdChecklist);

create index fk_inc_tipo
    on Incidencias (IdTipoIncidencia);

create table Incidencias_Seguimiento
(
    IdSeguimiento int auto_increment
        primary key,
    IdIncidencia  int                                not null,
    Titulo        varchar(255)                       not null,
    Mensaje       text                               not null,
    FechaRegistro datetime default CURRENT_TIMESTAMP null
);

create index IdIncidencia
    on Incidencias_Seguimiento (IdIncidencia);

create table InduccionesAudiovisual
(
    IdAudiovisual int auto_increment
        primary key,
    IdInduccion   int                                 not null,
    TituloVideo   varchar(255)                        null,
    EnlaceExterno varchar(500)                        not null,
    Plataforma    varchar(50)                         null,
    FechaCreacion timestamp default CURRENT_TIMESTAMP not null
);

create index IdInduccion
    on InduccionesAudiovisual (IdInduccion);

create table InduccionesMaterial
(
    IdMaterial    int auto_increment
        primary key,
    IdInduccion   int                                 not null,
    NombreArchivo varchar(255)                        not null,
    RutaArchivo   varchar(500)                        not null,
    TipoArchivo   varchar(100)                        null,
    FechaCreacion timestamp default CURRENT_TIMESTAMP not null
);

create index IdInduccion
    on InduccionesMaterial (IdInduccion);

create table InduccionesPuestos
(
    IdInduccionPuesto int auto_increment
        primary key,
    IdInduccion       int                                 not null,
    IdPuesto          int                                 not null,
    FechaAsignacion   timestamp default CURRENT_TIMESTAMP not null,
    constraint unique_induccion_puesto
        unique (IdInduccion, IdPuesto)
);

create index IdPuesto
    on InduccionesPuestos (IdPuesto);

create table InduccionesVacantes
(
    IdInduccion        int auto_increment
        primary key,
    NombreInduccion    varchar(150)                         not null,
    Descripcion        text                                 null,
    IdAreaTecnica      int                                  null,
    DuracionEstimada   varchar(50)                          null,
    Estatus            tinyint(1) default 1                 null,
    FechaCreacion      timestamp  default CURRENT_TIMESTAMP not null,
    FechaActualizacion timestamp  default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);

create index IdAreaTecnica
    on InduccionesVacantes (IdAreaTecnica);

create table Kpis
(
    IdKpi             int auto_increment
        primary key,
    Nombre            varchar(200)                             not null,
    ValorAlta         decimal(10, 2)                           not null,
    ValorMedia        decimal(10, 2)                           not null,
    ValorBaja         decimal(10, 2)                           not null,
    ValorActual       decimal(10, 2) default 0.00              null,
    Prioridad         int            default 1                 not null,
    Puestos           varchar(500)   default 'TODOS'           null,
    Activo            tinyint(1)     default 1                 null,
    FechaCreacion     datetime       default CURRENT_TIMESTAMP null,
    FechaModificacion datetime       default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
)
    engine = InnoDB
    charset = utf8mb4;

create table LineaEticaMensajes
(
    idLineaEticaMensajes int auto_increment
        primary key,
    idCatalogoLineaEtica int           not null,
    NoEmpleado           int           not null,
    Registro             datetime      not null,
    Mensaje              text          not null,
    Revisado             int default 0 not null,
    MensajeRevisado      int default 1 not null,
    id_division          int           null,
    IdSucursal           int           null,
    constraint fk_rel_id_division
        foreign key (id_division) references Divisiones (IdDivision)
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table MenusPermisos
(
    idMenusPermisos int auto_increment
        primary key,
    id_menu         int not null,
    IdPuesto        int not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table Meses
(
    idMeses varchar(2) collate utf8_unicode_ci  not null
        primary key,
    Mes     varchar(15) collate utf8_unicode_ci not null,
    Dias    text collate utf8_unicode_ci        not null
);

create table ObjetivosPlanAccion
(
    idObjetivosPlanAccion    int auto_increment
        primary key,
    idPlanesAccionEvaluacion int                          not null,
    CalificacionFinal        decimal(10, 2)               not null,
    idCompetencias           int                          not null,
    Objetivo                 text collate utf8_unicode_ci null,
    DescObjetivo             text collate utf8_unicode_ci null
);

create table Organigramas
(
    idOrganigramas int auto_increment
        primary key,
    Titulo         varchar(100) collate utf8_unicode_ci not null,
    Registro       datetime                             not null,
    Status         int default 1                        not null
);

create table PlanAccionIncidencias
(
    IdPlanAccionInc int auto_increment
        primary key,
    IdIncidencia    int                                not null,
    Titulo          varchar(255)                       not null,
    Descripcion     text                               null,
    FechaInicio     date                               not null,
    FechaFin        date                               not null,
    Progreso        int      default 0                 null,
    UsuarioAlta     varchar(50)                        not null,
    FechaRegistro   datetime default CURRENT_TIMESTAMP null
);

create index IdIncidencia
    on PlanAccionIncidencias (IdIncidencia);

create table PlanesAccionEvaluacion
(
    idPlanesAccionEvaluacion  int auto_increment
        primary key,
    idEvaluaciones            int                                not null,
    NoEmpleado                int                                not null,
    FechaRegistro             datetime default CURRENT_TIMESTAMP not null,
    UsuarioAlta               int                                not null,
    Status                    int      default 1                 not null,
    Requerido                 int      default 0                 not null,
    StatusConfirmaActividades int      default 0                 not null,
    FechaConfirmaActividades  datetime                           null,
    StatusConfirmaPlanAccion  int      default 0                 not null,
    FechaConfirmaPlanAccion   datetime                           null
);

create table Postulantes
(
    IdPostulante       int auto_increment
        primary key,
    Nombre             varchar(100)                        not null,
    ApellidoPaterno    varchar(100)                        not null,
    ApellidoMaterno    varchar(100)                        null,
    CURP               varchar(18)                         null,
    Telefono           varchar(20)                         null,
    CorreoElectronico  varchar(150)                        not null,
    Direccion          varchar(300)                        null,
    Estado             varchar(100)                        null,
    Ciudad             varchar(100)                        null,
    IdEmpleado         int                                 null,
    FechaRegistro      timestamp default CURRENT_TIMESTAMP not null,
    FechaActualizacion timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint uk_postulante_correo
        unique (CorreoElectronico),
    constraint uk_postulante_curp
        unique (CURP)
);

create table PostulantesEvaluaciones
(
    IdPostulanteEvaluacion int auto_increment
        primary key,
    IdPostulanteVacante    int                  not null,
    IdVacanteEvaluacion    int                  not null,
    FechaInicio            timestamp            null,
    FechaFinalizacion      timestamp            null,
    Calificacion           decimal(5, 2)        null,
    EstatusEvaluacion      tinyint(1) default 1 null comment '1=Pendiente, 2=En progreso, 3=Completada',
    constraint uk_postulante_evaluacion
        unique (IdPostulanteVacante, IdVacanteEvaluacion)
);

create index fk_posteval_vaceval
    on PostulantesEvaluaciones (IdVacanteEvaluacion);

create index idx_posteval_estatus
    on PostulantesEvaluaciones (EstatusEvaluacion);

create index idx_posteval_fechainicio
    on PostulantesEvaluaciones (FechaInicio);

create index idx_posteval_postulante_fecha
    on PostulantesEvaluaciones (IdPostulanteVacante, FechaInicio);

create table PostulantesHistorial
(
    IdPostulanteHistorial int auto_increment
        primary key,
    IdPostulanteVacante   int                                 not null,
    IdProceso             int                                 not null,
    Fecha                 timestamp default CURRENT_TIMESTAMP not null,
    Observaciones         text                                null,
    Resultado             tinyint(1)                          null comment '1=Aprobado, 0=Reprobado, NULL=Pendiente',
    UsuarioRegistro       int                                 null comment 'ID del usuario que registró el avance'
);

create index fk_posthist_proceso
    on PostulantesHistorial (IdProceso);

create index idx_posthist_fecha
    on PostulantesHistorial (Fecha);

create index idx_posthist_postulante_proceso
    on PostulantesHistorial (IdPostulanteVacante, IdProceso, Fecha);

create index idx_posthist_resultado
    on PostulantesHistorial (Resultado);

create table PostulantesRequisitos
(
    IdPostulanteRequisito int auto_increment
        primary key,
    IdPostulanteVacante   int                                 not null,
    IdVacanteRequisito    int                                 not null,
    Respuesta             text                                null comment 'Respuesta del postulante al requisito',
    Cumple                tinyint(1)                          null comment '1=Cumple, 0=No cumple, NULL=Sin evaluar',
    FechaRespuesta        timestamp default CURRENT_TIMESTAMP not null,
    constraint uk_postulante_requisito
        unique (IdPostulanteVacante, IdVacanteRequisito)
);

create index fk_postreq_vacreq
    on PostulantesRequisitos (IdVacanteRequisito);

create table PostulantesVacantes
(
    IdPostulanteVacante  int auto_increment
        primary key,
    IdVacante            int                                  not null,
    IdPostulante         int                                  not null,
    FechaPostulacion     timestamp  default CURRENT_TIMESTAMP not null,
    EstatusPostulacion   tinyint(1) default 1                 null comment '1=En proceso, 2=Aceptado, 3=Rechazado, 4=Finalizado',
    RutaCV               varchar(500)                         null comment 'Ruta del archivo CV subido',
    RutaSolicitudEmpleo  varchar(500)                         null comment 'Ruta de la solicitud de empleo',
    Observaciones        text                                 null,
    UsuarioCambioEstatus int                                  null comment 'ID del empleado que cambió el estatus',
    FechaCambioEstatus   timestamp                            null comment 'Fecha del último cambio de estatus',
    constraint uk_postulante_vacante
        unique (IdVacante, IdPostulante)
)
    engine = InnoDB;

create table PostulantesArchivos
(
    IdArchivo           int auto_increment
        primary key,
    IdPostulanteVacante int                                 not null,
    TipoArchivo         enum ('CV', 'SolicitudEmpleo')      not null,
    NombreArchivo       varchar(255)                        not null,
    ContentType         varchar(100)                        not null,
    Contenido           longblob                            not null,
    TamanoBytes         bigint                              not null,
    FechaCreacion       timestamp default CURRENT_TIMESTAMP not null,
    FechaActualizacion  timestamp                           null on update CURRENT_TIMESTAMP,
    constraint uk_postulante_tipo
        unique (IdPostulanteVacante, TipoArchivo),
    constraint fk_postulante_vacante
        foreign key (IdPostulanteVacante) references PostulantesVacantes (IdPostulanteVacante)
            on delete cascade
)
    engine = InnoDB
    charset = utf8mb4;

create index fk_postvac_postulante
    on PostulantesVacantes (IdPostulante);

create index idx_postulante_vacante_id
    on PostulantesVacantes (IdPostulanteVacante);

create index idx_postvac_estatus
    on PostulantesVacantes (EstatusPostulacion);

create index idx_postvac_fechapost
    on PostulantesVacantes (FechaPostulacion);

create index idx_postvac_vacante_estatus
    on PostulantesVacantes (IdVacante, EstatusPostulacion);

create table PreguntasConfiguracion
(
    idPreguntasConfiguracion int auto_increment
        primary key,
    idPreguntasEvaluacion    int                                not null,
    RangoInicial             int                                null,
    RangoFinal               int                                null,
    BoolCorreta              int                                null,
    RespuestaEsperadoOM      int                                null,
    ValorEsperadoOM          int                                null,
    NivelEmpleadoEsperadoOM  int                                null,
    RespuestaCorrectaOM      int                                null,
    FechaRegistro            datetime default CURRENT_TIMESTAMP null
);

create table PreguntasEvaluacion
(
    idPreguntasEvaluacion int auto_increment
        primary key,
    idEvaluaciones        int                                  not null,
    idTipoPregunta        int                                  not null,
    idCompetencias        int                                  not null,
    Titulo                varchar(250) collate utf8_unicode_ci not null,
    Descripcion           text collate utf8_unicode_ci         not null,
    Registro              datetime default CURRENT_TIMESTAMP   not null
);

create table PreguntasPosiblesRespuestas
(
    idPreguntasPosiblesRespuestas int auto_increment
        primary key,
    idPreguntasEvaluacion         int                                not null,
    DescripcionRespuesta          text collate utf8_unicode_ci       not null,
    FechaRegistro                 datetime default CURRENT_TIMESTAMP null
);

create table ProcesosVacantes
(
    IdProceso          int auto_increment
        primary key,
    NombreProceso      varchar(100)                         not null,
    Descripcion        text                                 null,
    Estatus            tinyint(1) default 1                 null,
    FechaCreacion      timestamp  default CURRENT_TIMESTAMP not null,
    FechaActualizacion timestamp  default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);

create table PuestoTurno
(
    IdPuesto int not null,
    IdTurno  int not null,
    primary key (IdPuesto, IdTurno)
);

create index IdTurno
    on PuestoTurno (IdTurno);

create table Puestos
(
    IdPuesto      int auto_increment
        primary key,
    Puesto        varchar(200)  not null,
    IdDivision    int           not null,
    EsJefe        int default 0 not null,
    IdJefesPuesto text          null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table ReaccionComentario
(
    idReaccionComentario int auto_increment
        primary key,
    NoEmpleado           int                                not null,
    FechaRegistro        datetime default CURRENT_TIMESTAMP null,
    TipoReaccion         int                                null,
    idComentariosFeed    int                                not null
);

create table ReaccionFeed
(
    idReaccionFeed int auto_increment
        primary key,
    idFeed         int      not null,
    NoEmpleado     int      not null,
    Registro       datetime not null,
    idTipoReaccion int      not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table RelacionEmpleados
(
    idRelacionEmpleados int auto_increment
        primary key,
    EmpleadoPadre       int      not null,
    EmpleadoHijo        int      not null,
    Registro            datetime null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table RespuestaEvaluaciones
(
    idRespuestaEvaluaciones int auto_increment
        primary key,
    idEvaluacionDetalle     int                                 not null,
    idCompetencias          int                                 not null,
    Registro                datetime default CURRENT_TIMESTAMP  not null,
    Comentarios             text collate utf8_unicode_ci        null,
    Calificacion            varchar(10) collate utf8_unicode_ci null,
    idPreguntasEvaluacion   int                                 not null
);

create table RetroalimentacionEvaluacion
(
    idRetroalimentacionEvaluacion int auto_increment
        primary key,
    idEvaluaciones                int                                not null,
    NoEmpleado                    int                                not null,
    FechaAceptado                 datetime default CURRENT_TIMESTAMP not null
);

create table SolicitudesRecoveryPass
(
    idSolicitudesRecoveryPass int auto_increment
        primary key,
    NoEmpleado                int           not null,
    Registro                  datetime      not null,
    Visto                     int default 0 not null,
    Email                     varchar(30)   not null
);

create table SolicitudesVacaciones
(
    idSolicitudesVacaciones    int auto_increment
        primary key,
    NoEmpleado                 int                     not null,
    EmpleadoPadre              int                     not null,
    Status                     int         default 0   not null,
    Registro                   datetime                not null,
    FechaInicio                date                    not null,
    Comentarios                text                    null,
    FechaFin                   date                    not null,
    ComentariosSolicitud       text                    null,
    TotalDias                  int                     null,
    UsuarioFinalAutoriza       int                     null,
    FechaAutorizadoFinal       datetime                null,
    JefeInmediatoAutoriza      int                     null,
    FechaJefeInmediatoAutoriza datetime                null,
    VistoMsjJefe               varchar(45) default '0' null,
    VistoMsjFinal              varchar(45) default '0' null,
    DiaRegreso                 date                    not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table SucursalDepto
(
    IdSucursal int          not null
        primary key,
    Sucursal   varchar(200) not null,
    IdDivision int          not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table Empleados
(
    NoEmpleado                 int auto_increment
        primary key,
    Nombre                     text          not null,
    Antiguedad                 date          not null,
    FNacimiento                date          not null,
    RFC                        varchar(20)   not null,
    CURP                       varchar(25)   not null,
    NoSeguro                   varchar(20)   not null,
    Email                      varchar(30)   not null,
    Movil                      varchar(15)   not null,
    Nivel                      int           not null,
    IdCentroCosto              int           not null,
    IdDivision                 int           not null,
    IdSucursal                 int           not null,
    IdPuesto                   int           not null,
    Password                   varchar(45)   null,
    Imagen                     text          null,
    MarcacionCorta             int           null,
    HabitusExteriorDescripcion varchar(100)  null,
    Peso                       int           null,
    Complexion                 varchar(45)   null,
    Talla                      varchar(45)   null,
    FrCardiaca                 varchar(45)   null,
    FrRespiratoria             varchar(45)   null,
    TensionArterial            varchar(45)   null,
    Temperatura                int           null,
    GrupoSanguineo             varchar(45)   null,
    FactorRh                   int           null,
    CartillaVacunacion         int default 0 null,
    EsquemaCompleto            int default 0 null,
    OtrosComentariosSalud      varchar(100)  null,
    Firma                      text          null,
    Status                     int default 1 null,
    DiasVacacionesRest         int default 0 not null,
    tokenOS                    text          not null,
    Registro                   datetime      not null,
    FeedAnniversary            int default 1 not null,
    FeedBirthday               int default 1 not null,
    constraint FK_IdCentroCosto
        foreign key (IdCentroCosto) references CentroCostos (IdCentroCosto),
    constraint FK_IdDivision
        foreign key (IdDivision) references Divisiones (IdDivision),
    constraint FK_IdPuesto
        foreign key (IdPuesto) references Puestos (IdPuesto),
    constraint FK_IdSucursal
        foreign key (IdSucursal) references SucursalDepto (IdSucursal)
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create index FK_EmpCentroCosto
    on Empleados (IdCentroCosto);

create index FK_EmpDivision
    on Empleados (IdDivision);

create index FK_EmpPuesto
    on Empleados (IdPuesto);

create index FK_EmpSucursal
    on Empleados (IdSucursal);

create table TipoCompetencias
(
    idTipoCompetencias int auto_increment
        primary key,
    Descripcion        varchar(45)   not null,
    Estatus            int default 1 not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table TipoDocumentacion
(
    IdTipoDocumento int auto_increment
        primary key,
    NombreDocumento varchar(150)         not null,
    Obligatorio     tinyint(1) default 0 null,
    Estatus         tinyint(1) default 1 null
);

create table TipoEvento
(
    idTipoEvento int auto_increment
        primary key,
    Descripcion  varchar(50)   not null,
    Status       int default 1 not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table TipoPregunta
(
    idTipoPregunta   int auto_increment
        primary key,
    Descripcion      varchar(100) collate utf8_unicode_ci not null,
    Status           int default 1                        not null,
    Bool             int default 0                        not null,
    Multiple1R       int default 0                        not null,
    MultipleEsperado int default 0                        not null,
    EvaluaEmpleados  int default 0                        not null,
    Rango            int default 0                        not null
);

create table TipoReaccion
(
    idTipoReaccion int auto_increment
        primary key,
    Descripcion    varchar(45)   not null,
    Status         int default 1 not null
)
    engine = InnoDB
    collate = utf8_unicode_ci;

create table Tipos_Incidencias
(
    IdTipoIncidencia int auto_increment
        primary key,
    Nombre           varchar(150)                                              not null,
    NivelSeveridad   enum ('Baja', 'Media', 'Alta', 'Crítica') default 'Media' not null,
    IdPuesto         int                                                       null,
    SLA_Horas        int                                       default 24      not null,
    Activo           tinyint(1)                                default 1       not null
);

create index fk_ti_puesto
    on Tipos_Incidencias (IdPuesto);

create table Turnos
(
    IdTurno    int auto_increment
        primary key,
    Nombre     varchar(100)         not null,
    HoraInicio time                 not null,
    HoraFin    time                 not null,
    IdPuesto   int                  not null,
    Activo     tinyint(1) default 1 not null
);

create index IdPuesto
    on Turnos (IdPuesto);

create table Vacantes
(
    IdVacante          int auto_increment
        primary key,
    NombreVacante      varchar(150)                         not null,
    IdAreaTecnica      int                                  null,
    IdPuesto           int                                  null,
    TipoContratacion   varchar(50)                          not null comment 'Tiempo completo, Medio tiempo, Temporal, Por proyecto',
    IdSucursal         int                                  null,
    DescripcionPuesto  text                                 null,
    SalarioMinimo      decimal(12, 2)                       null,
    SalarioMaximo      decimal(12, 2)                       null,
    FechaApertura      date                                 not null,
    FechaCierre        date                                 null,
    Estatus            tinyint(1) default 1                 null comment '1=Borrador, 2=Activa, 3=Cerrada',
    Publicada          tinyint(1) default 0                 null comment '0=No publicada, 1=Publicada (no editable)',
    BanderaCV          tinyint(1) default 0                 null comment '1=Requiere Curriculum Vitae',
    BanderaSE          tinyint(1) default 0                 null comment '1=Requiere Solicitud de Empleo',
    FechaCreacion      timestamp  default CURRENT_TIMESTAMP not null,
    FechaActualizacion timestamp  default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);

create index fk_vacantes_areatecnica
    on Vacantes (IdAreaTecnica);

create index fk_vacantes_puesto
    on Vacantes (IdPuesto);

create index fk_vacantes_sucursal
    on Vacantes (IdSucursal);

create index idx_vacantes_activas_area
    on Vacantes (Estatus, Publicada, IdAreaTecnica);

create index idx_vacantes_estatus
    on Vacantes (Estatus);

create index idx_vacantes_fechaapertura
    on Vacantes (FechaApertura);

create index idx_vacantes_fechacierre
    on Vacantes (FechaCierre);

create index idx_vacantes_publicada
    on Vacantes (Publicada);

create table VacantesEvaluaciones
(
    IdVacanteEvaluacion int auto_increment
        primary key,
    IdVacante           int                                 not null,
    IdEvaluacion        int                                 not null,
    IdProceso           int                                 not null comment 'Proceso en el que se aplica la evaluación',
    FechaCreacion       timestamp default CURRENT_TIMESTAMP not null,
    constraint uk_vacante_evaluacion_proceso
        unique (IdVacante, IdEvaluacion, IdProceso)
);

create index fk_vacanteseval_evaluacion
    on VacantesEvaluaciones (IdEvaluacion);

create index fk_vacanteseval_proceso
    on VacantesEvaluaciones (IdProceso);

create table VacantesInducciones
(
    IdVacanteInduccion int auto_increment
        primary key,
    IdVacante          int                                 not null,
    IdInduccion        int                                 not null,
    FechaCreacion      timestamp default CURRENT_TIMESTAMP not null,
    constraint uk_vacante_induccion
        unique (IdVacante, IdInduccion)
);

create index fk_vacantesind_induccion
    on VacantesInducciones (IdInduccion);

create table VacantesRequisitos
(
    IdVacanteRequisito int auto_increment
        primary key,
    IdVacante          int                                 not null,
    Requisito          varchar(500)                        not null comment 'Perfil académico, experiencia, habilidades, etc.',
    Orden              int       default 0                 null,
    FechaCreacion      timestamp default CURRENT_TIMESTAMP not null
);

create index idx_vacreq_orden
    on VacantesRequisitos (IdVacante, Orden);

create table menus
(
    id_menu     int auto_increment
        primary key,
    Descripcion varchar(150)  null,
    Id_Padre    int           null,
    Habilitado  int default 1 null,
    URL         varchar(80)   null,
    Argumentos  varchar(150)  null
)
    engine = InnoDB
    collate = utf8_unicode_ci;


