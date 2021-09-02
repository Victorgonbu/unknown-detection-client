import React from 'react';
import {
  render, screen, fireEvent,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import UserLinks from '../../components/presentationals/UserLinks';

const mockHandleToggle = jest.fn();
/* eslint-disable react/display-name */
jest.mock('../../components/presentationals/UserAvatar', () => () => <div data-testid="user-avatar" />);

describe('UserLinks', () => {
  beforeEach(() => {
    render(<UserLinks name="victor" email="email" handleToggle={mockHandleToggle} />);
  });
  it('render User avatar with email, name and nav links', () => {
    expect(screen.getByText('victor')).toBeInTheDocument();
    expect(screen.getByText('@email')).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
    expect(screen.getAllByTestId('link').length).toBe(2);
  });

  it('call function passed in props when a link gets clicked', () => {
    const links = screen.getAllByTestId('link');
    fireEvent.click(links[0]);
    expect(mockHandleToggle).toHaveBeenCalledTimes(1);
    fireEvent.click(links[1]);
    expect(mockHandleToggle).toHaveBeenCalledTimes(2);
  });
});
