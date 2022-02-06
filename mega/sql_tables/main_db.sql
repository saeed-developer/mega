USE main;
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL , phone INT , username VARCHAR(255)  UNIQUE
NOT NULL,first_name VARCHAR(255),last_name  VARCHAR(255));
CREATE INDEX idx_username ON users (username);
CREATE INDEX idx_phone ON users (phone);