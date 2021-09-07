import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, reduxStore,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Login from '../../components/containers/Login';

const mockNavigate = jest.fn();
/* eslint-disable react/display-name */
jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  TextField: () => <input data-testid="text-field" />,
  FormControl: () => <div data-testid="form-control" />,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const requestResponse = {
  data: {
    attributes: {
      name: 'victor',
      email_name: 'victor@victor.com',
      token: 'afela234',
    },
  },
};

const server = setupServer(
  rest.post(`${process.env.REACT_APP_API_URL}/api/v1/authentication`, (req, res, ctx) => res(ctx.json(
    requestResponse,
  ))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Login', () => {
  const initialState = {
    user: {
      name: null,
    },
  };

  it('render title with form fields and errors components', () => {
    const { getByText, getByTestId } = render(<Login />, initialState);
    expect(getByText('Log In')).toBeInTheDocument();
    expect(getByTestId('errors')).toBeInTheDocument();
    expect(getByTestId('text-field')).toBeInTheDocument();
    expect(getByTestId('form-control')).toBeInTheDocument();
  });

  describe('Attempt to log in', () => {
    it('dispatch async action to redux store', async () => {
      const { getByTestId } = render(<Login />, initialState);
      const submit = getByTestId('button');
      fireEvent.click(submit);
      const actions = reduxStore.getActions();
      await waitFor(() => expect(actions.length).toBe(1));
      expect(actions[0]).toEqual({ type: 'SET_USER', payload: requestResponse.data.attributes });
    });

    it('render error list if invalid credentials', async () => {
      server.use(rest.post(`${process.env.REACT_APP_API_URL}/api/v1/authentication`, (req, res, ctx) => res(
        ctx.status(422),
        ctx.json({
          errors: ['invalid credentials'],
        }),
      )));
      const { getByTestId, getByText } = render(<Login />, initialState);
      const submit = getByTestId('button');
      fireEvent.click(submit);
      await waitFor(() => expect(getByText('invalid credentials')).toBeInTheDocument());
      expect(getByText('invalid credentials')).toBeInTheDocument();
    });

    it('redirects to posts route if user already logged in', async () => {
      initialState.user.name = 'victor';
      render(<Login />, initialState);
      await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
      expect(mockNavigate).toHaveBeenCalledWith('/posts');
    });
  });
});
