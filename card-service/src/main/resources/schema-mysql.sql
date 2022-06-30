CREATE TABLE IF NOT EXISTS card (
  id BIGINT NOT NULL AUTO_INCREMENT,
  subscriptionDate DATE NOT NULL,
  expirationDate DATE NOT NULL,
  currentPoints INT NOT NULL,
  customerUsername VARCHAR(20) NOT NULL,
  manager VARCHAR(20) NOT NULL,
  catalogName VARCHAR(20) NOT NULL,
  earnedPoints INT NOT NULL,
  PRIMARY KEY (id)
)ENGINE=InnoDB;