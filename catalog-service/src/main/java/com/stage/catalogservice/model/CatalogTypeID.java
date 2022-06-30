package com.stage.catalogservice.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;
import java.util.Objects;


public class CatalogTypeID implements Serializable {

    private String catalogTypeName;
    private String managerName;

    public CatalogTypeID() {
    }

    public CatalogTypeID(String catalogTypeName, String managerName) {
        this.catalogTypeName = catalogTypeName;
        this.managerName = managerName;
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

    @Override
    public int hashCode() {
        return Objects.hash(catalogTypeName, managerName);
    }

    @Override
    public boolean equals(Object o) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }
        CatalogTypeID catalogTypeID = (CatalogTypeID) o;
        return Objects.equals( catalogTypeName, catalogTypeID.catalogTypeName ) &&
                Objects.equals( managerName, catalogTypeID.managerName );
    }

    @Override
    public String toString() {
        return "catalogTypeName='" + catalogTypeName +  ", managerName='" + managerName;
    }
}
