import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export default function renderWithRouter(component, route = '/') {
  window.history.pushState({}, 'Test page', route);

  const history = window.location;

  return {
    ...render(<BrowserRouter>{ component }</BrowserRouter>), history,
  };
}