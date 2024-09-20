import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (product) => {
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingProductIndex >= 0) {
            // Nếu sản phẩm đã tồn tại trong giỏ, chỉ cập nhật số lượng
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingProductIndex].quantity += product.quantity;
            setCartItems(updatedCartItems);
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            setCartItems([...cartItems, product]);
            setCartCount(cartCount + 1); // Chỉ tăng Badge khi sản phẩm khác loại
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product, quantity) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id);
//       if (existingItem) {
//         // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       } else {
//         // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm mới với số lượng
//         return [...prevItems, { ...product, quantity }];
//       }
//     });
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };