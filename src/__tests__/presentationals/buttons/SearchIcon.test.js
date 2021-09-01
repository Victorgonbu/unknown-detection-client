import React from 'react';
import {
  render, fireEvent, screen
} from '../../../utils/test-utils.js';
import '@testing-library/jest-dom/extend-expect';
import SearchIcon from '../../../components/presentationals/buttons/SearchIcon';

jest.mock('@fortawesome/react-fontawesome', () => ({
  ...jest.requireActual('@fortawesome/react-fontawesome'),
  FontAwesomeIcon: () => <div data-testid="icon"/>,
}));

const mockHandleClick = jest.fn();

describe('SearchIcon', () => {
  beforeEach(() => {
    render(<SearchIcon active={false} handleClick={mockHandleClick} />);
  });
  it('render button with icon', () => {
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('render close button if active prop is passed', () => {
    render(<SearchIcon active={true} handleClick={mockHandleClick} />);
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });

  it('call function passed in props when clicked', () => {
    const button = screen.getByTestId('search-icon');
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  })
});