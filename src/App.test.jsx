import { render } from '@testing-library/react';
import { test, expect, beforeAll } from 'vitest';
import App from './App';

beforeAll(() => {
    if (!window.matchMedia) {
        window.matchMedia = () => ({
            matches: false,
            addListener: () => { },
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => false,
        });
    }
});

test('App renders without crashing', () => {
    const { container } = render(<App />);
    expect(container.firstChild).not.toBeNull();
});
