import React from 'react'

const TotalAmountCaculator = (cartItems) => {
    const itemsPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const taxAmount = itemsPrice * 0.12
      const shippingAmount = itemsPrice > 200 ? "" : 5.99
      const totalAmount = itemsPrice + taxAmount + shippingAmount

  return {itemsPrice,taxAmount , shippingAmount , totalAmount}
}

export default TotalAmountCaculator
