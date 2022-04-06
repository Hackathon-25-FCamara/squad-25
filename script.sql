USE  `technical_share`;

CREATE TABLE Users(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  bio VARCHAR(255) NOT NULL,
  links VARCHAR(255) NOT NULL,
  skills ENUM("") NOT NULL,
  role VARCHAR(255) NOT NULL,
  mentor INT,
  mentoring VARCHAR(255),
  posts JSON
);