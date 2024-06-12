package org.example.product;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin()
public class ProductsController {
    private ProductService productService;

    public ProductsController() {
        productService = ProductService.getInstance();
    }

    @GetMapping("")
    public List<Product> getAllProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable String productId) throws Exception {
        return productService.getProductById(productId);
    }

    @PostMapping("")
    public Product createProduct(@RequestBody Product newProduct) {
        return productService.createProduct(newProduct);
    }

    @PutMapping("/{productId}")
    Product updateProduct(@RequestBody Product product, @PathVariable String productId) throws Exception {
        return productService.updateProduct(product, productId);
    }

    @DeleteMapping("/{productId}")
    void deleteProduct(@PathVariable String productId) throws Exception {
        productService.deleteById(productId);
    }
}