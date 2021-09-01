import React from 'react';
import {
  render, screen,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Description from '../../components/presentationals/Description';

/* eslint-disable react/display-name */
jest.mock('../../components/presentationals/Favorite', () => () => <div data-testid="favorite" />);

describe('Description', () => {
  it('render description title, text and favorite', () => {
    render(<Description text="description"/>);
    expect(screen.getByText('About this')).toBeInTheDocument();
    expect(screen.getByTestId('favorite')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  })
});
