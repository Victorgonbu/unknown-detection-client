import React from 'react';
import {
  render, fireEvent, screen,
} from '../../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import SubmitButton from '../../../components/presentationals/buttons/Submit';

const mockHandleClick = jest.fn();

describe('Submit', () => {
  beforeEach(() => {
    render(<SubmitButton text='login' handleSubmit={mockHandleClick} />)
  });
  it('render button and with text passed in props', () => {
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('login');
  });
  it('call function passed in props when clicked', () => {
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    
  });
});