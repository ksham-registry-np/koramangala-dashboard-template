# Challenge: The Koramangala Tech-Stock Ticker (Frontend Performance)

## Scenario
You are a Lead Frontend Engineer at a trading platform startup in Koramangala. We are building a high-frequency real-time dashboard that tracks the stock prices of top Bangalore tech companies (Swiggy, Zomato, etc.). 

Currently, our ticker updates every **100ms**. However, users are reporting significant lag when typing in the search bar or navigating the sidebar. Our dashboard feels "heavy" and unprofessional, which is unacceptable for institutional-grade trading software.

## The Technical Debt
The root cause is a classic React performance anti-pattern. The `TickerContext` is located at the very top of our component tree. Every time the price of a single stock updates, the *entire* application re-renders—including the search bar, the navigation menu, and the heavy data tables—even though they don't depend on the live price data.

This is a **Global Re-render Hell** that violates the principle of **State Colocation**.

## Your Task: "Institutional Grade" Optimization
Refactor the dashboard architecture to ensure that high-frequency price updates only trigger re-renders in the specific components that display them.

### Requirements:
1.  **Stop Global Re-renders**: Typing in the `DashboardSearch` input must remain at **60fps** (zero lag), even while the ticker is firing.
2.  **Optimize the Heavy Table**: Use `React.memo` or move state closer to the leaf nodes to prevent the `StockTable` from re-rendering unless its specific data changes.
3.  **Component Profiling**: Identify which components are "expensive" to render and protect them.

## The Scale-Up (Stretch Goals)
*In a real tech round, we would discuss these next steps:*
- **Viewport Virtualization**: If we have 10,000 stocks, how would you use **Windowing** (e.g., `react-window`) to only render what's visible?
- **WebWorkers**: How would you move the high-frequency calculation logic (e.g., calculating moving averages) off the UI thread?
- **Throttling/Debouncing**: When should we use `useDeferredValue` (React 18) to prioritize user input over data updates?

## Success Criteria
- **Input Responsiveness**: Zero dropped frames while typing in the search bar during a 100ms ticker surge.
- **Render Trace**: `HeavyTable` Component must not re-render when the search input changes.
- **State Architecture**: Correct use of State Colocation or high-order components.

---

## Starter Code (React/Vite)
- `App.jsx`: The root component with the flawed state placement.
- `TickerProvider.jsx`: The context that needs refactoring.
- `StockTable.jsx`: An expensive component being unnecessarily re-rendered.
