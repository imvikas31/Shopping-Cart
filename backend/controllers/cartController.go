package controllers

import (
	"net/http"

	"backend/config"
	"backend/models"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

// ---------------------------------------------------------
// ADD TO CART  → POST /carts  (Requires Token)
// ---------------------------------------------------------
func AddToCart(c *gin.Context) {
    var body struct {
        ItemID uint `json:"item_id"`
    }

    if err := c.ShouldBindJSON(&body); err != nil || body.ItemID == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "item_id is required"})
        return
    }

    userID := utils.GetUserID(c)

    // Check item exists
    var item models.Item
    if err := config.DB.First(&item, body.ItemID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
        return
    }

    // Check user cart exists
    var cart models.Cart
    if err := config.DB.Where("user_id = ?", userID).First(&cart).Error; err != nil {
        cart = models.Cart{UserID: userID}
        config.DB.Create(&cart)
    }

    // ADD NEW CARTITEM with Qty = 1
    cartItem := models.CartItem{
        CartID: cart.ID,
        ItemID: body.ItemID,
        Qty:    1,
    }
    config.DB.Create(&cartItem)

    c.JSON(http.StatusCreated, gin.H{
        "message": "Item added",
        "cart_id": cart.ID,
        "item_id": body.ItemID,
        "qty":     1,
    })
}

// ---------------------------------------------------------
// LIST CARTS  → GET /carts
// Returns cart items INCLUDING Item details
// ---------------------------------------------------------
func ListCarts(c *gin.Context) {
    var carts []models.Cart

    err := config.DB.
        Preload("CartItems").
        Preload("CartItems.Item").
        Find(&carts).Error

    if err != nil {
        c.JSON(500, gin.H{"error": "Failed to fetch cart"})
        return
    }

    c.JSON(200, gin.H{
        "carts": carts,
    })
}


// ---------------------------------------------------------
// REMOVE ITEM  → DELETE /carts/:id  (Requires Token)
// ---------------------------------------------------------
// UPDATE CART QTY
func UpdateCartQty(c *gin.Context) {
    id := c.Param("id")

    var body struct {
        Qty int `json:"qty"`
    }

    if err := c.ShouldBindJSON(&body); err != nil || body.Qty <= 0 {
        c.JSON(400, gin.H{"error": "qty must be at least 1"})
        return
    }

    var item models.CartItem
    if err := config.DB.First(&item, id).Error; err != nil {
        c.JSON(404, gin.H{"error": "Cart item not found"})
        return
    }

    item.Qty = body.Qty
    config.DB.Save(&item)

    c.JSON(200, gin.H{"message": "Quantity updated", "item": item})
}


// DELETE CART ITEM
func DeleteCartItem(c *gin.Context) {
	id := c.Param("id")

	if err := config.DB.Delete(&models.CartItem{}, id).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete item"})
		return
	}

	c.JSON(200, gin.H{"message": "Item removed"})
}

