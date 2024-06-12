package org.example.cart;

import org.example.product.Product;

/**
 * Represents a product within a cart, including its quantity.
 */
public class CartProduct {
    private Product product;
    private int quantity;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    /**
     * Constructs a new CartProduct with the specified product and quantity.
     *
     * @param product The product associated with this cart item.
     * @param quantity The quantity of the product.
     */
    public CartProduct(Product product, int quantity){
        this.product = product;
        this.quantity = quantity;
    }
}
