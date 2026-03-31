The existing README needs significant updates. The description matches the concept but there are several inaccuracies and missing information. Here's a corrected README:

# Koramangala Tech-Stock Ticker Dashboard

## Overview
A React performance optimization challenge demonstrating common anti-patterns in high-frequency trading dashboards. This repository contains a deliberately flawed implementation where rapid stock price updates (every 100ms) cause global re-renders, creating lag in user interactions.

## The Performance Problem
The current implementation suffers from "Global Re-render Hell" where the `TickerContext` at the root level triggers entire application re-renders every 100ms, causing:
- Input lag in the search bar
- Unnecessary re-renders of heavy components
- Poor user experience during high-frequency updates

## Technical Challenge
Refactor the dashboard to implement proper state colocation and prevent unnecessary re-renders while maintaining real-time price updates for Bangalore tech companies (Swiggy, Zomato, Zepto).

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd koramangala-dashboard-template

# Install dependencies
npm install

# Start development server
npm run dev
```

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.2.0"
}
```

## Project Structure

```
├── src/
│   └── Dashboard.jsx          # Main dashboard with performance issues
├── starter/
│   └── src/Dashboard.jsx      # Starter template (identical to main)
├── verifier/
│   └── optimization.test.js   # Performance verification tests
├── package.json
└── README.md
```

## Current Implementation Issues

### 1. Global Context Anti-pattern
```javascript
// PROBLEMATIC: TickerContext at root level
const TickerProvider = ({ children }) => {
    const [prices, setPrices] = useState({ SWIGGY: 450, ZOMATO: 180, ZEPTO: 320 });
    
    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => ({
                ...prev,
                SWIGGY: prev.SWIGGY + (Math.random() - 0.5) * 5,
                // ... causes entire app re-render every 100ms
            }));
        }, 100);
    }, []);
}
```

### 2. Missing Component Implementations
The README mentions `StockTable` and `Sidebar` components, but they're incomplete in the actual code (cut off with "// COMPONE").

## Your Mission: Optimization Requirements

### Primary Goals
1. **Eliminate Input Lag**: Search bar must maintain 60fps responsiveness
2. **Component Isolation**: Implement `React.memo` for expensive components
3. **State Colocation**: Move ticker state closer to components that need it
4. **Selective Re-renders**: Only price display components should re-render on ticker updates

### Success Criteria
- ✅ Search input remains responsive during price updates
- ✅ Heavy components don't re-render unnecessarily
- ✅ Passes performance verification tests
- ✅ Maintains real-time price updates

## Testing

```bash
npm test verifier/optimization.test.js
```

The test verifies that heavy components don't re-render when search input changes.

## Optimization Strategies to Consider

1. **Context Splitting**: Separate read and write contexts
2. **State Colocation**: Move price state to specific components
3. **Memoization**: Use `React.memo`, `useMemo`, `useCallback`
4. **Component Architecture**: Restructure component hierarchy

## Advanced Challenges (Stretch Goals)

- **Virtualization**: Implement windowing for large stock lists
- **Web Workers**: Offload calculations from UI thread  
- **React 18 Features**: Use `useDeferredValue` for input prioritization
- **Throttling**: Implement smart update batching

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite 5
- **Styling**: Utility CSS classes
- **Testing**: Jest with React Testing Library

## Getting Started

1. Run the current implementation and observe the performance issues
2. Open browser DevTools → Performance tab
3. Record interaction while typing in search bar
4. Identify unnecessary re-renders and optimize accordingly
5. Verify improvements with the provided test suite

---

**Note**: This is a deliberate performance anti-pattern for educational purposes. The goal is to identify and fix React performance issues in high-frequency update scenarios.