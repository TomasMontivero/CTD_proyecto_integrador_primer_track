package com.dh.Booking.services;

import com.dh.Booking.models.Category;
import com.dh.Booking.dtos.CategoryDTO;
import com.dh.Booking.repositories.CategoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;


@Service
public class CategoryService {

    // ---------------------------------------
    // ATRIBUTOS
    // ---------------------------------------

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ObjectMapper mapper;

    Logger logger = Logger.getLogger(CategoryService.class);

    // ---------------------------------------
    // METODOS
    // ---------------------------------------

    CategoryService() {
        File log4jProperties = new File("src/log4j.properties");
        PropertyConfigurator.configure(log4jProperties.getAbsolutePath());
        logger = Logger.getLogger(CategoryService.class);
    }

    public Category createCategory(Category category) {
        Category createdCategory;
        createdCategory = categoryRepository.save(category);
        logger.info("---- Categoria creada: ID: " + createdCategory.getId() + " - Titulo: " + createdCategory.getTitle() + " - Descripcion: " + createdCategory.getDescription());
        return createdCategory;
    }

    public Category updateCategory(Category category) {
        Category updatedCategory;
        updatedCategory = categoryRepository.saveAndFlush(category);
        logger.info("---- Categoria actualizada: ID: " + updatedCategory.getId() + " - Titulo: " + updatedCategory.getTitle() + " - Descripcion: " + updatedCategory.getDescription());
        return updatedCategory;
    }

    public void deleteCategory(Long id) {
        if(findCategoryById(id) != null) {
            categoryRepository.deleteById(id);
            logger.info("---- Categoria eliminada: ID: " + id);
        } else {
            logger.error("---- Fallo la eliminacion de la categoria ID: " + id);
            //TODO: Ver si implementar las excepciones. Ej: throw new BadRequestException(HttpStatus.NOT_FOUND ,"Categoria no encontrada");
        }
    }

    public CategoryDTO findCategoryById(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        CategoryDTO categoryDTO = null;
        if (optionalCategory.isPresent()) {
            categoryDTO = mapper.convertValue(optionalCategory, CategoryDTO.class);
            logger.info("---- Categoria encontrada: ID: " + categoryDTO.getId() + " - Titulo: " + categoryDTO.getTitle() + " - Descripcion: " + categoryDTO.getDescription());
        } else {
            logger.error("---- Falló la busqueda de la categoria ID: " + id);
            //TODO: Ver si implementar las excepciones. Ej: throw new BadRequestException(HttpStatus.NOT_FOUND ,"Categoria no encontrada");
        }
        return categoryDTO;
    }

    public Collection<CategoryDTO> listCategories() {
        List<Category> categoriesList = categoryRepository.findAll();
        Set<CategoryDTO> categoriesDTO = new HashSet<>();
        for (Category category: categoriesList) {
            categoriesDTO.add(mapper.convertValue(category, CategoryDTO.class));
        }
        logger.info("---- Lista de categorias generada");
        return categoriesDTO;

    }

}