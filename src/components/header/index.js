import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '~/assets/logo-purple.svg';

import { Container, Content, Profile } from './styles';
import Notifications from '../Notifications/index';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gobarber" />
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://avatars.dicebear.com/4.5/api/male/joh.svg?w=50&h=50&mood[]=surprised'
              }
              alt=""
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
