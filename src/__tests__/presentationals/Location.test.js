import React from 'react';
import {
  render, screen,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Location from '../../components/presentationals/Location';

describe('Location', () => {
  it('render text passed in props with location label', () => {
    render(<Location value="my city" />);
    expect(screen.getByText('my city')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });
});
