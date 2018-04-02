import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Responsive, Container } from 'semantic-ui-react';
import brand from '../CITY-LOGO.png';

const Header = ({ children }) => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item>
        <Link to="/" title="Home">
          <Image src={brand} alt="City Logo" size="mini" />
        </Link>
      </Menu.Item>
      <Responsive as={Menu.Item} minWidth={768}>
        {children}
      </Responsive>
    </Container>
  </Menu>
);

export default Header;
