import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Logo } from '../../../components/ui/Logo';
import { Lock, CreditCard, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage: React.FC = () => {
    const { cartItems, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [billing, setBilling] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        zip: '',
        country: ''
    });

    if (cartItems.length === 0 && !isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <p className="text-slate-500 mb-4">Your cart is empty.</p>
                <Button onClick={() => navigate('/pricing')}>Return to Shop</Button>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center animate-scale-up">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
                    <p className="text-slate-500 mb-8">Thank you for your purchase. A confirmation email has been sent to {billing.email}.</p>
                    <div className="space-y-3">
                        <Button className="w-full justify-center" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                        <Button variant="ghost" className="w-full justify-center" onClick={() => navigate('/courses')}>My Courses</Button>
                    </div>
                </Card>
            </div>
        );
    }

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        clearCart();
        setIsSuccess(true);
    };

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
                        <span className="text-slate-900 cursor-pointer" onClick={() => navigate('/cart')}>Cart</span>
                        <span>/</span>
                        <span className="font-bold text-slate-900">Checkout</span>
                        <span>/</span>
                        <span>Confirm</span>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left: Billing & Payment */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Billing Details */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Billing Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-novara-500 transition-colors"
                                        value={billing.name}
                                        onChange={e => setBilling({ ...billing, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                                    <input
                                        type="email" required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-novara-500 transition-colors"
                                        value={billing.email}
                                        onChange={e => setBilling({ ...billing, email: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Street Address</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-novara-500 transition-colors"
                                        value={billing.address}
                                        onChange={e => setBilling({ ...billing, address: e.target.value })}
                                        placeholder="123 Education St."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">City</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-novara-500 transition-colors"
                                        value={billing.city}
                                        onChange={e => setBilling({ ...billing, city: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Postal Code</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-novara-500 transition-colors"
                                        value={billing.zip}
                                        onChange={e => setBilling({ ...billing, zip: e.target.value })}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h2>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="flex border-b border-slate-100">
                                    <div className="flex-1 p-4 flex items-center justify-center gap-2 bg-novara-50/50 text-novara-700 font-bold border-b-2 border-novara-500 cursor-pointer">
                                        <CreditCard size={18} /> Credit Card
                                    </div>
                                    <div className="flex-1 p-4 flex items-center justify-center gap-2 text-slate-400 font-bold bg-slate-50 cursor-not-allowed">
                                        PayPal
                                    </div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Card Number</label>
                                        <div className="relative">
                                            <input
                                                type="text" placeholder="0000 0000 0000 0000"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 font-mono focus:outline-none focus:border-novara-500"
                                            />
                                            <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Expiry Date</label>
                                            <input
                                                type="text" placeholder="MM/YY"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-mono focus:outline-none focus:border-novara-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">CVV</label>
                                            <input
                                                type="text" placeholder="123"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-mono focus:outline-none focus:border-novara-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-28">
                            <h3 className="font-bold text-slate-900 mb-6 text-lg">Order Review</h3>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.cartId} className="flex gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded bg-cover" style={{ backgroundImage: `url(${item.thumbnail})` }} />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</p>
                                            <p className="text-xs text-slate-500">${item.price?.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-900 text-lg">Total to Pay</span>
                                    <span className="font-bold text-slate-900 text-2xl">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button disabled={isLoading} className="w-full justify-center py-4 text-base relative">
                                {isLoading ? (
                                    <span className="flex items-center gap-2">Processing...</span>
                                ) : (
                                    <span className="flex items-center gap-2"><Lock size={16} /> Pay ${total.toFixed(2)}</span>
                                )}
                            </Button>

                            <p className="text-xs text-slate-400 text-center mt-4">
                                By clicking "Pay", you agree to our Terms of Service. Secure 256-bit SSL encrypted.
                            </p>
                        </Card>
                    </div>

                </form>
            </div>
        </div>
    );
};
