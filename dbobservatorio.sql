-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2025 a las 16:40:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbobservatorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo_entidad_aliada`
--

CREATE TABLE `archivo_entidad_aliada` (
  `id_archivo_entidad_aliada` int(11) NOT NULL,
  `nombre_archivo` varchar(50) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `fecha_registro` varchar(15) NOT NULL,
  `ruta_archivo` mediumtext NOT NULL,
  `id_entidad_aliada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `archivo_entidad_aliada`
--

INSERT INTO `archivo_entidad_aliada` (`id_archivo_entidad_aliada`, `nombre_archivo`, `descripcion`, `fecha_registro`, `ruta_archivo`, `id_entidad_aliada`) VALUES
(5, 'Archivo prueba', 'descripcion prueba', '2025-05-04', 'assets/archivos-entidad-aliada/681792f05d342-JACK HA CV (1).pdf', 7),
(6, 'Archivo prueba', 'sdddd', '2025-05-04', 'assets/archivos-entidad-aliada/681795bf55261-ReporteGasto (19).xls', 7),
(7, 'Archivo pruebasdsds', 'sdsdsd', '2025-05-03', 'assets/archivos-entidad-aliada/681797afe0c54-ReporteGasto.xls', 7),
(8, 'SSDSSS', 'sdsds', '2025-05-04', 'assets/archivos-entidad-aliada/681797e66d133-ALIDA.docx', 7),
(10, 'skdsdksidsk', 'sdsd', '2025-05-04', 'assets/archivos-entidad-aliada/6817a075111a8-1.1.1.xlsx', 7),
(11, 'prueba final', 'descrip final', '2025-05-04', 'assets/archivos-entidad-aliada/6817a12d22e13-ReporteGasto (18).xls', 7),
(12, 'arjakjdsk', 'sdsds', '2025-05-03', 'assets/archivos-entidad-aliada/6817a1dee2eac-Resolucion 115 HUGO BERRIO CASAS.pdf', 8),
(13, 'sdsds', 'sdsd', '2025-05-04', 'assets/archivos-entidad-aliada/6817a20088b7b-JACk RH.pdf', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidad_aliada`
--

CREATE TABLE `entidad_aliada` (
  `id_entidad_aliada` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `portada` varchar(300) NOT NULL,
  `fecha_registro` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entidad_aliada`
--

INSERT INTO `entidad_aliada` (`id_entidad_aliada`, `nombre`, `descripcion`, `portada`, `fecha_registro`) VALUES
(5, 'pueba angular editar', 'descripcio angular editar', 'assets/img/portada-entidad-aliada/681562fec7941-11-qsyt1rmbf5l8buhnfc712kju23w9e9mhvvgd10ga7s.jpg', '2025-05-02'),
(6, 'prueba editar', 'editar', 'assets/img/portada-entidad-aliada/681563212bd27-3-2-768x491.jpg', '2025-05-01'),
(7, 'jack', 'jhh', 'assets/img/portada-entidad-aliada/68177da461cae-user.jpg', '2025-05-04'),
(8, 'dsdsds', 'sdsdsd', 'assets/img/portada-entidad-aliada/6817a1c22606e-constitucion-original.png', '2025-05-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `infografia`
--

CREATE TABLE `infografia` (
  `id_infografia` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `fecha` varchar(11) NOT NULL,
  `lugar` varchar(50) NOT NULL,
  `portada` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `infografia`
--

INSERT INTO `infografia` (`id_infografia`, `titulo`, `descripcion`, `fecha`, `lugar`, `portada`) VALUES
(4, 'TITULO Q', 'DESCRIPCIO prueba', '2025-04-27', 'Abancay', 'assets/img/img-infografias/680e74d16e463-LogoOBservatorio.png'),
(5, 'lion', 'tamburco', '2025-04-27', 'jack', 'assets/img/img-infografias/680e752c3501a-modalidad 1.png'),
(6, 'Titulo', 'descripcion', '2025-04-27', 'victor costa', 'assets/img/img-infografias/680e75584568d-4.png'),
(7, 'TITULO FINAL', 'FINAL', '2025-04-19', 'Prueba', 'assets/img/img-infografias/680e77061648a-descarga.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tnoticia`
--

CREATE TABLE `tnoticia` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `fecha` varchar(10) NOT NULL,
  `lugar` varchar(50) NOT NULL,
  `portada` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tnoticia`
--

INSERT INTO `tnoticia` (`id`, `titulo`, `descripcion`, `fecha`, `lugar`, `portada`) VALUES
(22, 'tirulo final', 'sksjdksj', '2025-04-27', 'Prueba final', 'assets/img/img-noticias/680e76e436840-2-4.jpg'),
(24, 'tituloo', '5ds5df4', '2025-04-17', 'lugr', 'assets/img/img-noticias/680fbc20ce342-3-2-768x491.jpg'),
(25, 'ssds', 'dsds', '2025-04-29', 'Abancay', 'assets/img/img-noticias/6810c9f4ea61f-descarga.jpg'),
(26, 'Titulo de prueba', 'Descrion de prueba', '2025-04-29', 'Abancay', 'assets/img/img-noticias/6810eece4cc19-Marcha-Mujeres-Contra-Violencia-de-genero-3.jpg'),
(27, 'skjhkjhsdks', 'dkdffdknfkdhf', '2025-05-06', 'Abancay', 'assets/img/img-noticias/681a07fcc1409-Usuario.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tusuario`
--

CREATE TABLE `tusuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(15) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `fecha_registro` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tusuario`
--

INSERT INTO `tusuario` (`id_usuario`, `nombre`, `apellido`, `nombre_usuario`, `contrasena`, `estado`, `fecha_registro`) VALUES
(1, 'admin', 'admin', 'admin', 'admin123', 'Activo', '2025-04-20'),
(5, 'User prueba', 'apellido 1', 'user prueba', 'hola', 'Incativo', '2025-04-24'),
(8, 'PRUEBA POST', 'APELLIDO POST', 'HAGH@GAMIL.COM', '123', 'Activo', '2025-04-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_token`
--

CREATE TABLE `usuario_token` (
  `id_token` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `token` varchar(100) NOT NULL,
  `estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_token`
--

INSERT INTO `usuario_token` (`id_token`, `id_usuario`, `token`, `estado`) VALUES
(2, 1, '3a65ce954ae8ecf35df0bb4e15b77b85', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `video`
--

CREATE TABLE `video` (
  `id_video` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `fecha` varchar(11) NOT NULL,
  `lugar` varchar(50) NOT NULL,
  `portada` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `video`
--

INSERT INTO `video` (`id_video`, `titulo`, `descripcion`, `fecha`, `lugar`, `portada`) VALUES
(4, 'Video 1', 'descicopssd', '2025-04-29', 'Video', 'assets/videos/680e895752559-kat.MP4'),
(5, 'tirulo final', '5555', '2025-04-27', 'Prueba final', 'assets/videos/680e899748f9a-Ka-b x Bazs Hitters - Mas Que Amigos (Official Music Video).mp4'),
(6, 'Prueba', 'Detalle del video', '2025-04-27', 'Abancay', 'assets/videos/680e8b5a3d6ec-Download (3).mp4');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo_entidad_aliada`
--
ALTER TABLE `archivo_entidad_aliada`
  ADD PRIMARY KEY (`id_archivo_entidad_aliada`),
  ADD KEY `id_entidad_aliada` (`id_entidad_aliada`);

--
-- Indices de la tabla `entidad_aliada`
--
ALTER TABLE `entidad_aliada`
  ADD PRIMARY KEY (`id_entidad_aliada`);

--
-- Indices de la tabla `infografia`
--
ALTER TABLE `infografia`
  ADD PRIMARY KEY (`id_infografia`);

--
-- Indices de la tabla `tnoticia`
--
ALTER TABLE `tnoticia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tusuario`
--
ALTER TABLE `tusuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `usuario_token`
--
ALTER TABLE `usuario_token`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id_video`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivo_entidad_aliada`
--
ALTER TABLE `archivo_entidad_aliada`
  MODIFY `id_archivo_entidad_aliada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `entidad_aliada`
--
ALTER TABLE `entidad_aliada`
  MODIFY `id_entidad_aliada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `infografia`
--
ALTER TABLE `infografia`
  MODIFY `id_infografia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tnoticia`
--
ALTER TABLE `tnoticia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tusuario`
--
ALTER TABLE `tusuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuario_token`
--
ALTER TABLE `usuario_token`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `video`
--
ALTER TABLE `video`
  MODIFY `id_video` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivo_entidad_aliada`
--
ALTER TABLE `archivo_entidad_aliada`
  ADD CONSTRAINT `archivo_entidad_aliada_ibfk_1` FOREIGN KEY (`id_entidad_aliada`) REFERENCES `entidad_aliada` (`id_entidad_aliada`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_token`
--
ALTER TABLE `usuario_token`
  ADD CONSTRAINT `usuario_token_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `tusuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
