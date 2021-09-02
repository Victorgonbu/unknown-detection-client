import React from 'react';
import {
  render, screen
} from '../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

/* eslint-disable react/display-name */
jest.mock('../components/containers/DropdownMenu', () => () => <div data-testid="dropdown-menu" />);
jest.mock('../components/containers/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../components/containers/SearchBox', () => () => <div data-testid="search-box" />);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="children" />
}));


describe('App', () => {
  const initialState = {
    user: {
      dropdown: false,
    },
    posts: {
      searchActive: false,
    }
  };

  it('render dropdown menu, navbar and children', () => {
    const { getByTestId } = render(<App />, initialState);
    expect(getByTestId('dropdown-menu')).toBeInTheDocument();
    expect(getByTestId('navbar')).toBeInTheDocument();
    expect(getByTestId('children')).toBeInTheDocument();
  });
  it('render search box if search is active', () => {
    initialState.posts.searchActive = true;
    const { getByTestId } = render(<App />, initialState);
    expect(getByTestId('search-box')).toBeInTheDocument();

  });
});
