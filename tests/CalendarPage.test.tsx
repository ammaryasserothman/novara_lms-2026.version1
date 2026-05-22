import { render } from '@testing-library/react';
import { CalendarPage } from '../src/features/dashboard/pages/CalendarPage';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

test('CalendarPage renders without crashing', () => {
  render(
    <MemoryRouter>
      <CalendarPage />
    </MemoryRouter>
  );
});
