import React from 'react'
import { Service } from 'store/records'
import _ from 'underscore'
import moment from 'moment'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { Icon } from 'react-fa'
import classNames from 'classnames'

export default class BookingTab extends React.Component {
  state = {
    bookings: [],
    selectedService: {},
    description: '',
    showInfoModal: false,
    showTiresModal: false
  }

  filterBookings (bookings, currentDate, slotNumber) {
    return bookings.filter(({ date, slot }) => {
      const bookingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      currentDate = new Date(currentDate.getFullYear(), date.getMonth(), currentDate.getDate())

      return bookingDate.getTime() === currentDate.getTime() && slot === slotNumber
    })
  }

  addBooking (service) {
    if (service.type !== 'tires') {
      this.book(service)
    } else {
      this.setState({ selectedService: service, showTiresModal: true })
    }
  }

  book (service, storedWithAutospa = false) {
    this.setState({ showTiresModal: false })
    service = new Service(service)
    let { date, hour, location } = this.props
    let added = false
    date = moment(date).set({
      hour: hour.getHours(),
      minute: hour.getMinutes(),
      second: 0,
      millisecond: 0
    })

    if (service.type === 'tires' && storedWithAutospa) {
      date.add(2, 'days')
      const opensAt = location.workingHoursRange(date.toDate())[0]
      date.set({ hour: opensAt.getHours(), minute: opensAt.getMinutes() })
    }
    date = date.toDate()

    const lastBooking = this.state.bookings
      .filter(x =>
        x.addedByUser &&
        x.date.getFullYear() === date.getFullYear() &&
        x.date.getMonth() === date.getMonth() &&
        x.date.getDay() === date.getDay()
      ).pop()
    let startTime = new Date(date)
    if (lastBooking) {
      const duraction = parseInt(lastBooking.service.time) + 15
      startTime = moment(lastBooking.date).add(duraction, 'minutes').toDate()
    }

    const _ = [...Array(parseInt(location.slots))].some((__, slot) => {
      slot++
      let bookings = this.filterBookings(this.state.bookings, date, slot)
      const currentBooking = { date: startTime, slot, service, addedByUser: true }
      bookings.push(currentBooking)

      if (location.isAvailable(startTime, bookings)) {
        this.setState(({ bookings }) => {
          bookings.push(currentBooking)
          return { bookings, currentService: null }
        })

        added = true
        return true
      }
    })

    if (!added) {
      alert('slots are not available, please select different time.')
    }
  }

  renderInfoModal () {
    return (
      <div className={classNames('modal', { 'is-active': this.state.showInfoModal })}>
        <div className='modal-background' />
        <div className='modal-content'>
          <p style={{ color: '#fff' }}>
            {this.state.description}
          </p>
        </div>
        <button onClick={() => this.setState({ showInfoModal: false })} className='modal-close'></button>
      </div>
    )
  }

  renderTiresModal () {
    return (
      <div className={classNames('modal', { 'is-active': this.state.showTiresModal })}>
        <div className='modal-background' />
        <div className='modal-card'>
          <section className='modal-card-body'>
            <strong>Ovatko renkaat Autospan varastossa?</strong>
            <br />
            Renkaiden vaihto vaatii väh. 2 vrk renkaiden toimittamiseksi toimipisteeseen.
          </section>
          <footer className='modal-card-foot'>
            <a
              onClick={this.book.bind(this, this.state.selectedService, true)}
              className='button is-success'
              >
              Kyllä
            </a>
            <a
              onClick={this.book.bind(this, this.state.selectedService, false)}
              className='button'
              >
              Ei
            </a>
          </footer>
        </div>
      </div>
    )
  }

  render () {
    const groupedServices = _.groupBy(this.props.services.toJS(), service => service.typeName)
    const bookings = this.state.bookings.filter(x => x.addedByUser)
    const totalTime = bookings.reduce((a, b) => { return a + parseInt(b.service.time) }, 0)
    const totalPrice = bookings.reduce((a, b) => { return a + parseInt(b.service.price) }, 0)

    return (
      <Wrapper>
        { this.renderInfoModal() }
        { this.renderTiresModal() }
        { bookings.length > 0 &&
          <div style={{border: '1px solid #40B982'}}>
            <GreenTitle>Valittu palvelu</GreenTitle>
            <SelectedList>
              { bookings.map(({ date, service }) =>
                <div key={'bookinged' + new Date().getTime() + service.id}>
                  <strong>{service.name}</strong>
                  <p>
                    Aika: { moment(date).format('DD-YY hh:mm')}
                  </p>
                </div>
              )}
              <br />
              <p>Yhteensä: Aika: {totalTime}</p>
              <p>Yhteensä: Hinta: {totalPrice} €</p>

              <BookButton onClick={() => this.props.onSelect(bookings)}>Vahvista</BookButton>
            </SelectedList>
          </div>
        }
        { Object.keys(groupedServices).map(key =>
          <div key={key}>
            <Title>{key}</Title>
            { groupedServices[key].map(service =>
              <ServiceContainer key={service.id}>
                <NameContainer>
                  <ServiceName>{service.name}</ServiceName>
                  <FontAwesome
                    onClick={() => this.setState({ description: service.description, showInfoModal: true })}
                    style={{ cursor: 'pointer' }}
                    name='question'
                  />
                </NameContainer>
                <p>{service.time}</p>
                <Price>{service.price} €</Price>
                <BookButton onClick={() => this.addBooking(service)}>Varaa</BookButton>
              </ServiceContainer>
            )}
          </div>
        )}
        <LogoContainer>
          <img src={require('assets/img/logo.png')} style={{marginTop: 40}} />
        </LogoContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`

`
const Title = styled.div`
  height: 35px;
  background-color: #D1EDEC;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
`
const GreenTitle = styled.div`
  height: 35px;
  color: #fff;
  background-color: #40B982;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
`
const ServiceContainer = styled.div`
  padding: 10px;
  height: 55px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: #EAF3F3;
  }
`
const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 290px;
`
const ServiceName = styled.p`
  font-weight: bold;
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
const Price = styled.p`
  color: green;
`
const SelectedList = styled.div`
  padding: 5px;
`
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`
