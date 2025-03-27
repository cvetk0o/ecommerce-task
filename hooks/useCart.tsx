"use client";

import { useEffect, useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  return {
    cart,
  };
};

export default useCart;
