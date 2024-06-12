package org.example.order;

import org.example.cart.Cart;

/**
 * Represents an order, including its associated cart, status, email, and address.
 */
public class Order {
    private String id;
    private String status;
    private Cart cart;
    private String email;
    private String address;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Constructs a new Order with the specified cart, email, and address.
     * Initializes the order with a status of "CREATED".
     *
     * @param cart The cart associated with this order.
     * @param email The email address of the customer placing the order.
     * @param address The delivery address for the order.
     */
    public Order(Cart cart, String email, String address){
        this.cart = cart;
        this.email = email;
        this.address = address;
        this.status = "CREATED";
    }
}


