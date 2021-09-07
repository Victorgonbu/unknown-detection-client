import React from 'react';
import {
  render, fireEvent, reduxStore,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../../components/containers/Navbar';
import '../../utils/icons';

/* eslint-disable react/display-name */
const mockLocation = { pathname: '/posts', search: '' };
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
  useNavigate: () => mockNavigate,
}));

describe('Navbar', () => {
  const initialState = {
    navbar: {
      currentPathName: 'posts',
      searchActive: false,
    },
  };

  it('Render dropdown button, nav current path and search icon', () => {
    const { getByTestId, getByText } = render(<Navbar />, initialState);
    expect(getByTestId('dropdown-button')).toBeInTheDocument();
    expect(getByText('posts')).toBeInTheDocument();
    expect(getByTestId('search-icon')).toBeInTheDocument();
  });
  it('render BackButton if current path has params or search query', () => {
    mockLocation.search = 'query';
    const { getByTestId } = render(<Navbar />, initialState);
    expect(getByTestId('back-button')).toBeInTheDocument();
  });

  it('navigate to previous route when back arrow is clicked', () => {
    const { getByTestId } = render(<Navbar />, initialState);
    const backButton = getByTestId('back-button');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  describe('dispatch action to redux store', () => {
    it('when dropdown button is clicked', () => {
      mockLocation.search = '';
      const { getByTestId } = render(<Navbar />, initialState);
      const dropdownButton = getByTestId('dropdown-button');
      fireEvent.click(dropdownButton);
      const actions = reduxStore.getActions();
      expect(actions[0]).toEqual({ type: 'TOGGLE_DROPDOWN' });
    });

    it('when search icon is clicked', () => {
      const { getByTestId } = render(<Navbar />, initialState);
      const searchButton = getByTestId('search-icon');
      fireEvent.click(searchButton);
      const actions = reduxStore.getActions();
      expect(actions[0]).toEqual({ type: 'SET_SEARCH_STATE' });
    });
  });
});
