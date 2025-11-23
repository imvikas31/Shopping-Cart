package main

import (
	"backend/config"
	"backend/models"
	"backend/routes"
)

func main() {
	// Connect DB
	config.ConnectDatabase()

	// Auto-migrate models
	config.DB.AutoMigrate(
		&models.User{},
		&models.Item{},
		&models.Cart{},
		&models.CartItem{},
		&models.Order{},
		&models.OrderItem{},
	)

	// Seed sample items (only if items table is empty)
	seedItems()

	// Setup routes (Gin is used inside this function)
	r := routes.SetupRoutes()

	// Start server on port 8080
	r.Run(":8080")
}
