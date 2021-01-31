import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignIn(props) {
  const history = useHistory();
  const { auth } = props;
  const { loading } = auth;

  // const dispatch = useDispatch();
  // console.log(props);
  const handleSubmit = ({ email, password }) => {
    props.signInRequest(email, password);
    history.push('/dashboard');
  };

  return (
    <>
      <img src={logo} alt="gobarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar Conta Gratuita</Link>
      </Form>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInRequest: (email, password) => {
      dispatch(signInRequest(email, password));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
