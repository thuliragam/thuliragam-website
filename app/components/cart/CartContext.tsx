
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  name: string;
  image: string;
  price50g: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: {
    name: string;
    image: string;
    price50g?: number;
  }) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("thuliragam-cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch {
      localStorage.removeItem("thuliragam-cart");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("thuliragam-cart", JSON.stringify(cartItems));
    }
  }, [cartItems, ready]);

  function addToCart(product: {
    name: string;
    image: string;
    price50g?: number;
  }) {
    if (product.price50g === undefined || product.price50g <= 0) return;

    setCartItems((previous) => {
      const existing = previous.find(
        (item) => item.name === product.name
      );

      if (existing) {
        return previous.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previous,
        {
          name: product.name,
          image: product.image,
          price50g: product.price50g!,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(name: string) {
    setCartItems((previous) =>
      previous.filter((item) => item.name !== name)
    );
  }

  function updateQuantity(name: string, quantity: number) {
    if (quantity < 1) {
      removeFromCart(name);
      return;
    }

    setCartItems((previous) =>
      previous.map((item) =>
        item.name === name ? { ...item, quantity } : item
      )
    );
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price50g * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
