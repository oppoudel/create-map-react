import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Input, Responsive } from 'semantic-ui-react'
import brand from '../CITY-LOGO.png'

const Header = ({ children }) => (
  <Menu inverted>
    <Menu.Item>
      <Link to="/" title="Home">
        <img src={brand} alt="City Logo" height="30px" />
      </Link>
    </Menu.Item>
    <Responsive as={Menu.Item} minWidth={768}>
      {children}
    </Responsive>

    <Menu.Menu position="right">
      <Menu.Item>
        <Input icon="search" placeholder="Search..." />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
)

export default Header
