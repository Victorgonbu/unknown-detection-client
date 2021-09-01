import React from 'react';
import {
  render, fireEvent, screen,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Errors from '../../components/presentationals/Errors';

describe('Errors', () => {
  it('render list of errors passed in props', () => {
    render(<Errors list={['error', 'other error']}/>)
    expect(screen.getByTestId('errors')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
    expect(screen.getByText('other error')).toBeInTheDocument();
  });
});
