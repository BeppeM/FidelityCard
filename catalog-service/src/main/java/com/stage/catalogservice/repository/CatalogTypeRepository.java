package com.stage.catalogservice.repository;

import com.stage.catalogservice.model.CatalogTypeID;
import com.stage.catalogservice.model.CatalogType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatalogTypeRepository extends JpaRepository<CatalogType, CatalogTypeID> {
    List<CatalogType> getCatalogTypesByManagerName(String manager);
}
