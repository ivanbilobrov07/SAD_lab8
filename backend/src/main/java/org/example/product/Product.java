package org.example.product;

/**
 * Represents a product with properties like ID, title, price, description, quantity, and image.
 */
public class Product {
    private String id;
    private String title;
    private float price;
    private String description;
    private int quantity;
    private String image;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    /**
     * Constructs a new Product with specified details.
     *
     * @param title the title of the product
     * @param price the price of the product
     * @param description a description of the product
     * @param quantity the stock quantity of the product
     * @param image the URL of the product image
     */
    public Product(String title, float price, String description, int quantity, String image) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.image = image;
    }
}
