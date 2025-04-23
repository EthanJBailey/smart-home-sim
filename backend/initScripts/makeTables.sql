DROP DATABASE IF EXISTS `SmartThingies`;
CREATE DATABASE `SmartThingies`;
USE `SmartThingies`;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-06:00";

/*
--CREATE TABLE `Album` (
--    `album_id` int PRIMARY KEY NOT NULL,
--    `title` varchar(255) DEFAULT NULL,
--    `artist_id` int DEFAULT NULL,
--    `genre_id` int DEFAULT NULL,
--    `release_date` year DEFAULT NULL
--) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `Artist` (
    `artist_id` int PRIMARY KEY NOT NULL,
    `name` varchar(255) DEFAULT NULL,
    `genre_id` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE IF NOT EXISTS `Genre` (
    `genre_id` INT PRIMARY KEY NOT NULL,
    `name` VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `Playlist` (
    `playlist_id` int PRIMARY KEY NOT NULL,
    `user_id` int DEFAULT NULL,
    `title` varchar(255) DEFAULT NULL,
    `creation_date` year DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `Track` (
    `track_id` int PRIMARY KEY NOT NULL,
    `title` varchar(255) DEFAULT NULL,
    `artist_id` int DEFAULT NULL,
    `album_id` int DEFAULT NULL,
    `genre_id` int DEFAULT NULL,
    `duration` time DEFAULT NULL,
    `release_date` year DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE `User` (
    `user_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `user_name` varchar(255) DEFAULT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- ADD AUTO_INCREMENT
--
ALTER TABLE `Album`
MODIFY `album_id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `Artist`
MODIFY `artist_id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `Genre`
MODIFY `genre_id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `Playlist`
MODIFY `playlist_id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `Track`
MODIFY `track_id` int NOT NULL AUTO_INCREMENT;
--
-- ADD FOREIGN KEYS
--
ALTER TABLE `Album` 
ADD CONSTRAINT `Album_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `Artist` (`artist_id`);
ALTER TABLE `Artist`
ADD CONSTRAINT `Artist_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `Genre` (`genre_id`);
ALTER TABLE `Playlist`
ADD CONSTRAINT `Playlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);
ALTER TABLE `Track`
ADD CONSTRAINT `Track_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `Artist` (`artist_id`),
    ADD CONSTRAINT `Track_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `Album` (`album_id`),
    ADD CONSTRAINT `Track_ibfk_3` FOREIGN KEY (`genre_id`) REFERENCES `Genre` (`genre_id`);
COMMIT;
*/


