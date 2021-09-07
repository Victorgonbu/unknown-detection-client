import React from 'react';
import {
  render,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import DropdownMenu from '../../components/containers/DropdownMenu';

/* eslint-disable react/display-name */
jest.mock('../../components/presentationals/UserLinks', () => () => <div data-testid="user-links" />);
jest.mock('../../components/presentationals/FooterLinks', () => () => <div data-testid="footer-links" />);
jest.mock('../../components/presentationals/AuthLinks', () => () => <div data-testid="auth-links" />);

describe('DropdownMenu', () => {
  const initialState = {
    user: {
      name: 'victor',
      email: '@victor',
    },
    navbar: {
      dropdown: true,
    },
  };
  describe('initial redux state', () => {
    it('render UserLinks and FooterLinks if current user', () => {
      const { getByTestId } = render(<DropdownMenu />, initialState);
      expect(getByTestId('user-links')).toBeInTheDocument();
      expect(getByTestId('footer-links')).toBeInTheDocument();
    });
    it('render AuthLinks, Posts link and footer text if no current user', () => {
      initialState.user.name = null;
      const { getByTestId, getByText } = render(<DropdownMenu />, initialState);
      expect(getByTestId('auth-links')).toBeInTheDocument();
      expect(getByText('Posts')).toBeInTheDocument();
      expect(getByText('Victor @2021')).toBeInTheDocument();
    });
  });
});
