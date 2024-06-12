package org.example.cart;

import org.example.Database;
import org.example.cart.dto.AddProductToCartDto;
import org.example.product.Product;
import org.example.product.ProductService;

import java.util.List;
import java.util.Optional;

/**
 * Provides services for managing carts, including retrieving, creating, clearing, adding products to, and removing products from carts.
 */
public class CartService {
    private Database database;
    private static CartService instance;

    /**
     * Private constructor to prevent direct instantiation and to initialize database access.
     */
    private CartService(){
        database = Database.getInstance();
    };

    /**
     * Singleton pattern implementation for getting the instance of CartService.
     *
     * @return the singleton instance of CartService.
     */
    public static CartService getInstance(){
        if(instance == null){
            instance = new CartService();
        }

        return instance;
    }

    /**
     * Retrieves a cart by its ID.
     *
     * @param cartId The ID of the cart to retrieve.
     * @return The retrieved cart.
     * @throws Exception if no cart is found with the provided ID.
     */
    public Cart getCartById(String cartId) throws Exception {
        List<Cart> carts = database.getCarts();

        Optional<Cart> cart = carts.stream()
                .filter(c -> c.getId().equals(cartId))
                .findFirst();

        return cart.orElseThrow(() -> new Exception("Cart not found with ID: " + cartId));
    }

    /**
     * Creates a new cart and adds it to the database.
     *
     * @return The newly created cart.
     */
    public Cart createCart(){
        return database.addCart();
    }

    /**
     * Clears all products from a cart.
     *
     * @param cartId The ID of the cart to clear.
     * @return The cleared cart.
     * @throws Exception if the cart is not found.
     */
    public Cart clearCart(String cartId) throws Exception {
        Cart cart = this.getCartById(cartId);
        cart.clear();

        return cart;
    }

    /**
     * Adds a product to a cart.
     *
     * @param cartId The ID of the cart where the product will be added.
     * @param data Contains the product ID and quantity to add to the cart.
     * @return The updated cart.
     * @throws Exception if the product cannot be added (e.g., quantity limits exceeded).
     */
    public Cart addProductToCart(String cartId, AddProductToCartDto data) throws Exception {
        Cart cart = this.getCartById(cartId);
        Product product = database.getProductById(data.getProductId());

        cart.addProduct(product, data);

        return cart;
    }

    /**
     * Removes a product from a cart.
     *
     * @param cartId The ID of the cart from which the product will be removed.
     * @param productId The ID of the product to remove.
     * @return The updated cart.
     * @throws Exception if the product is not found in the cart.
     */
    public Cart deleteProductFromCart(String cartId, String productId) throws Exception {
        Cart cart = this.getCartById(cartId);
        Product product = database.getProductById(productId);

        cart.deleteProduct(product);

        return cart;
    }

    /**
     * Updates the quantity of a product in a cart.
     *
     * @param cartId The ID of the cart containing the product.
     * @param productId The ID of the product whose quantity is to be updated.
     * @param newQuantity The new quantity to set for the product.
     * @return The updated cart.
     * @throws Exception if the new quantity exceeds the product's available stock.
     */
    public Cart updateProductQuantity(String cartId, String productId, int newQuantity) throws Exception {
        Cart cart = this.getCartById(cartId);
        Product product = database.getProductById(productId);

        cart.updateProductQuantity(product, newQuantity);

        return cart;
    }
}
