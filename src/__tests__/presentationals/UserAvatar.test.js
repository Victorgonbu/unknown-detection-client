import React from 'react';
import {
  render, screen,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import UserAvatar from '../../components/presentationals/UserAvatar';

/* eslint-disable react/display-name */
jest.mock('@fortawesome/react-fontawesome', () => ({
  ...jest.requireActual('@fortawesome/react-fontawesome'),
  FontAwesomeIcon: () => <span data-testid="icon" />,
}));

describe('UserAvatar', () => {
  it('render user icon', () => {
    render(<UserAvatar />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
