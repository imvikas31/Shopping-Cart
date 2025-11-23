package models

import "gorm.io/gorm"

type OrderItem struct {
	gorm.Model
	OrderID uint `json:"order_id"`
	ItemID  uint `json:"item_id"`
	Qty     int  `json:"qty"`
}
