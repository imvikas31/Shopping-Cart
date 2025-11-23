package controllers

import (
	"net/http"

	"backend/config"
	"backend/models"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

// ----------------------------------------------
// CREATE ORDER → POST /orders
// Requires Token
// ----------------------------------------------
func CreateOrder(c *gin.Context) {

	// Get logged-in user
	userID := utils.GetUserID(c)

	// Find user's cart
	var cart models.Cart
	err := config.DB.Preload("CartItems").Where("user_id = ?", userID).First(&cart).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No cart found for this user",
		})
		return
	}

	// If cart empty
	if len(cart.CartItems) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Cart is empty",
		})
		return
	}

	// Create order
	order := models.Order{
		UserID: userID,
		CartID: cart.ID,
	}

	config.DB.Create(&order)

	// Copy Cart Items → Order Items
	for _, ci := range cart.CartItems {
		orderItem := models.OrderItem{
			OrderID: order.ID,
			ItemID:  ci.ItemID,
			Qty:     1, // each item counts once
		}
		config.DB.Create(&orderItem)
	}

	// Clear cart (delete items)
	config.DB.Where("cart_id = ?", cart.ID).Delete(&models.CartItem{})

	c.JSON(http.StatusCreated, gin.H{
		"message":   "Order placed successfully",
		"order_id":  order.ID,
		"user_id":   userID,
		"cart_id":   cart.ID,
		"cart_data": cart.CartItems,
	})
}

// ----------------------------------------------
// LIST ORDERS → GET /orders
// ----------------------------------------------
func ListOrders(c *gin.Context) {
	var orders []models.Order

	config.DB.
		Preload("OrderItems").
		Find(&orders)

	c.JSON(http.StatusOK, gin.H{
		"orders": orders,
	})
}
