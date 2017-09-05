import styled from 'styled-components'
import closeIcon from 'assets/img/close-icon.svg'

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  pointer-events: none;
`

export const AlertError = styled.div`
  pointer-events: all;
  position: relative;
  z-index: 10;
  display: block;
  align-self: center;
  padding: 10px 40px 10px 15px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.5);
  background-color: #EDC8C4;
`

export const AlertSuccess = styled.div`
  pointer-events: all;
  position: relative;
  z-index: 10;
  display: block;
  align-self: center;
  padding: 10px 40px 10px 15px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.5);
  background-color: #DEF3D5;
`

export const Close = styled.div`
  position: absolute;
  right: 7px;
  top: 7px;
  width: 27px;
  height: 27px;
  background: url(${closeIcon}) center center no-repeat;
  cursor: pointer;
  user-select: none;
  opacity: 1;
  transition: opacity linear 200ms;
  &:hover {
    opacity: 0.5;
  }
`
