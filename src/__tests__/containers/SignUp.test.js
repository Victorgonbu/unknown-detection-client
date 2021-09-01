import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, reduxStore,
} from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../../components/containers/SignUp';

/* eslint-disable react/display-name */
jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  TextField: () => <input data-testid="text-field" />,
  FormControl: () => <div data-testid="form-control" />,
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const requestResponse = {
  name: 'victor',
  email: 'victor@victor.com',
  token: 'afela234',
};

const server = setupServer(
  rest.post('http://localhost/api/v1/users', (req, res, ctx) => res(ctx.json(
    requestResponse,
  ))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SignUp', () => {
  const initialState = {
    user: {
      name: null,
    }
  };
  it('render signup form with fields and title', () => {
    const {getByTestId, getAllByTestId} = render(<SignUp/>, initialState);
    expect(getAllByTestId('text-field').length).toBe(2);
    expect(getAllByTestId('form-control').length).toBe(2);
    expect(getByTestId('button')).toBeInTheDocument();
  });

  describe('when submit button is clicked', () => {
    it('dispatch action to redux store if valid credentials', async () => {
      const {getByTestId} = render(<SignUp/>, initialState);
      const submitButton = getByTestId('button');
      fireEvent.click(submitButton);
      const actions = reduxStore.getActions();
      await waitFor(() => expect(actions.length).toBe(1));
      expect(actions[0]).toEqual({type: 'SET_USER', payload: requestResponse});
    });

    it('render error messages if invalid credentials', async () => {
      server.use(rest.post('http://localhost/api/v1/users', (req, res, ctx) => res(
        ctx.status(404),
        ctx.json({
          errors: ['Invalid credentials']
        }),
      )));
      const {getByText, getByTestId} = render(<SignUp/>, initialState);
      const submitButton = getByTestId('button');
      fireEvent.click(submitButton);
      await waitFor(() => expect(getByText('Invalid credentials')).toBeInTheDocument());
      
    });
  });

  it('redirect to Posts route if user already sign in', () => {
    initialState.user.name = "victor";
    render(<SignUp/>, initialState);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/posts');
  });

});