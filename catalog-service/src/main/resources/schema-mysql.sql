CREATE TABLE IF NOT EXISTS catalogtype(
    catalogTypeName VARCHAR(20) NOT NULL,
    managerName VARCHAR(20) NOT NULL,
    description TEXT(200),
    PRIMARY KEY (catalogTypeName, managerName)
);

CREATE TABLE IF NOT EXISTS reward(
    id BIGINT NOT NULL AUTO_INCREMENT,
    rewardName VARCHAR(20) NOT NULL,
    description TEXT(200),
    redeemPoints INT NOT NULL,
    quantityOnRestock INT NOT NULL,
    catalogTypeName VARCHAR(20) NOT NULL,
    managerName VARCHAR(20) NOT NULL,
    currentQuantity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (catalogTypeName, managerName) REFERENCES catalogtype(catalogTypeName, managerName)
);