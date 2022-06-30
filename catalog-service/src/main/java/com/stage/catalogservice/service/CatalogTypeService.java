package com.stage.catalogservice.service;

import com.stage.catalogservice.model.CatalogType;
import com.stage.catalogservice.model.CatalogTypeID;
import com.stage.catalogservice.repository.CatalogTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogTypeService {
    private final CatalogTypeRepository catalogTypeRepository;

    @Autowired
    public CatalogTypeService(CatalogTypeRepository catalogTypeRepository) {
        this.catalogTypeRepository = catalogTypeRepository;
    }

    public ResponseEntity<List<CatalogType>> getAllCatalogsByManager(String manager) {
        List<CatalogType> catalogTypes = catalogTypeRepository.getCatalogTypesByManagerName(manager);
        return ResponseEntity.ok(catalogTypes);
    }

    public ResponseEntity<String> createCatalog(CatalogType catalogType) {
        CatalogTypeID catalogTypeID = new CatalogTypeID(catalogType.getCatalogTypeName(), catalogType.getManagerName());
        if(catalogTypeRepository.findById(catalogTypeID).isPresent())
            return ResponseEntity.badRequest().body("catalog already exist");
        catalogTypeRepository.save(catalogType);
        return ResponseEntity.ok("catalog " + catalogTypeID + " created");
    }

    public ResponseEntity<CatalogType> getCatalog(CatalogTypeID catalogTypeID) {
        CatalogType catalogType = catalogTypeRepository.getById(catalogTypeID);
        return ResponseEntity.ok(catalogType);
    }

    public ResponseEntity<String> deleteCatalog(CatalogTypeID catalogTypeID) {
        catalogTypeRepository.deleteById(catalogTypeID);
        return ResponseEntity.ok("catalog " + catalogTypeID + " deleted");
    }

    public ResponseEntity<String> updateDescription(CatalogType catalogType){
        catalogTypeRepository.save(catalogType);
        return ResponseEntity.ok("catalog description updated");
    }
}
