  `studioId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  KEY `fk_movie_studio_studio` (`studioId`),
  KEY `fk_movie_studio_movie` (`movieId`),
  CONSTRAINT `fk_movie_studio_movie` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_movie_studio_studio` FOREIGN KEY (`studioId`) REFERENCES `studio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table : movie_tag
CREATE TABLE `movie_tag` (
  `tagId` int NOT NULL,
  `movieId` int NOT NULL,
  PRIMARY KEY (`tagId`,`movieId`),
  KEY `fk_movie_tag_movie` (`movieId`),
  CONSTRAINT `fk_movie_tag_movie` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_movie_tag_tag` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `movie_tag_ibfk_1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE,
  CONSTRAINT `movie_tag_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table : movies
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `altTitle` text,
  `year` text,
  `duration` int DEFAULT NULL,
  `cover` varchar(255) NOT NULL DEFAULT '00_cover_default.jpg',
  `isTvShow` tinyint(1) DEFAULT '0',
  `tvSeasons` varchar(20) DEFAULT NULL,
  `nbTvEpisodes` int DEFAULT NULL,
  `episodeDuration` int DEFAULT NULL,
  `trailer` text,
  `pitch` text,
  `story` text,
  `location` text,
  `videoFormat` text,
  `comment` text,
  `videoSupport` text,
  `fileSize` text,
  `idTheMovieDb` text,
  `idIMDb` bigint DEFAULT NULL,
  `vostfr` tinyint(1) DEFAULT '0',
  `multi` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4359 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table : music
CREATE TABLE `music` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `image` varchar(255) DEFAULT '00_item_default.png',
  `pitch` text,
  `wikilink` text,
  `imdblink` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1609 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table : screenwriter
CREATE TABLE `screenwriter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `image` varchar(255) DEFAULT '00_item_default.png',
  `pitch` text,
  `wikilink` text,
  `imdblink` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4562 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table : studio
CREATE TABLE `studio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `image` varchar(255) DEFAULT '00_jmtb_item_default.jpg',
  `pitch` text,
  `wikilink` text,
  `imdblink` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5266 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table : tag
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10906 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table : user
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table : user_favorite
CREATE TABLE `user_favorite` (
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`movie_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `user_favorite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_favorite_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

