import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeProvider, useTheme } from './components/context/ThemeContext';

function ThemeConsumer() {
    const { tema, toggleTema } = useTheme();
    return (
        <>
            <span data-testid="theme">{tema}</span>
            <button data-testid="toggle" onClick={toggleTema}>Toggle</button>
        </>
    );
}

function OutsideThemeConsumer() {
    useTheme();
    return null;
}

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.className = '';
        window.matchMedia = vi.fn().mockReturnValue({
            matches: false,
            addEventListener: () => { },
            removeEventListener: () => { },
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('should initialize with light theme and update html class', () => {
        render(
            <ThemeProvider>
                <ThemeConsumer />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme').textContent).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should toggle theme and persist the value', () => {
        render(
            <ThemeProvider>
                <ThemeConsumer />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByTestId('toggle'));

        expect(screen.getByTestId('theme').textContent).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should throw when useTheme is used outside ThemeProvider', () => {
        expect(() => render(<OutsideThemeConsumer />)).toThrow('useTheme debe usarse dentro de ThemeProvider');
    });
});
