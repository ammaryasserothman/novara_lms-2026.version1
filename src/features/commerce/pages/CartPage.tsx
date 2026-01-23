import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Trash2, Tag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../components/ui/Logo';

export const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, subtotal, discount, tax, total, applyCoupon, removeCoupon, coupon } = useCart();
    const navigate = useNavigate();
    const [couponInput, setCouponInput] = useState('');
    const [couponError, setCouponError] = useState('');

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;
        const success = applyCoupon(couponInput);
        if (success) {
            setCouponInput('');
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <Trash2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-8">Looks like you haven't added any courses yet.</p>
                <Button onClick={() => navigate('/pricing')}>Browse Courses</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-600">
            {/* Header */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 flex items-center justify-center text-novara-600">
                            <Logo className="w-full h-full" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">NOVARA</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="font-bold text-slate-900">Cart</span>
                        <span>/</span>
                        <span>Checkout</span>
                        <span>/</span>
                        <span>Confirm</span>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart ({cartItems.length})</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map(item => (
                            <Card key={item.cartId} className="p-4 flex gap-6 items-center group">
                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                                        <span className="font-bold text-slate-900">${item.price?.toFixed(2) || '0.00'}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-2">by {item.instructor}</p>
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                        <span>{item.category}</span>
                                        <span>•</span>
                                        <span>{item.totalModules} Modules</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.cartId)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remove item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </Card>
                        ))}

                        <Button variant="ghost" icon={<ArrowLeft size={16} />} onClick={() => navigate('/pricing')}>Continue Shopping</Button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6 sticky top-28">
                            <h3 className="font-bold text-slate-900 mb-6 text-lg">Order Summary</h3>

                            <div className="space-y-3 text-sm text-slate-600 border-b border-slate-100 pb-6 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                                </div>
                                {coupon && (
                                    <div className="flex justify-between text-green-600">
                                        <span className="flex items-center gap-1"><Tag size={12} /> Coupon: {coupon.code}</span>
                                        <span className="font-bold">-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Tax (8%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <span className="font-bold text-slate-900 text-lg">Total</span>
                                <span className="font-bold text-slate-900 text-3xl">${total.toFixed(2)}</span>
                            </div>

                            {/* Coupon Input */}
                            <div className="mb-6">
                                {!coupon ? (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Coupon Code"
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-novara-500"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                        />
                                        <Button variant="secondary" size="sm" onClick={handleApplyCoupon}>Apply</Button>
                                    </div>
                                ) : (
                                    <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 flex justify-between items-center text-sm text-green-700">
                                        <span className="font-bold">Code {coupon.code} applied</span>
                                        <button onClick={removeCoupon} className="text-xs hover:underline">Remove</button>
                                    </div>
                                )}
                                {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                            </div>

                            <Button className="w-full justify-center py-4 text-base" onClick={() => navigate('/checkout')}>
                                Proceed to Checkout
                            </Button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                                <ShieldCheck size={14} /> Secure Checkout
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
