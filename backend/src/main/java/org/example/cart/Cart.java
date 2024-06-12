package org.example.cart;

import org.example.cart.dto.AddProductToCartDto;
import org.example.product.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Represents a shopping cart containing products, along with its total price.
 */
public class Cart {
    private String id;
    private List<CartProduct> products;
    private float totalPrice;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<CartProduct> getProducts() {
        return products;
    }

    public void setProducts(List<CartProduct> products) {
        this.products = products;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    /**
     * Constructs a new Cart with an empty list of products and a total price of zero.
     */
    public Cart(){
        products = new ArrayList<>();
        totalPrice = 0;
    }

    private CartProduct findCartProductByProductId(String productId) {
        for (CartProduct cartProduct : products) {
            if (cartProduct.getProduct().getId().equals(productId)) {
                return cartProduct;
            }
        }

        return null;
    }

    private void recalculateTotalPrice(){
        float newTotalPrice = 0;

        for(CartProduct cartProduct : products){
            newTotalPrice += cartProduct.getQuantity() * cartProduct.getProduct().getPrice();
        }

        this.totalPrice = newTotalPrice;
    }

    /**
     * Clears all products from the cart and resets the total price.
     */
    public void clear() {
        products = new ArrayList<>();
        totalPrice = 0;
    }

    /**
     * Adds a product to the cart or increases its quantity if already present.
     *
     * @param product The product to add.
     * @param data Contains the quantity of the product to add.
     * @throws Exception if the quantity exceeds available stock.
     */
    public void addProduct(Product product, AddProductToCartDto data) throws Exception {
        CartProduct existingProduct = findCartProductByProductId(data.getProductId());

        int qunatity = existingProduct != null ? existingProduct.getQuantity() + data.getQuantity() : data.getQuantity();

        if(qunatity > product.getQuantity()){
            throw new Exception("More than quantity limit");
        }

        if(existingProduct != null){
            existingProduct.setQuantity(existingProduct.getQuantity() + data.getQuantity());
        } else {
            products.add(new CartProduct(product, data.getQuantity()));
        }

        recalculateTotalPrice();
    }

    /**
     * Deletes a product from the cart.
     *
     * @param product The product to remove.
     */
    public void deleteProduct(Product product){
        CartProduct cartProductToRemove = findCartProductByProductId(product.getId());

        if (cartProductToRemove != null) {
            products.remove(cartProductToRemove);
            recalculateTotalPrice();
        }
    }

    /**
     * Updates the quantity of a product in the cart.
     *
     * @param product The product to update.
     * @param newQuantity The new quantity to set.
     * @throws Exception if the new quantity exceeds available stock.
     */
    public void updateProductQuantity(Product product, int newQuantity) throws Exception {
        CartProduct cartProduct = findCartProductByProductId(product.getId());

        if (cartProduct == null) {
            return;
        }

        if(newQuantity > cartProduct.getProduct().getQuantity()){
            throw new Exception("More than quantity limit");
        }

        cartProduct.setQuantity(newQuantity);
        recalculateTotalPrice();
    }
}
