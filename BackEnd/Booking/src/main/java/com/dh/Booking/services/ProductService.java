package com.dh.Booking.services;

import com.dh.Booking.dtos.CategoryDTO;
import com.dh.Booking.dtos.CityDTO;
import com.dh.Booking.dtos.ProductDTO;
import com.dh.Booking.mappers.ProductMapper;
import com.dh.Booking.models.*;
import com.dh.Booking.repositories.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    // ---------------------------------------
    // ATRIBUTOS
    // ---------------------------------------

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    CategoryService categoryService;

    @Autowired
    CityService cityService;

    Logger logger = Logger.getLogger(ProductService.class);

    // ---------------------------------------
    // METODOS
    // ---------------------------------------

    ProductService() {
        File log4jProperties = new File("src/log4j.properties");
        PropertyConfigurator.configure(log4jProperties.getAbsolutePath());
        logger = Logger.getLogger(ProductService.class);
    }

    public Product createProduct(ProductDTO productDTO) {
        Product createdProduct;
        Product product;
        product = mapper.convertValue(productDTO, Product.class);
        createdProduct = productRepository.save(product);
        logger.info("---- Producto creado: ID: " + createdProduct.getId() + " - Titulo: " + createdProduct.getTitle());
        return createdProduct;
    }

    public Product updateProduct(ProductDTO productDTO) {
        Product updatedProduct;
        Product product;
        product = mapper.convertValue(productDTO, Product.class);
        updatedProduct = productRepository.saveAndFlush(product);
        logger.info("---- Producto actualizado: ID: " + updatedProduct.getId() + " - Titulo: " + updatedProduct.getTitle());
        return updatedProduct;
    }

    public void deleteProduct(Long id) {
        if (findProductById(id) != null) {
            productRepository.deleteById(id);
            logger.info("---- Producto eliminado: ID: " + id);
        } else {
            logger.error("---- Fallo la eliminacion del producto ID: " + id);
        }
    }

    public ProductDTO findProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        ProductDTO productDTO = null;
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            productDTO = ProductMapper.INSTANCE.productToProductDTO(product);
            logger.info("---- Producto encontrado: ID: " + productDTO.getId() + " - Titulo: " + productDTO.getTitle());
        } else  {
            logger.error("---- Falló la busqueda del producto ID: " + id);
        }
        return productDTO;
    }

    public Collection<ProductDTO> findProductsByCategoryId(Long id) {
        Collection<ProductDTO> productList = listProducts();
        CategoryDTO categoryDTO = categoryService.findCategoryById(id);
        Collection<ProductDTO> filteredProductList = productList.stream()
                .filter(product -> mapper.convertValue(product.getCategory(), CategoryDTO.class).getId() == categoryDTO.getId())
                .collect(Collectors.toList());
        logger.info("---- Lista de productos generada, filtrada por Category ID: " + id);
        return filteredProductList;
    }

    public Collection<ProductDTO> findProductsByCityId(Long id) {
        Collection<ProductDTO> productList = listProducts();
        CityDTO cityDTO = cityService.findCityById(id);
        Collection<ProductDTO> filteredProductList = productList.stream()
                .filter(product -> mapper.convertValue(product.getCity(), CityDTO.class).getId() == cityDTO.getId())
                .collect(Collectors.toList());
        logger.info("---- Lista de productos generada, filtrada por City ID: " + id);
        return filteredProductList;
    }

    public Collection<ProductDTO> listProducts() {
        List<Product> productList = productRepository.findAll();
        Set<ProductDTO> productsDTO = new HashSet<>();
        for (Product product: productList) {
            ProductDTO productDTO = null;
            productDTO = ProductMapper.INSTANCE.productToProductDTO(product);
            productsDTO.add(productDTO);
        }
        logger.info("---- Lista de productos generada");
        return productsDTO;
    }


}
