package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Name  string  `gorm:"not null" json:"name"`
	Price float64 `json:"price"`
}
