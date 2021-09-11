import React from 'react';
import {
  render, fireEvent, screen,
} from '../../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import BackButton from '../../../components/presentationals/buttons/Back';

const mockNavigate = jest.fn();

/* eslint-disable react/display-name */
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  ...jest.requireActual('@fortawesome/react-fontawesome'),
  FontAwesomeIcon: () => <div data-testid="icon" />,
}));

describe('Back', () => {
  beforeEach(() => {
    render(<BackButton />);
  });
  it('render button with left arrow button', () => {
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('navigate to previous route when clicked', () => {
    const button = screen.getByTestId('back-button');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
