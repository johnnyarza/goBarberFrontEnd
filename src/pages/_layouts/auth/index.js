import React from 'react';

import PropTypes from 'prop-types';
import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

// PropTypes.element.isRequired é a associado a um elemento que vem com tag
// neste caso os children geralmente vem como elementos de tag
