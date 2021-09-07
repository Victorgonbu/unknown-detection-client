import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, reduxStore,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Posts from '../../components/containers/Posts';

/* eslint-disable react/display-name */
jest.mock('react-multi-carousel', () => () => <div data-testid="carousel" />);

const mockNavigate = jest.fn();
const mockLocation = { search: '' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

const postsResponse = {
  data: [
    {
      id: '1',
      title: 'post title',
      description: 'post description',
      location: 'post location',
    },
  ],
};

const server = setupServer(
  rest.get(`${process.env.REACT_APP_API_URL}/api/v1/posts`, (req, res, ctx) => res(ctx.json(
    postsResponse,
  ))),
  rest.get(`${process.env.REACT_APP_API_URL}/api/v1/favorites`, (req, res, ctx) => res(ctx.json(
    postsResponse,
  ))),

);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Posts', () => {
  const initialState = {
    posts: {
      all: [
        {
          id: '1',
          attributes: {
            title: 'post 1',
            description: 'description',
            favorite: null,
            image: 'image',
            location: 'location',
          },
        },
      ],
    },
    user: {
      name: null,
    },
  };

  describe('First render', () => {
    it('render Carousel with all posts from initial state', () => {
      const { getByTestId } = render(<Posts />, initialState);
      expect(getByTestId('carousel')).toBeInTheDocument();
    });

    describe('dispatch action to redux store', () => {
      it('retrieve all posts', async () => {
        render(<Posts />, initialState);
        const actions = reduxStore.getActions();
        await waitFor(() => expect(actions.length).toBe(2));
        expect(actions[0]).toEqual({ type: 'SET_CURRENT_PATH_NAME', payload: 'Unknown Detections' });
        expect(actions[1]).toEqual({ type: 'SET_POSTS', payload: postsResponse.data });
      });

      it('retrieve all post matching search query', async () => {
        mockLocation.search = '?search query';
        render(<Posts />, initialState);
        const actions = reduxStore.getActions();
        await waitFor(() => expect(actions.length).toBe(2));
        expect(actions[0]).toEqual({ type: 'SET_CURRENT_PATH_NAME', payload: '"search query"' });
        expect(actions[1]).toEqual({ type: 'SET_POSTS', payload: postsResponse.data });
      });

      describe('retrieve all favorite posts', () => {
        it('when user logged in', async () => {
          mockLocation.search = '';
          initialState.user.name = 'victor';
          render(<Posts favoriteOnly />, initialState);
          const actions = reduxStore.getActions();
          await waitFor(() => expect(actions.length).toBe(2));
          expect(actions[0]).toEqual({ type: 'SET_CURRENT_PATH_NAME', payload: 'Favorites' });
          expect(actions[1]).toEqual({ type: 'SET_POSTS', payload: postsResponse.data });
        });

        it('redirects to login if no user', () => {
          initialState.user.name = null;
          render(<Posts favoriteOnly />, initialState);
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
      });
    });
  });

  describe('render errors', () => {
    it('when unable to hit API', async () => {
      server.use(rest.get(`${process.env.REACT_APP_API_URL}/api/v1/posts`, (req, res, ctx) => res(ctx.status(500))));
      const { getByText } = render(<Posts />, initialState);
      await waitFor(() => expect(getByText('Unable to fetch from API, please try again in 20 seconds')).toBeInTheDocument());
    });
    it('when no matches are retrieved from search', async () => {
      server.use(rest.get(`${process.env.REACT_APP_API_URL}/api/v1/posts`, (req, res, ctx) => res(
        ctx.status(404),
        ctx.json({
          errors: ['No matches found'],
        }),
      )));
      const { getByText } = render(<Posts />, initialState);
      await waitFor(() => expect(getByText('No matches found')).toBeInTheDocument());
    });

    it('when no posts are retrieved', async () => {
      server.use(rest.get(`${process.env.REACT_APP_API_URL}/api/v1/posts`, (req, res, ctx) => res(
        ctx.json({
          data: [],
        }),
      )));
      const { getByText } = render(<Posts />, initialState);
      await waitFor(() => expect(getByText('No posts added yet')).toBeInTheDocument());
    });
  });
});
