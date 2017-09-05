import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
  margin-top: 20px;
`

export const SettingsContainer = styled.div`
  flex: 1;
  text-align: left;
`

export const LogoContainer = styled.div`
  flex: 1;
  text-align: center;
`

export const LighteningContainer = styled.div`
  flex: 1;
  text-align: right;
`

export const SettingsIcon = styled.img`
  width: 30px;
  height: 30px;
  padding-left: 20px;
  cursor: pointer;
`

export const LighteningIcon = styled.img`
  width: 20px;
  height: 35px;
  padding-right: 20px;
`

export const Logo = styled.img`
  align-self: center;
  width: 210px;
  height: 40px;
`

export const MenuContainer = styled.div`
  margin-left: 20px;
  margin-top: 5px;
  position: absolute;
  width: 150px;
  background-color: #cecece;
`
export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export const MenuItem = styled.div`
  padding: 5px;
  &:hover {
    background-color: #f9f9f9;
  }
`
