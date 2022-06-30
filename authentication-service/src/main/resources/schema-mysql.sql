CREATE TABLE IF NOT EXISTS user (
  username VARCHAR(20) NOT NULL,
  password VARCHAR(60) CHARACTER SET ascii COLLATE ascii_bin  NOT NULL,
  userRole VARCHAR(20) NOT NULL,
  PRIMARY KEY (username)
);