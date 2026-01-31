import React, { useState, useEffect, createContext, useContext } from 'react';

// THE VULNERABLE CONTEXT
// This lives at the root and causes the whole app to re-render on every price tick.
const TickerContext = createContext();

export const TickerProvider = ({ children }) => {
    const [prices, setPrices] = useState({ SWIGGY: 450, ZOMATO: 180, ZEPTO: 320 });

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => ({
                ...prev,
                SWIGGY: prev.SWIGGY + (Math.random() - 0.5) * 5,
                ZOMATO: prev.ZOMATO + (Math.random() - 0.5) * 2,
                ZEPTO: prev.ZEPTO + (Math.random() - 0.5) * 3,
            }));
        }, 100); // 100ms High-frequency updates

        return () => clearInterval(interval);
    }, []);

    return (
        <TickerContext.Provider value={prices}>
            {children}
        </TickerContext.Provider>
    );
};

export const usePrices = () => useContext(TickerContext);

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <TickerProvider>
            <div className="p-8 font-sans">
                <h1 className="text-2xl font-bold mb-4">Koramangala Tech Dashboard</h1>

                {/* SEARCH BAR: This will lag under high-frequency updates */}
                <div className="mb-8">
                    <label className="block mb-2 font-semibold">Search Stocks:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Type to search..."
                        className="border p-2 w-64 rounded-lg"
                    />
                </div>

                <div className="flex gap-8">
                    <StockTable />
                    <Sidebar />
                </div>
            </div>
        </TickerProvider>
    );
};

// COMPONENT: Heavy Table
// This component re-renders on every price tick AND every search term change.
const StockTable = () => {
    const prices = usePrices();

    // Simulate expensive computation (e.g., sorting or filtering)
    const renderTime = performance.now();
    console.log(`[RENDER] StockTable at ${renderTime}`);

    return (
        <div className="border rounded-lg p-4 flex-1">
            <h2 className="text-xl font-bold mb-4">Live Ticker</h2>
            <table className="w-full">
                <thead>
                    <tr className="text-left border-b">
                        <th>Symbol</th>
                        <th>Price (INR)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(prices).map(([symbol, price]) => (
                        <tr key={symbol}>
                            <td className="py-2">{symbol}</td>
                            <td className="py-2">{price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// COMPONENT: Sidebar
// This should never re-render because of prices, but it does!
const Sidebar = () => {
    console.log("[RENDER] Sidebar");
    return (
        <div className="border rounded-lg p-4 w-64 bg-gray-50">
            <h2 className="font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
                <li><a href="#" className="text-blue-600">Market News</a></li>
                <li><a href="#" className="text-blue-600">Portfolios</a></li>
                <li><a href="#" className="text-blue-600">Settings</a></li>
            </ul>
        </div>
    );
};

export default Dashboard;
