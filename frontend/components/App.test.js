import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional'; 

test('renders form with email input and submit button', () => {
  const { getByPlaceholderText, getByText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');
  const submitButton = getByText('Submit');

  expect(emailInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('typing on the input updates its value', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});

test('updates email input value on change', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  expect(emailInput.value).toBe('test@example.com');
});





