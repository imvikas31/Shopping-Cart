package models

import "gorm.io/gorm"

type Cart struct {
    gorm.Model
    UserID    uint       `json:"user_id"`
    CartItems []CartItem `gorm:"foreignKey:CartID" json:"cart_items"`
}

type CartItem struct {
    gorm.Model
    CartID uint `json:"cart_id"`
    ItemID uint `json:"item_id"`
    Qty    int  `json:"qty"`

    // FIX: Ensure GORM loads the Item
    Item Item `gorm:"references:ID;foreignKey:ItemID" json:"item"`
}
