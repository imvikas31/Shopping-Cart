package main

import (
	"log"

	"backend/config"
	"backend/models"
)

// seedItems inserts initial items only when no items exist.
func seedItems() {
	var count int64
	if err := config.DB.Model(&models.Item{}).Count(&count).Error; err != nil {
		log.Println("seedItems: failed to count items:", err)
		return
	}

	if count > 0 {
		log.Println("seedItems: items already exist, skipping seeding")
		return
	}

	samples := []models.Item{
		{Name: "Laptop", Price: 59999},
		{Name: "Shoes", Price: 2999},
		{Name: "Water Bottle", Price: 199},
	}

	for _, it := range samples {
		if err := config.DB.Create(&it).Error; err != nil {
			log.Println("seedItems: failed to create item:", err)
		} else {
			log.Println("seedItems: created item", it.Name)
		}
	}
}
