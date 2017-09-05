import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Footer from '../Footer'

export default class ConfirmationTab extends React.Component {
  render () {
    const { bookings, location } = this.props
    const totalTime = bookings.reduce((a, b) => { return a + parseInt(b.service.time) }, 0)
    const totalPrice = bookings.reduce((a, b) => { return a + parseInt(b.service.price) }, 0)
    return (
      <Wrapper>
        <Header>Kiitos, ole hyvä ja vahvista tilausta</Header>
        <LocationContainer>
          <Title>{location.name}</Title>
          {location.address}
        </LocationContainer>
        <br />
        <div>
          { bookings.map(({ service, date }) =>
            <div key={'bookinged' + new Date().getTime() + service.id}>
              <strong>{service.name}</strong>
              <p> Aika: { moment(date).format('DD-YY hh:mm')} </p>
            </div>
          )}
          <br />
          <p>Yhteensä: Aika: {totalTime}</p>
          <p>Yhteensä: Hinta: {totalPrice} €</p>
        </div>
        <br />
        <br />
        <BookButton onClick={() => this.props.onSelect()}>Varaa nyt</BookButton>
        <Footer />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const BookButton = styled.button`
  background-color: #0DB982;
  border-bottom: 1px solid #484848 !important;
  color: #fff;
  text-shadow: 0px 1px 1px #6c6c6c !important;
  box-shadow: 0px 0px 1px #484848;
  width: 80px;
  border-radius: 6px;
  font-size: 16px;
  padding: 0;
  border-width: 0px;
  &:hover {
    background-color: #F8B333;
  }
`
const LocationContainer = styled.div`
`
const Title = styled.div`
  color: #17B4DB;
  font-weight: bold;
  font-size: 18px;
`
const Header = styled.div`
  color: #1458AC;
  font-size: 28px;
  width: 100%;
  text-align: center;
`
