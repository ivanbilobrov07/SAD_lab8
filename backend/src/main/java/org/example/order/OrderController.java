package org.example.order;

import org.example.order.dto.UpdateOrderStatusDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;

    public OrderController() {
        orderService = OrderService.getInstance();
    }

    @GetMapping("")
    public List<Order> getOrders() {
        return orderService.getOrders();
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable String orderId) throws Exception {
        return  orderService.getOrderById(orderId);
    }

    @PostMapping("")
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PatchMapping("/{orderId}/change-status")
    public Order updateOrderStatus(@PathVariable String orderId, @RequestBody UpdateOrderStatusDto data) throws Exception {
        return orderService.updateOrderStatus(orderId, data.getStatus());
    }
}
