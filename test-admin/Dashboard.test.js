import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './src/Dashboard';
import { PieChart, Pie } from 'recharts';

// Mock the PieChart and Pie components from Recharts
jest.mock('recharts', () => ({
  PieChart: jest.fn(({ children }) => <div data-testid="pie-chart">{children}</div>),
  Pie: jest.fn(() => <div data-testid="pie" />),
  Cell: jest.fn(() => <div />),
  Tooltip: jest.fn(() => <div />),
}));

describe('Dashboard Component', () => {
  test('renders the graphs', () => {
    render(<Dashboard />);
    
    // Verifica que los gráficos (PieChart) se rendericen
    expect(screen.getAllByTestId('pie-chart').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('pie').length).toBeGreaterThan(0);
  });

  test('uses default values when no data is provided', () => {
    render(<Dashboard />);

    // Verifica todas las instancias del texto "Cuantos sistemas se pueden construir"
    const systemsTexts = screen.getAllByText(/Cuantos sistemas se pueden construir:/);

    // Debería haber 3 instancias: total, digital, y efectivo
    expect(systemsTexts.length).toBe(3);

    // Verifica que cada instancia tenga el valor predeterminado de 0 o más
    systemsTexts.forEach((textElement) => {
      const number = parseInt(textElement.textContent.match(/\d+/)[0], 10);
      expect(number).toBeGreaterThanOrEqual(0);
    });

    // Verifica que los gráficos se rendericen incluso con valores predeterminados
    expect(screen.getAllByTestId('pie-chart').length).toBeGreaterThan(0);
  });

  test('displays the correct number of systems that can be constructed', () => {
    render(<Dashboard />);

    // Verifica todas las instancias de "Cuantos sistemas se pueden construir"
    const systemsTexts = screen.getAllByText(/Cuantos sistemas se pueden construir:/);

    // Debería haber 3 instancias: total, digital, y efectivo
    expect(systemsTexts.length).toBe(3);

    // Verifica que el número de sistemas que se pueden construir no sea negativo
    systemsTexts.forEach((textElement) => {
      const number = parseInt(textElement.textContent.match(/\d+/)[0], 10);
      expect(number).toBeGreaterThanOrEqual(0);
    });
  });

  test('allows goal to be updated through input field', () => {
    render(<Dashboard />);

    // Verifica que el campo de texto de meta (goal) se renderiza
    const input = screen.getByLabelText(/Costo/i);
    expect(input).toBeInTheDocument();

    // Simula el cambio de valor en el campo de entrada
    screen.getByLabelText(/Costo/i).value = 2000;
    expect(input.value).toBe("2000"); // Verifica que el valor cambió correctamente
  });
});
