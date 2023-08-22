package com.dh.Booking.controllers;

import com.dh.Booking.models.Category;
import com.dh.Booking.dtos.CategoryDTO;
import com.dh.Booking.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping()
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findCategoryById(@PathVariable Long id) {
        CategoryDTO categoryDTO = categoryService.findCategoryById(id);
        return ResponseEntity.ok(categoryDTO);
    }

    @GetMapping
    public ResponseEntity<Collection<CategoryDTO>> listCategories() {
        ResponseEntity<Collection<CategoryDTO>> response;
        response = ResponseEntity.ok(categoryService.listCategories());
        return response;
    }

    @PutMapping()
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        ResponseEntity<Category> response = null;
        if (category.getId() != null && categoryService.findCategoryById(category.getId()) != null) {
            response = ResponseEntity.ok(categoryService.updateCategory(category));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        ResponseEntity<String> response = null;
        if (categoryService.findCategoryById(id) != null) {
            categoryService.deleteCategory(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Categoría eliminada");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    // TODO mover las validaciones (Ej: datos vacios, o si un campo de texto tiene numeros) al CategoryDTO para que el Controller no tenga que manejar logica.
    // TODO implementar mapstruct para el manejo de models y DTOs: https://mapstruct.org/#get-started

}










