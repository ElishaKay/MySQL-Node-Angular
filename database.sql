


CREATE TABLE `client` (
  `client_id` int(11) UNSIGNED NOT NULL auto_increment,
  `client_name` varchar(50) DEFAULT NULL,
  `client_email` varchar(100) DEFAULT NULL,
  `client_password` varchar(100) DEFAULT NULL,
  `client_theme` varchar(15) DEFAULT NULL,
  `client_analytics_code` varchar(50) DEFAULT NULL,
  `client_creation_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (client_id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE INDEX client_id ON client(client_id);



create table post (
    post_id int(11) UNSIGNED NOT NULL Auto_increment primary key,
    text varchar(1000),
    client_id int(11) UNSIGNED NOT NULL,
    likes int,
    foreign key(client_id) references client(client_id)
);


CREATE INDEX post_id ON post(post_id);


create table comment (
    comment_id int Auto_increment primary key,
    text varchar(1000),
    client_id int(11) UNSIGNED NOT NULL,
    post_id int(11) UNSIGNED NOT NULL,
    foreign key(client_id) references client(client_id),
    foreign key(post_id) references post(post_id)
);

CREATE TABLE `message` (
  `message_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `message_content` longtext,
  `client_id` int(11) unsigned DEFAULT NULL,
  `message_sent_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `client_id message_id` (`client_id`),
  CONSTRAINT `client_id message` FOREIGN KEY (`client_id`) 
  REFERENCES `client` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO client ( client_email, client_password ) values ('kramer16@gmail.com','pizza');

CREATE TABLE `blogpost` (
  `blogpost_id` int(11) UNSIGNED NOT NULL auto_increment,
  `title` varchar(50),
  `blogpost_content` longtext,
  `client_id` int(11) unsigned DEFAULT NULL,
  `cover_image` varchar(90),
  `post_published_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`blogpost_id`),
  KEY `client_id blogpost_id` (`client_id`),
  CONSTRAINT `client_id blogpost` FOREIGN KEY (`client_id`) 
  REFERENCES `client` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO blogpost (post_published_date, title, blogpost_content, client_id) VALUES (NOW(),'this is your first blogpost title','<p>THis is some text</p>',1);

CREATE TABLE `image_library` (
  `image_id` int(11) UNSIGNED NOT NULL auto_increment,
  `title` varchar(50),
  `image_url` varchar(80),
  `client_id` int(11) unsigned DEFAULT NULL,
  `image_uploaded_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `client_id image_id` (`client_id`),
  CONSTRAINT `client_id image_library` FOREIGN KEY (`client_id`) 
  REFERENCES `client` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);


