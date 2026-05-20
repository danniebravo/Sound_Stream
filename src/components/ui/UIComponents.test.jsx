import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import Notificacion from './Notificacion';
import Loader from './Loader';

describe('UI components', () => {
    it('renders Button variants and children', () => {
        render(<Button variant="ghost">Action</Button>);
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('Action');
        expect(button.className).toContain('bg-transparent');
    });

    it('renders Input with icon and placeholder', () => {
        render(<Input icon="search" placeholder="Buscar" />);
        expect(screen.getByPlaceholderText('Buscar').tagName).toBe('INPUT');
        expect(screen.getByText('search')).toBeTruthy();
    });

    it('renders Modal with overlay and title', () => {
        render(
            <Modal title="Test modal" overlay={true}>
                Hola
            </Modal>
        );
        expect(screen.getByText('Test modal')).toBeTruthy();
        expect(screen.getByText('Hola')).toBeTruthy();
    });

    it('renders Notificacion in success and error modes', () => {
        render(<Notificacion tipo="exito" mensaje="Listo" fixed={false} />);
        expect(screen.getByText('Listo')).toBeTruthy();
        render(<Notificacion tipo="error" mensaje="Fallo" fixed={false} />);
        expect(screen.getByText('Fallo')).toBeTruthy();
    });

    it('renders Loader with custom size', () => {
        const { container } = render(<Loader size="w-20 h-20" />);
        const loader = container.firstChild;
        expect(loader).toBeTruthy();
        expect(loader.className).toContain('w-20');
    });
});
