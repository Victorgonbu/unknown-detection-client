import React from 'react';
import {
  render, fireEvent, screen,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import AuthLinks from '../../components/presentationals/AuthLinks';

const mockHandleClick = jest.fn();

describe('AuthLinks', () => {
  beforeEach(() => {
    render(<AuthLinks handleLink={mockHandleClick} />);
  });

  it('render app name with login and signup links', () => {
    expect(screen.getAllByTestId('link').length).toBe(2);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Unknown Detections!')).toBeInTheDocument();
  });

  it('call function passed in props when any of the auth links gets clicked', () => {
    const links = screen.getAllByTestId('link');
    fireEvent.click(links[0]);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    fireEvent.click(links[1]);
    expect(mockHandleClick).toHaveBeenCalledTimes(2);
  });
});
