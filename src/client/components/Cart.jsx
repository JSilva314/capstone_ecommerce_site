import React from "react";

function Cart({ cart }) {
  console.log(cart);
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((car) => (
        <div key={car.id}>
          <h3>Make: {car.make}</h3>
          <h3>Model: {car.model}</h3>
          <h3>Price: {car.price}</h3>
        </div>
      ))}
    </div>
  );
}

export default Cart;
