import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../src/Dashboard';
import React from 'react';

describe('Performance Audit', () => {
    it('should NOT re-render heavy components when typing in search', () => {
        const renderSpy = jest.fn();
        const HeavyTable = React.memo(({ onRender }) => {
            onRender();
            return <div>Heavy Table Content</div>;
        });

        render(<Dashboard CustomTable={<HeavyTable onRender={renderSpy} />} />);

        const searchInput = screen.getByPlaceholderText(/search/i);

        // Initial render
        expect(renderSpy).toHaveBeenCalledTimes(1);

        // Type in search
        fireEvent.change(searchInput, { target: { value: 'Bengaluru' } });

        // HeavyTable should NOT have re-rendered if optimized
        expect(renderSpy).toHaveBeenCalledTimes(1);
    });
});
