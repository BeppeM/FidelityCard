package com.stage.catalogservice.model;

import javax.persistence.*;

@Entity(name = "catalogtype")
@Table
@IdClass(CatalogTypeID.class)
public class CatalogType {
    @Id
    @Column(name = "catalogtypename")
    private String catalogTypeName;
    @Id
    @Column(name = "managername")
    private String managerName;
    @Column(name = "description")
    private String description;

    public CatalogType() {
    }

    public String getCatalogTypeName() {
        return catalogTypeName;
    }

    public void setCatalogTypeName(String catalogTypeName) {
        this.catalogTypeName = catalogTypeName;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
