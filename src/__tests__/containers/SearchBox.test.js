import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, reduxStore,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import SearchBox from '../../components/containers/SearchBox';
import { faJedi } from '@fortawesome/free-solid-svg-icons';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: () => <div data-testid="link" />
}));

describe('SearchBox', () => {
  it('render search input and button', () => {
    const { getByPlaceholderText, getByTestId } = render(<SearchBox/>);
    expect(getByPlaceholderText('Search posts by title')).toBeInTheDocument();
    expect(getByTestId('link')).toBeInTheDocument();
  });
});