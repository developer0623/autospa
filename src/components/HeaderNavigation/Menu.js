import React from 'react'
import {
  MenuContainer,
  MenuItem,
  StyledLink
} from './Styles'

const Menu = () => {
  return (
    <MenuContainer>
      <StyledLink to='/accounts'>
        <MenuItem>accounts</MenuItem>
      </StyledLink>
      <StyledLink to='/services'>
        <MenuItem>services</MenuItem>
      </StyledLink>
      <StyledLink to='/locations'>
        <MenuItem>locations</MenuItem>
      </StyledLink>
    </MenuContainer>
  )
}

export default Menu
