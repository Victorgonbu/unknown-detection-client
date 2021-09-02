import React from 'react';
import {
  render, screen,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Post from '../../components/presentationals/Post';


/* eslint-disable react/display-name */
jest.mock('../../components/presentationals/Favorite', () => () => <div data-testid="favorite" />);

describe('Post', () => {
  it('render post thumb attributes passed in props', () => {
    render(<Post
      imageUrl="image_url"
      title='Post title'
      location='Post location'
      id="1"
    />);
    const posterImage = screen.getByAltText('Post poster');
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', 'image_url');
    expect(screen.getByText('Post title')).toBeInTheDocument();
    expect(screen.getByText('Post location')).toBeInTheDocument();
    expect(screen.queryByTestId('favorite')).not.toBeInTheDocument();
  });
  it('render favorite component if prop favorite is passed', () => {
    render(<Post
      imageUrl="image_url"
      title='Post title'
      location='Post location'
      favorite={{id: '1'}}
      id="1"
    />);
    expect(screen.getByTestId('favorite')).toBeInTheDocument();
  });
});
