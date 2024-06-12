package org.example.product;

import org.example.Database;

import java.util.List;
import java.util.Optional;

/**
 * Provides services for managing products such as creating, updating, retrieving, and deleting products.
 */
public class ProductService {
    private Database database;
    private static ProductService instance;

    /**
     * Private constructor to prevent instantiation from outside and to initialize the database connection.
     */
    private ProductService(){
        database = Database.getInstance();
    };

    /**
     * Singleton pattern to get the instance of ProductService.
     *
     * @return the single instance of ProductService
     */
    public static ProductService getInstance(){
        if(instance == null){
            instance = new ProductService();
        }

        return instance;
    }

    /**
     * Retrieves a list of all products.
     *
     * @return a list containing all the products
     */
    public List<Product> getProducts(){
        return database.getProducts();
    }

    /**
     * Retrieves a product by its ID.
     *
     * @param productId the ID of the product to retrieve
     * @return the product with the specified ID
     * @throws Exception if the product is not found
     */
    public Product getProductById(String productId) throws Exception {
        return  database.getProductById(productId);
    }

    /**
     * Creates a new product and adds it to the database.
     *
     * @param newProduct the product to add
     * @return the added product
     */
    public Product createProduct(Product newProduct){
        return database.addProduct(newProduct);
    }

    /**
     * Updates an existing product.
     *
     * @param product the new product details to update
     * @param productId the ID of the product to update
     * @return the updated product
     * @throws Exception if the product to update is not found
     */
    public Product updateProduct(Product product, String productId) throws Exception {
        Product oldProduct = getProductById(productId);

        oldProduct.setTitle(product.getTitle());
        oldProduct.setDescription(product.getDescription());
        oldProduct.setQuantity(product.getQuantity());
        oldProduct.setImage(product.getImage());
        oldProduct.setPrice(product.getPrice());

        return  oldProduct;
    }

    /**
     * Deletes a product by its ID.
     *
     * @param productId the ID of the product to delete
     * @throws Exception if the product to delete is not found
     */
    public void deleteById(String productId) throws Exception {
        database.deleteProductById(productId);
    }
}
