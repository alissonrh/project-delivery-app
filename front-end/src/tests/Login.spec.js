import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axios from 'axios';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouters';
import MockConstants from './helpers/MockConstant';
// import { Post } from '../api/requests';
import api from '../api/requests';

// const axios = require('axios').default;

jest.mock('axios');

describe('Testing screen Login', () => {
  it('Trying to access the route /', async () => {
    // axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    const { history: { pathname } } = renderWithRouter(<App />, '/login');

    expect(pathname).toBe('/login');
  });

  it('Expect to all the elements to be rendering in the document', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId(MockConstants.BTN_TEST_ID);
    const registerBtn = screen.getByTestId(MockConstants.LOGIN_REGISTER_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it('Testing the fields from input', async () => {
    renderWithRouter(<App />, '/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);

    userEvent.type(inputEmail, MockConstants.VALID_EMAIL);
    userEvent.type(inputPassword, MockConstants.VALID_PASSWORD);

    expect(inputEmail).toHaveValue(MockConstants.VALID_EMAIL);
    expect(inputPassword).toHaveValue(MockConstants.VALID_PASSWORD);
  });

  it(`The button to submit is only habilited when have a
    email and password valided`, async () => {
    const { history } = renderWithRouter(<App />, '/login');

    expect(history.pathname).toBe('/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const btnLogin = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(inputEmail, MockConstants.VALID_EMAIL);
    userEvent.type(inputPassword, MockConstants.VALID_PASSWORD);

    expect(btnLogin).toBeEnabled();
  });

  it(` Login button is not enabled when email
    are not typed properly`, async () => {
    renderWithRouter(<App />, '/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const btnLogin = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(inputEmail, 'teste');
    userEvent.type(inputPassword, MockConstants.VALID_PASSWORD);

    expect(btnLogin).not.toBeEnabled();
  });

  it(`Login button is not enabled when password
  are not typed properly`, async () => {
    renderWithRouter(<App />, '/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const btnLogin = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(inputEmail, MockConstants.VALID_EMAIL);
    userEvent.type(inputPassword, '123');

    expect(btnLogin).not.toBeEnabled();
  });

  it(`The button to register exists and forwards
  to the log route`, async () => {
    const { history } = renderWithRouter(<App />, '/login');

    const btnRegister = screen.getByTestId(MockConstants.LOGIN_REGISTER_BTN);

    expect(btnRegister).toBeEnabled();

    fireEvent.click(btnRegister);

    await waitFor(() => {
      expect(history.pathname).toBe('/register');
    });
  });
  it.only('Login with success', async () => {
    const httpResponseMock = {
      id: 1,
      name: MockConstants.VALID_NAME,
      email: MockConstants.VALID_EMAIL,
      role: 'customer',
      token: 'validtoken',
    };

    // jest.spyOn(api, 'post').mockResolvedValueOnce({ data: httpResponseMock });
    jest.spyOn(api, 'Post').mockResolvedValueOnce(httpResponseMock);
    // jest.spyOn(Post).mockImplementation(() => httpResponseMock);
    // jest.spyOn(axios, 'post').mockResolvedValueOnce(httpResponseMock);
    // Post = jest.fn().mockReturnValue(httpResponseMock);

    // axios.post.mockResolvedValue({ data: httpResponseMock });

    // const mockPost = jest.spyOn(axios, 'post');
    // mockPost.mockResolvedValue((url) => {
    //   switch (url) {
    //   case 'http://localhost:3001/login':
    //     return Promise.resolve({ data: httpResponseMock });
    //   default:
    //   }
    // });

    const { history } = renderWithRouter(<App />, '/login');

    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    userEvent.click(loginBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
    // expect(axios).toHaveBeenCalled();
  });
  it('The screen create a alert when user is not found', async () => {
    const httpResponseMock = {
      status: 404,
      message: 'User not found',
    };
    jest.spyOn(axios, 'post').mockResolvedValueOnce(httpResponseMock);

    renderWithRouter(<App />, '/login');

    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(emailInput, MockConstants.INVALID_EMAIL_1);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    fireEvent.click(loginBtn);

    const errorMessage = await screen
      .findByTestId('common_login__element-invalid-email');

    expect(errorMessage).toBeInTheDocument();
  });
});
