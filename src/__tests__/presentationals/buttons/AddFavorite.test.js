import React from 'react';
import {
  render, fireEvent, screen,
} from '../../../utils/test-utils.js';
import '@testing-library/jest-dom/extend-expect';
import AddFavorite from '../../../components/presentationals/buttons/AddFavorite';

const mockHandleClick = jest.fn();

describe('AddFavorite', () => {
  beforeEach(() => {
    render(<AddFavorite text="favorite" handleClick={mockHandleClick} />);
  });
  it('render button with text passed in props', () => {
    const button = screen.getByText('favorite');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });
  it('calls function passed in props when clicked', () => {
    const button = screen.getByText('favorite');
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
