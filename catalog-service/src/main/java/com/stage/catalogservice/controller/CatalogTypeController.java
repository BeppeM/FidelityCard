package com.stage.catalogservice.controller;

import com.stage.catalogservice.model.CatalogType;
import com.stage.catalogservice.model.CatalogTypeID;
import com.stage.catalogservice.service.CatalogTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog/type")
public class CatalogTypeController {
    private final CatalogTypeService catalogTypeService;

    @Autowired
    public CatalogTypeController(CatalogTypeService catalogTypeService) {
        this.catalogTypeService = catalogTypeService;
    }
    @GetMapping("/hello")
    public String ciao(@RequestBody CatalogType catalogType){
        return "Hello Wordld!";
    }

    //Create new catalog
    @PostMapping("/create")
    public ResponseEntity<String> createCatalog(@RequestBody CatalogType catalogType){
        return catalogTypeService.createCatalog(catalogType);
    }
    //Get catalog created by a manager
    @GetMapping("/get/{manager}/{type}")
    public ResponseEntity<CatalogType> getCatalog(@PathVariable String manager, @PathVariable String type){
        CatalogTypeID catalogTypeID = new CatalogTypeID(type, manager);
        return catalogTypeService.getCatalog(catalogTypeID);
    }
    //Delete a specific catalog
    @DeleteMapping("/delete/{manager}/{type}")
    public ResponseEntity<String> deleteCatalog(@PathVariable String manager, @PathVariable String type){
        CatalogTypeID catalogTypeID = new CatalogTypeID(type, manager);
        return catalogTypeService.deleteCatalog(catalogTypeID);
    }
    //Update a description of a catalog
    @PutMapping("/update")
    public ResponseEntity<String> updateDescription(@RequestBody CatalogType catalogType){
        return catalogTypeService.updateDescription(catalogType);
    }
    //Get all catalogs created by the manager
    @GetMapping("/get/all/{manager}")
    public ResponseEntity<List<CatalogType>> getCatalogByManager(@PathVariable String manager){
        return catalogTypeService.getAllCatalogsByManager(manager);
    }
}
