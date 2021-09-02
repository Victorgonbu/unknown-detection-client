import React from 'react';
import {
  render, screen, fireEvent
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import NavCurrentPath from '../../components/presentationals/NavCurrentPath';

describe('NavCurrentPath', () => {
  it('render value passed in props', () => {
    render(<NavCurrentPath value="posts"/>);
    expect(screen.getByText('posts')).toBeInTheDocument();
  });
});