import React, { useContext, useEffect, useState } from 'react';
import { Delete, Get, Post } from '../../api/requests';
import EmailInput from '../../components/EmailInput';
import NameInput from '../../components/NameInput';
import NavBarAdm from '../../components/NavBarAdm';
import PasswordInput from '../../components/PasswordInput';
import SelectAdm from '../../components/SelectAdm';
import User from '../../components/User';
import LoginContext from '../../context/LoginContext';

function AdmPage() {
  const MIN_SENHA = 6;
  const MIN_NOME = 12;
  const { email, setEmail, password, setPassword, role } = useContext(LoginContext);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const getUsers = async () => {
    setUsers(await Get('/admin/manage'));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    await Delete(`admin/manage/${id}`);
    getUsers();
  };

  const createUser = async (event) => {
    event.preventDefault();

    try {
      await Post('/admin/manage', { email, password, name, role });

      setPassword('');
      setName('');
      setEmail('');
      getUsers();
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  const validate = () => name.length >= MIN_NOME && password.length >= MIN_SENHA && /\S+@\S+\.\S+/.test(email);

  return (
    <>
      <NavBarAdm />
      <h1
        className="text-2xl my-5"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        CADASTRAR NOVO USUÁRIO
      </h1>
      <form
        className="border-2 p-3 shadow-2xl grid
        grid-cols-5 gap-6 my-3
        text-lg"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        <NameInput
          nameform={ name }
          setName={ setName }
          dataTestid="admin_manage__input-name"
        />
        <EmailInput
          emailform={ email }
          setEmail={ setEmail }
          dataTestid="admin_manage__input-email"
        />
        <PasswordInput
          passwordform={ password }
          setPassword={ setPassword }
          dataTestid="admin_manage__input-password"
        />
        <SelectAdm />
        <button
          className={
            `${!validate()
              ? 'opacity-40'
              : 'opacity-100'}
          text-xl my-1 bg-[#036B52] text-white p-1 text-center rounded`
          }
          type="button"
          onClick={ (event) => createUser(event) }
          disabled={ !validate() }
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
        {
          (failedTryLogin)
            ? (
              <p data-testid="admin_manage__element-invalid-register">
                {
                  `O endereço de e-mail já existe no banco de dados.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
      </form>
      <h1
        className="text-2xl my-5"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        Lista de usários
      </h1>
      <article
        className="border-2 p-3 shadow-2xl"
        style={ {
          marginLeft: '10%',
          marginRight: '10%',
        } }
      >
        <div
          className="grid grid-cols-7 text-center"
        >
          <p>Item</p>
          <p
            className="col-span-2"
          >
            Nome

          </p>
          <p
            className="col-span-2"
          >
            E-mail

          </p>
          <p>Tipo</p>
          <p>Excluir</p>
        </div>
        {
          (users.length > 0)
            ? (
              users.map((user, index) => (
                <div
                  className="grid grid-cols-7
                     text-center items-center justify-center my-3
            text-lg"
                  key={ index }
                >
                  <User
                    user={ user }
                    index={ index }
                    handleDelete={ handleDelete }
                  />

                </div>

              ))
            )
            : null
        }
      </article>
    </>
  );
}

export default AdmPage;
