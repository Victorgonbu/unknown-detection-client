import React from 'react';
import {
  render,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import SearchBox from '../../components/containers/SearchBox';

/* eslint-disable react/display-name */
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => <div data-testid="link" />,
}));

describe('SearchBox', () => {
  it('render search input and button', () => {
    const { getByPlaceholderText, getByTestId } = render(<SearchBox />);
    expect(getByPlaceholderText('Search posts by title')).toBeInTheDocument();
    expect(getByTestId('link')).toBeInTheDocument();
  });
});
