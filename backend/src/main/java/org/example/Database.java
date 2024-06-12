package org.example;

import org.example.cart.Cart;
import org.example.order.Order;
import org.example.product.Product;

import java.util.*;

/**
 * The Database class simulates a simple database instance for managing products, carts, and orders.
 * It includes operations to add, retrieve, and delete products, as well as manage carts and orders.
 */
public class Database {
    private static Database instance;
    private List<Product> products;
    private List<Cart> carts;
    private List<Order> orders;

    public List<Product> getProducts() {
        return products;
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public List<Order> getOrders() {
        return orders;
    }

    /**
     * Private constructor to initialize the Database with default products.
     */
    private Database(){
        products = new ArrayList<>();
        carts = new ArrayList<>();
        orders = new ArrayList<>();

        this.addProduct(new Product("Milka",
                50,
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque sapiente iure nihil quos delectus, eos libero ipsam quidem vero, dolore, sunt repudiandae soluta. Saepe veritatis neque eum et officiis quod.",
                10,
                "https://varus.ua/img/product/1140/1140/2500102"));

        this.addProduct(new Product("Raffaello",
                70,
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque sapiente iure nihil quos delectus, eos libero ipsam quidem vero, dolore, sunt repudiandae soluta. Saepe veritatis neque eum et officiis quod.",
                3,
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfRg8P1H3vmjzZYXQVm3AAepAX_UUIPRgoLA&s"));
    };

    /**
     * Provides the singleton instance of the Database.
     *
     * @return the single instance of the Database
     */
    public static Database getInstance(){
        if(instance == null){
            instance = new Database();
        }

        return instance;
    }

    /**
     * Retrieves a product by its ID.
     *
     * @param productId the ID of the product to retrieve
     * @return the product with the specified ID
     * @throws Exception if no product is found with the specified ID
     */
    public Product getProductById(String productId) throws Exception {
        Optional<Product> product = products.stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst();

        return product.orElseThrow(() -> new Exception("Product not found with ID: " + productId));
    }

    /**
     * Adds a new product to the Database and assigns it a unique ID.
     *
     * @param newProduct the product to add
     * @return the added product with a new ID
     */
    public Product addProduct(Product newProduct){
        newProduct.setId(UUID.randomUUID().toString());

        products.add(newProduct);

        return newProduct;
    }

    /**
     * Deletes a product by its ID.
     *
     * @param productId the ID of the product to delete
     * @throws Exception if no product is found with the specified ID
     */
    public void deleteProductById(String productId) throws Exception {
        boolean flag = false;

        for(Product product: products){
            if(Objects.equals(product.getId(), productId)){
                products.remove(product);
                flag = true;
            }
        }

        if(!flag){
            throw new Exception("Product not found with ID: " + productId);
        }
    }

    /**
     * Adds a new cart and assigns it a unique ID.
     *
     * @return the newly created cart
     */
    public Cart addCart(){
        Cart newCart = new Cart();
        newCart.setId(UUID.randomUUID().toString());

        carts.add(newCart);

        return newCart;
    }

    /**
     * Adds a new order and assigns it a unique ID. Reduces the quantity of products based on the order details.
     *
     * @param newOrder the order to add
     * @return the added order with updated product quantities
     */
    public Order addOrder(Order newOrder){
        newOrder.setId(UUID.randomUUID().toString());

        orders.add(newOrder);

        products.forEach(product -> {
            newOrder.getCart().getProducts().forEach(cartProduct -> {
                if(Objects.equals(cartProduct.getProduct().getId(), product.getId())){
                    product.setQuantity(product.getQuantity() - cartProduct.getQuantity());
                }
            });
        });

        return newOrder;
    }
}
