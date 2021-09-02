import React from 'react';
import {
  render, screen,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Favorite from '../../components/presentationals/Favorite';

/* eslint-disable react/display-name */
jest.mock('@fortawesome/react-fontawesome', () => ({
  ...jest.requireActual('@fortawesome/react-fontawesome'),
  FontAwesomeIcon: () => <div data-testid="icon" />,
}));

describe('Favorite', () => {
  it('render favorite icon', () => {
    render(<Favorite />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('render favorite with label', () => {
    render(<Favorite withLabel/>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Favorite')).toBeInTheDocument();
  });
  
  it('render favorite with counter', () => {
    render(<Favorite counter={20}/>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  })
});