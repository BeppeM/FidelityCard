CREATE TABLE IF NOT EXISTS manager (
  piva VARCHAR(11) NOT NULL unique,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(30) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  socialReason VARCHAR(20) NOT NULL,
  businessName VARCHAR(20) NOT NULL,
  city VARCHAR(20) NOT NULL,
  address VARCHAR(20) NOT NULL,
  houseNumber int NOT NULL,
  PRIMARY KEY (piva)
);