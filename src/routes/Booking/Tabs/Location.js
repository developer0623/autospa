import React from 'react'
import styled from 'styled-components'

export default class LocationTab extends React.Component {
  render () {
    return (
      <Wrapper>
        { this.props.locations.map(location =>
          <Container>
            <Title>{location.name}</Title>
            <h2>{location.address}</h2>
            <br />
            <br />
            <Button onClick={() => this.props.onSelect(location)}>
              Valitse
            </Button>
          </Container>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  width: 450px;
  height: 200px;
  border: 2px solid #F5F5F5;
  padding: 20px;
  margin-right: 10px;
  margin-top: 10px;
  background-color: #F7F7F7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  color: #17B4DB;
  font-weight: bold;
  font-size: 18px;
`
const Button = styled.button`
  background-color: #0DB982;
  border: 0px;
  color: #fff;
  width: 100px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
`
