import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Course, CartItem, Coupon } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (course: Course) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;

    // Coupon Logic
    applyCoupon: (code: string) => boolean;
    removeCoupon: () => void;
    coupon: Coupon | null;

    // Computed
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock Coupons
const VALID_COUPONS: Record<string, Coupon> = {
    'WELCOME20': { code: 'WELCOME20', discountType: 'percent', discountValue: 20 },
    'NOVARA50': { code: 'NOVARA50', discountType: 'fixed', discountValue: 50 },
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Current Cart in localStorage for persistence
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('novara_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [coupon, setCoupon] = useState<Coupon | null>(null);

    // Persistence
    useEffect(() => {
        localStorage.setItem('novara_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (course: Course) => {
        // Prevent duplicates for courses
        if (cartItems.some(item => item.id === course.id)) return;

        const newItem: CartItem = {
            ...course,
            cartId: `cart-${Date.now()}-${Math.random()}`
        };
        setCartItems(prev => [...prev, newItem]);
    };

    const removeFromCart = (cartId: string) => {
        setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    };

    const clearCart = () => {
        setCartItems([]);
        setCoupon(null);
    };

    const applyCoupon = (code: string): boolean => {
        const found = VALID_COUPONS[code.toUpperCase()];
        if (found) {
            setCoupon(found);
            return true;
        }
        return false;
    };

    const removeCoupon = () => {
        setCoupon(null);
    };

    // Computations
    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
    }, [cartItems]);

    const discount = useMemo(() => {
        if (!coupon) return 0;
        if (coupon.discountType === 'fixed') return Math.min(coupon.discountValue, subtotal);
        return (subtotal * coupon.discountValue) / 100;
    }, [subtotal, coupon]);

    const tax = useMemo(() => {
        return (subtotal - discount) * 0.08; // Flat 8% tax
    }, [subtotal, discount]);

    const total = useMemo(() => {
        return Math.max(0, subtotal - discount + tax);
    }, [subtotal, discount, tax]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            applyCoupon,
            removeCoupon,
            coupon,
            subtotal,
            discount,
            tax,
            total,
            itemCount: cartItems.length
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
