import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  act, render, fireEvent, waitFor, reduxStore, getByAltText,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Post from '../../components/containers/Post';
import '../../utils/icons';

/* eslint-disable react/display-name */
jest.mock('../../components/presentationals/UserAvatar', () => () => <div data-testid="user-avatar" />);
jest.mock('../../components/presentationals/Location', () => () => <div data-testid="location" />);
jest.mock('../../components/presentationals/Description', () => () => <div data-testid="description" />);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ state: { id: 1 } }),
}));

const requestResponse = {
  data: {
    id: '30',
    type: 'post',
    attributes: {
      title: 'post title',
      description: 'post description',
      location: 'post location',
      image: 'image.jpg',
      favorite: null,
    },
    relationships: {
      favorites: {
        data: [
          {
            id: '92',
            type: 'favorite',
          },
        ],
      },
    },
  },
  included: [
    {
      id: '18',
      type: 'user',
      attributes: {
        name: 'Janessa',
      },
    },
  ],
};

const favoriteResponse = {
  data: {
    id: "1",
    relationships: {
      post: {data: {id: '30', type: 'post'}},
      user: {data: {id: '5', type: 'user'}},
    },
    type: 'favorite',
  },
}

const server = setupServer(
  rest.get('http://localhost/api/v1/posts/1', (req, res, ctx) => res(ctx.json(
    requestResponse,
  ))),
  rest.post('http://localhost/api/v1/favorites', (req, res, ctx) => res(ctx.json(
    favoriteResponse,
  ))),
  rest.delete('http://localhost/api/v1/favorites', (req, res, ctx) => res(ctx.json(
    {
      message: 'Post deleted from favorites',
    },
  ))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Post', () => {
  it('make request and render post inner components', async () => {
    const { getByTestId, getByAltText, getByText } = render(<Post />, { user: { token: null } });
    await waitFor(() => expect(getByTestId('user-avatar')).toBeInTheDocument());
    expect(getByAltText('Post backdrop')).toBeInTheDocument();
    expect(getByText('Janessa')).toBeInTheDocument();
    expect(getByTestId('location')).toBeInTheDocument();
    expect(getByTestId('description')).toBeInTheDocument();
  });

  describe('add to favorites button', () => {
    it('render if user logged in', async () => {
      const { getByTestId } = render(<Post />, { user: { token: 'authToken' } });
      await waitFor(() => expect(getByTestId('user-avatar')).toBeInTheDocument());
      expect(getByTestId('favorite-button')).toBeInTheDocument();
    });
    it('does not render if no user', async () => {
      const { getByTestId, queryByTestId } = render(<Post />, { user: { token: null } });
      await waitFor(() => expect(getByTestId('user-avatar')).toBeInTheDocument());
      expect(queryByTestId('favorite-button')).not.toBeInTheDocument();
    });
    
  });
});
