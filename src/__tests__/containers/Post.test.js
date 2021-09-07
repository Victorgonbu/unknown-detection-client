import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, reduxStore,
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

const server = setupServer(
  rest.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/1`, (req, res, ctx) => res(ctx.json(
    requestResponse,
  ))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('../../components/presentationals/UserAvatar', () => () => <div data-testid="user-avatar" />);
jest.mock('../../components/presentationals/Location', () => () => <div data-testid="description" />);
jest.mock('../../components/presentationals/Description', () => () => <div data-testid="location" />);

describe('Post', () => {
  const initialState = {
    posts: {
      current: {
        image: 'image.png',
        title: 'post title',
        description: 'post description',
        location: 'post location',
        favorite: null,
      },
      favoritesCounter: 1,
      author: { name: 'victor' },
    },
    user: {
      token: null,
    },
  };
  it('make request and render post inner components', async () => {
    const { getByTestId, getByAltText, getByText } = render(<Post />, initialState);
    await waitFor(() => expect(getByTestId('user-avatar')).toBeInTheDocument());
    expect(getByAltText('Post backdrop')).toBeInTheDocument();
    expect(getByText('victor')).toBeInTheDocument();
    expect(getByTestId('location')).toBeInTheDocument();
    expect(getByTestId('description')).toBeInTheDocument();
  });

  it('render error message if unable to fetch from API', async () => {
    server.use(rest.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/1`, (req, res, ctx) => res(ctx.status(500))));
    const { getByText } = render(<Post />, initialState);
    await waitFor(() => expect(getByText('Unable to fetch Post')).toBeInTheDocument());
  });

  describe('add to favorites button', () => {
    it('dispatch actions to redux store when clicked', async () => {
      render(<Post />, initialState);
      const actions = reduxStore.getActions();
      await waitFor(() => expect(actions.length).toBe(4));
      expect(actions[0]).toEqual({
        type: 'SET_CURRENT_PATH_NAME',
        payload: requestResponse.data.attributes.title,
      });
      expect(actions[1]).toEqual({
        type: 'SET_CURRENT_POST',
        payload: requestResponse.data.attributes,
      });
      expect(actions[2]).toEqual({
        type: 'SET_CURRENT_AUTHOR',
        payload: requestResponse.included[0].attributes,
      });
      expect(actions[3]).toEqual({ type: 'SET_FAVORITES_COUNTER', payload: 1 });
    });
    it('does not render if no user', async () => {
      const { getByTestId, queryByTestId } = render(<Post />, initialState);
      await waitFor(() => expect(getByTestId('user-avatar')).toBeInTheDocument());
      expect(queryByTestId('favorite-button')).not.toBeInTheDocument();
    });

    it('render if user logged in', async () => {
      initialState.user.token = 'token';
      const { getByTestId } = render(<Post />, initialState);
      await waitFor(() => expect(getByTestId('user-avatar')).toBeInTheDocument());
      expect(getByTestId('favorite-button')).toBeInTheDocument();
    });
  });
});
