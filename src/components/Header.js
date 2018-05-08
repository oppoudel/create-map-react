import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Container } from 'semantic-ui-react';
import brand from '../CITY-LOGO.png';

class Header extends Component {
  state = { open: false };
  render() {
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item>
            <Link to="/" title="Home">
              <Image src={brand} alt="City Logo" size="mini" />
            </Link>
          </Menu.Item>
          {this.props.children}
        </Container>
      </Menu>
    );
  }
}

export default Header;
