CREATE TABLE IF NOT EXISTS redeemlog (
  rewardID BIGINT NOT NULL,
  cardID BIGINT NOT NULL,
  redeemDate DATE NOT NULL,
  requestedPoints INT NOT NULL,
  PRIMARY KEY (rewardID, cardID)
);