package org.example.order;

import org.example.Database;
import org.example.cart.Cart;

import java.util.List;
import java.util.Optional;

/**
 * Provides services for managing orders, including creating, retrieving, and updating orders.
 */
public class OrderService {
    private Database database;
    private static OrderService instance;

    /**
     * Private constructor to prevent direct instantiation and to initialize database access.
     */
    private OrderService(){
        database = Database.getInstance();
    };

    /**
     * Singleton pattern implementation for getting the instance of OrderService.
     *
     * @return the singleton instance of OrderService.
     */
    public static OrderService getInstance(){
        if(instance == null){
            instance = new OrderService();
        }

        return instance;
    }

    /**
     * Retrieves a list of all orders.
     *
     * @return a list of all current orders.
     */
    public List<Order> getOrders(){
        return database.getOrders();
    }

    /**
     * Retrieves an order by its ID.
     *
     * @param orderId The ID of the order to retrieve.
     * @return The retrieved order.
     * @throws Exception if no order is found with the provided ID.
     */
    public Order getOrderById(String orderId) throws Exception {
        List<Order> orders = database.getOrders();

        Optional<Order> order = orders.stream()
                .filter(ord -> ord.getId().equals(orderId))
                .findFirst();

        return order.orElseThrow(() -> new Exception("Order not found with ID: " + orderId));
    }

    /**
     * Creates a new order and adds it to the database.
     *
     * @param order The new order to create.
     * @return The newly created order.
     */
    public Order createOrder(Order order){
        return database.addOrder(order);
    }

    /**
     * Updates the status of an existing order.
     *
     * @param orderId The ID of the order whose status is to be updated.
     * @param status The new status to set for the order.
     * @return The updated order.
     * @throws Exception if the order is not found.
     */
    public Order updateOrderStatus(String orderId, String status) throws Exception {
        Order order = this.getOrderById(orderId);

        order.setStatus(status);

        return order;
    }
}
