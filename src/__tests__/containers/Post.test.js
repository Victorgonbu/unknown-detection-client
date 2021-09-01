import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, reduxStore, getByAltText,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Post from '../../components/containers/Post';
import '../../utils/icons';

/* eslint-disable react/display-name */
jest.mock('../../components/presentationals/UserAvatar', () => () => <div data-testid="user-avatar" />);
jest.mock('../../components/presentationals/Location', () => () => <div data-testid="location" />);
jest.mock('react-router-dom',() => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({state: {id: 1}}),
}));

const requestResponse = {
  data:{
    id: '1',
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
            id: "92",
            type: "favorite"
          }
        ]
      },
    },
  }, 
  included: [
    {
      id: "18",
      type: "user",
      attributes: {
        name: "Janessa"
      }
    }
  ]
};

const server = setupServer(
  rest.get('http://localhost/api/v1/posts/1', (req, res, ctx) => res(ctx.json(
    requestResponse,
  ))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close())

describe('Post', () => {
  it('make request and render post inner components', async () => {
    const {getByTestId, getByAltText, getByText} = render(<Post/>, {user: {token: 'fasfasdfd'}});
    await waitFor(() => expect(getByTestId('user-avatar')).toBeInTheDocument());
    expect(getByAltText('Post backdrop')).toBeInTheDocument();
    expect(getByText('Janessa')).toBeInTheDocument();
    expect(getByTestId('location')).toBeInTheDocument();
  });
});