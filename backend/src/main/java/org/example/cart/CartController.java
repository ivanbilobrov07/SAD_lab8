package org.example.cart;

import org.example.cart.dto.AddProductToCartDto;
import org.example.cart.dto.UpdateQuantityDto;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
@RequestMapping("/carts")
public class CartController {
    private CartService cartService;

    public CartController() {
        cartService = CartService.getInstance();
    }

    @GetMapping("/{cartId}")
    public Cart getCartById(@PathVariable String cartId) throws Exception {
        return  cartService.getCartById(cartId);
    }

    @PostMapping("")
    public Cart createCart(){
        return cartService.createCart();
    }

    @PostMapping("/{cartId}/clear")
    public Cart clearCart(@PathVariable String cartId) throws Exception {
        return cartService.clearCart(cartId);
    }

    @PostMapping("/{cartId}/products")
    public Cart addProductToCart(@PathVariable String cartId, @RequestBody AddProductToCartDto data) throws Exception {
        return cartService.addProductToCart(cartId, data);
    }

    @DeleteMapping("/{cartId}/products/{productId}")
    public Cart deleteProductFromCart(@PathVariable String cartId, @PathVariable String productId) throws Exception {
        return cartService.deleteProductFromCart(cartId, productId);
    }

    @PatchMapping("/{cartId}/products/{productId}/update-quantity")
    public Cart updateProductQuantity(@PathVariable String productId, @RequestBody UpdateQuantityDto data, @PathVariable String cartId) throws Exception {
        return cartService.updateProductQuantity(cartId, productId, data.getQuantity());
    }
}
