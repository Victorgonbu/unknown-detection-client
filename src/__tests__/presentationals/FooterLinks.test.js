import React from 'react';
import {
  render, screen, fireEvent,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import FooterLinks from '../../components/presentationals/FooterLinks';

const mockLogOut = jest.fn();

describe('FooterLinks', () => {
  it('render help label and log out button', () => {
    render(<FooterLinks handleLogOut={() => {}} />);
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('call function passed in props when clicked', () => {
    render(<FooterLinks handleLogOut={mockLogOut} />);
    const button = screen.getByText('Log out');
    fireEvent.click(button);
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
