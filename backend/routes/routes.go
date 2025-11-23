package routes

import (
	"backend/controllers"
	"backend/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	// ---------- CORS FIX ----------
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001"},
		AllowMethods:     []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// ---------- PUBLIC ROUTES ----------
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Server running"})
	})

	r.POST("/users", controllers.RegisterUser)       // signup
	r.POST("/users/login", controllers.LoginUser)    // login

	// ---------- ITEMS ----------
	r.POST("/items", controllers.CreateItem)
	r.GET("/items", controllers.ListItems)

	// ---------- AUTH PROTECTED ROUTES ----------
	auth := r.Group("/")
	auth.Use(utils.AuthMiddleware())

	// CART
	auth.POST("/carts", controllers.AddToCart)
	auth.GET("/carts", controllers.ListCarts)

	// IMPORTANT: Add missing update + delete for cart
	auth.PATCH("/carts/:id", controllers.UpdateCartQty)
	auth.DELETE("/carts/:id", controllers.DeleteCartItem)

	// ORDERS
	auth.POST("/orders", controllers.CreateOrder)
	auth.GET("/orders", controllers.ListOrders)

	return r
}
