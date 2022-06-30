CREATE TABLE IF NOT EXISTS customer (
  firstName VARCHAR(11) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
  cf VARCHAR(30) NOT NULL,
  username VARCHAR(20) NOT NULL,
  city VARCHAR(20) NOT NULL,
  address VARCHAR(20) NOT NULL,
  houseNumber VARCHAR(20) NOT NULL,
  email VARCHAR(30) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  PRIMARY KEY (username)
);