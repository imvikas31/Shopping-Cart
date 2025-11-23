package controllers

import (
	"net/http"

	"backend/config"
	"backend/models"

	"github.com/gin-gonic/gin"
)

// ----------------------------------------
// CREATE ITEM   → POST /items
// ----------------------------------------
func CreateItem(c *gin.Context) {
	var body struct {
		Name  string  `json:"name"`
		Price float64 `json:"price"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}

	if body.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Item name cannot be empty",
		})
		return
	}

	item := models.Item{
		Name:  body.Name,
		Price: body.Price,
	}

	if err := config.DB.Create(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create item",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Item created successfully",
		"item":    item,
	})
}

// ----------------------------------------
// LIST ITEMS   → GET /items
// ----------------------------------------
func ListItems(c *gin.Context) {
	var items []models.Item

	if err := config.DB.Find(&items).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch items",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Item fetched successfully",
		"items": items,
	})
}
