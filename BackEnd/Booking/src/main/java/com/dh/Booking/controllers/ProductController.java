package com.dh.Booking.controllers;

import com.dh.Booking.models.Product;
import com.dh.Booking.dtos.ProductDTO;
import com.dh.Booking.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping()
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.createProduct(productDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> findProductById(@PathVariable Long id) {
        ProductDTO productDTO = productService.findProductById(id);
        return ResponseEntity.ok(productDTO);
    }

    @GetMapping
    public ResponseEntity<Collection<ProductDTO>> listProducts() {
        ResponseEntity<Collection<ProductDTO>> response;
        response = ResponseEntity.ok(productService.listProducts());
        return response;
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Collection<ProductDTO>> listProductsByCategoryId(@PathVariable Long id) {
        ResponseEntity<Collection<ProductDTO>> response;
        response = ResponseEntity.ok(productService.findProductsByCategoryId(id));
        return response;
    }

    @GetMapping("/cities/{id}")
    public ResponseEntity<Collection<ProductDTO>> listProductsByCityId(@PathVariable Long id) {
        ResponseEntity<Collection<ProductDTO>> response;
        response = ResponseEntity.ok(productService.findProductsByCityId(id));
        return response;
    }

    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody ProductDTO productDTO) {
        ResponseEntity<Product> response = null;
        if (productDTO.getId() != null && productService.findProductById(productDTO.getId()) != null) {
            response = ResponseEntity.ok(productService.updateProduct(productDTO));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        ResponseEntity<String> response = null;
        if (productService.findProductById(id) != null) {
            productService.deleteProduct(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Producto eliminado");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

}
