import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Delete, Get, Post } from '../api/requests';
import App from '../App';
import MockConstants from './helpers/MockConstant';
import renderWithRouter from './helpers/renderWithRouters';
import { adminGetusersMock, adminUserMock } from './mocks/usersMock';

jest.mock('../api/requests');

const THREE = 3;
const ADMIN_ROUTE = '/admin/manage';

describe('Testing screen AdmPage', () => {
  const usernamesElements = async () => screen.findAllByTestId(
    /^admin_manage__element-user-table-name-\d+$/,
  );

  beforeEach(() => { localStorage.setItem('user', JSON.stringify(adminUserMock)); });

  it('Its possible to create a user with success', async () => {
    const newUserMock = {
      id: 3,
      name: MockConstants.VALID_NAME,
      email: MockConstants.VALID_EMAIL,
      role: 'customer',
    };

    Get
      .mockResolvedValueOnce(adminGetusersMock)
      .mockResolvedValueOnce([...adminGetusersMock, newUserMock]);
    Post.mockResolvedValueOnce({});

    renderWithRouter(<App />, ADMIN_ROUTE);

    const nameInput = screen.getByTestId(MockConstants.ADMIN_REGISTER_NAME_TEST_ID);
    const emailInput = screen.getByTestId(MockConstants.ADMIN_REGISTER_EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(
      MockConstants.ADMIN_REGISTER_PASSWORD_TEST_ID,
    );
    const roleSelect = screen.getByTestId(MockConstants.ADMIN_REGISTER_ROLE_TEST_ID);
    const registerBtn = screen.getByTestId(MockConstants.ADMIN_REGISTER_BTN);

    expect(await usernamesElements()).toHaveLength(2);
    expect(registerBtn).toBeDisabled();

    userEvent.type(nameInput, MockConstants.VALID_NAME);
    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    userEvent.selectOptions(roleSelect, 'customer');

    expect(registerBtn).toBeEnabled();

    userEvent.click(registerBtn);

    await waitFor(async () => {
      expect(await usernamesElements()).toHaveLength(THREE);
    });
  });
  it('Its possible to delete a user with success', async () => {
    Get
      .mockResolvedValueOnce(adminGetusersMock)
      .mockResolvedValueOnce([adminGetusersMock[0]]);
    Delete.mockResolvedValueOnce({});

    renderWithRouter(<App />, ADMIN_ROUTE);

    const deleteBtn = await screen.findByTestId(
      MockConstants.ADMIN_DELETE_USER_BTN_TEST_ID,
    );

    expect(await usernamesElements()).toHaveLength(2);

    userEvent.click(deleteBtn);

    await waitFor(async () => {
      expect(await usernamesElements()).toHaveLength(1);
    });
  });
  it('Unable to register an user who is already registered', async () => {
    const httpResponseMock = {
      status: 409,
      message: 'Usuário já foi registrado',
    };

    Get.mockResolvedValueOnce(adminGetusersMock);
    Post.mockRejectedValueOnce(httpResponseMock);

    renderWithRouter(<App />, ADMIN_ROUTE);

    const nameInput = screen.getByTestId(MockConstants.ADMIN_REGISTER_NAME_TEST_ID);
    const emailInput = screen.getByTestId(MockConstants.ADMIN_REGISTER_EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(
      MockConstants.ADMIN_REGISTER_PASSWORD_TEST_ID,
    );
    const roleSelect = screen.getByTestId(MockConstants.ADMIN_REGISTER_ROLE_TEST_ID);
    const registerBtn = screen.getByTestId(MockConstants.ADMIN_REGISTER_BTN);

    expect(registerBtn).toBeDisabled();

    userEvent.type(nameInput, MockConstants.VALID_NAME);
    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    userEvent.selectOptions(roleSelect, 'seller');

    expect(registerBtn).toBeEnabled();

    userEvent.click(registerBtn);

    const errorMessage = await screen
      .findByTestId(MockConstants.ADMIN_INVALID_REGISTER_ELEMENT);

    expect(errorMessage).toBeInTheDocument();
  });
});
