import React, { useContext, useEffect, useState } from 'react';
import { Get, Post } from '../../api/requests';
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
  const [disabled, setDisabled] = useState(true);
  const [users, setUsers] = useState([]);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await Get('/admin/manage'));
    };
    getUsers();
  });

  /* const reloadPage = () => window.location.reload(true); */

  const createUser = async (event) => {
    event.preventDefault();

    try {
      console.log({ email, password, name, role });
      await Post('/admin/manage', { email, password, name, role });
      /* alert('Usuário cadatrado com sucesso'); */
      console.log('entrou');
      setPassword('');
      setName('');
      setEmail('');
      /* reloadPage(); */
    } catch (error) {
      console.log(error);
      setFailedTryLogin(true);
    }
  };

  const validate = () => name.length >= MIN_NOME && password.length >= MIN_SENHA && /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    /* if (email && password && name && role) {
      setDisabled(false);
    } else {
      setDisabled(true);
    } */
    if (validate()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password, name, role]);

  return (
    <>
      <NavBarAdm />
      <div>
        CADASTRAR NOVO USUÁRIO
        <form>
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
            type="button"
            onClick={ (event) => createUser(event) }
            disabled={ disabled }
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
      </div>
      <div>
        Lista de usários
        <div
          style={ {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
            marginLeft: '25%',
            marginRight: '25%',
          } }
        >
          <p>Item</p>
          <p>Nome</p>
          <p>E-mail</p>
          <p>Tipo</p>
          <p>Excluir</p>
        </div>
        <div>
          {
            (users.length > 0)
              ? (
                users.map((user, index) => (
                  <User user={ user } index={ index } key={ index } />
                ))
              )
              : null
          }
        </div>
      </div>
    </>
  );
}

export default AdmPage;
