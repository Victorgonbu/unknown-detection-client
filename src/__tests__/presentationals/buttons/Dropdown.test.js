import React from 'react';
import {
  render, fireEvent, screen,
} from '../../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import DropdownButton from '../../../components/presentationals/buttons/Dropdown';

/* eslint-disable react/display-name */
jest.mock('@fortawesome/react-fontawesome', () => ({
  ...jest.requireActual('@fortawesome/react-fontawesome'),
  FontAwesomeIcon: () => <div data-testid="icon" />,
}));

const mockHandleClick = jest.fn();

describe('DropdownButton', () => {
  beforeEach(() => {
    render(<DropdownButton handleClick={mockHandleClick} />);
  });
  it('render button with bars icon', () => {
    const button = screen.getByTestId('dropdown-button');
    const icon = screen.getByTestId('icon');
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('call function passed in props when clicked', () => {
    const button = screen.getByTestId('dropdown-button');
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
