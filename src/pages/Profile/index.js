import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';

import AvatarInput from './AvatarInput/index';
import { Container } from './styles';

function Profile(props) {
  const history = useHistory();

  const profile = useSelector((state) => state.user.profile);

  const handleSubmit = (data) => {
    props.updateProfileRequest(data);
  };

  const handleSignOut = () => {
    props.signOut();
    history.push('/');
  };
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu e-email" />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confrimação de senha"
        />
        <button type="submit">Atualizar Perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileRequest: (data) => {
      dispatch(updateProfileRequest(data));
    },
    signOut: () => {
      dispatch(signOut());
    },
  };
};
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
