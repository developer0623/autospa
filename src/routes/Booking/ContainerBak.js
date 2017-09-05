import React from 'react'
import { connect } from 'react-redux'
import { LocationActions, ServiceActions, BookingActions } from 'store/actions'
import { LocationSelectors, ServiceSelectors, UserSelectors, BookingSelectors } from 'store/selectors'
import { Service } from 'store/records'
import styled from 'styled-components'
import _ from 'underscore'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const mapState = state => ({
  locations: LocationSelectors.all(state),
  services: ServiceSelectors.list(state),
  currentUser: UserSelectors.current(state),
  bookings: BookingSelectors.list(state)
  // oldBookings: BookingSelectors.list(state)
})
const mapProps = { ...LocationActions, ...ServiceActions, ...BookingActions }
const enhancer = connect(mapState, mapProps)

class NewBookingContainer extends React.Component {
  state = {
    date: new Date(),
    hour: null,
    availableHours: [],
    bookings: [],
    location: {}
  }

  async componentDidMount () {
    await this.props.getLocations()
    await this.props.getServices()
    await this.props.getBookings(this.props.currentUser)

    const location = this.props.locations.first()
    const bookings = this.props.bookings.toJS()
      .filter(x => x.location.id === location.id)
      .map(booking => {
        return {
          date: new Date(booking.date),
          slot: booking.slot,
          service: new Service(booking.service),
          addedByUser: false
        }
    })

    this.setState({ bookings, location })
    this.dateChanged(moment())
  }

  dateChanged (date) {
    let availableHours = this.state.location.availableHours(date.toDate(), [])
    availableHours = availableHours.filter((_, i) => i % 6 === 0)
    this.setState({ availableHours, date: date.toDate() })
  }

  filterBookings (bookings, currentDate, slotNumber) {
    return bookings.filter(({ date, slot }) => {
      const bookingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      currentDate = new Date(currentDate.getFullYear(), date.getMonth(), currentDate.getDate())

      return bookingDate.getTime() === currentDate.getTime() && slot === slotNumber
    })
  }

  addBooking (service, storedWithAutospa = false) {
    service = new Service(service)
    let { date, hour } = this.state
    let location = this.state.location
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
      alert('slots is not available, please select different time.')
    }
  }

  confirm () {
    const { bookings } = this.state
    const location = this.state.location

    bookings.filter(x => x.addedByUser).map(({ date, service, slot }) => {
      const booking = {
        user: this.props.currentUser.id,
        service: service.id,
        location: location.id,
        date: date.getTime(),
        slot,
        isWashing: true,
        confirmed: true,
        createdAt: new Date().getTime()
      }
      this.props.createBooking(booking)
    })

    window.location.href = '/'
  }

  generateWorkingHours (location) {
    return (
      <WorkingHoursContainer>
        <WorkingHours>
          <strong>ma</strong>
          <h3>{location.opensAt} - {location.closesAt}</h3>
        </WorkingHours>
        <WorkingHours>
          <strong>ti</strong>
          <h3>{location.opensAt} - {location.closesAt}</h3>
        </WorkingHours>
        <WorkingHours>
          <strong>ke</strong>
          <h3>{location.opensAt} - {location.closesAt}</h3>
        </WorkingHours>
        <WorkingHours>
          <strong>to</strong>
          <h3>{location.opensAt} - {location.closesAt}</h3>
        </WorkingHours>
        <WorkingHours>
          <strong>pe</strong>
          <h3>{location.opensAt} - {location.closesAt}</h3>
        </WorkingHours>
        <WorkingHours>
          <strong>la</strong>
          <h3>{location.saturdayOpensAt} - {location.saturdayClosesAt}</h3>
        </WorkingHours>
        <WorkingHours>
          <strong>su</strong>
          { location.sundayOpensAt === '0'
            ? <h3>suljettu</h3>
            : <h3>{location.sundayOpensAt} - {location.sundayOpensAt}</h3>
          }
        </WorkingHours>
      </WorkingHoursContainer>
    )
  }

  render () {
    const location = this.state.location
    if (!location) return null
    const groupedServices = _.groupBy(this.props.services.toJS(), service => service.typeName)
    const bookings = this.state.bookings.filter(x => x.addedByUser)
    const totalTime = bookings.reduce((a, b) => { return a + parseInt(b.service.time) }, 0)
    const totalPrice = bookings.reduce((a, b) => { return a + parseInt(b.service.price) }, 0)

    return (
      <Wrapper>
        <Container>
          <Left>
            <h1><strong>{location.name}</strong></h1>
            <h2>{location.address}</h2>
            <Separator />
            <p>
              Autospa the difference is situated in a prime location in the
              center of a company providing services for the car. Services include.
              various washes and waxing, air conditioning maintenance, tire changes
              and windscreen repairs. Autospa located in the Q-Park Great Erottaja areas.
            </p>
            <br />
            <h3><strong>Palvelut</strong></h3>
            <Separator />
            { Object.keys(groupedServices).map(key =>
              <div key={key}>
                <Title>{key}</Title>
                { groupedServices[key].map(service =>
                  <ServiceContainer key={service.id}>
                    <ServiceName>{service.name}</ServiceName>
                    <p>{service.time}</p>
                    <Price>{service.price} €</Price>
                    <BookButton onClick={() => this.addBooking(service)}>Varaa</BookButton>
                  </ServiceContainer>
                )}
              </div>
            )}
          </Left>
          <Right>
            { bookings.length > 0 &&
              <div>
                <Title>Valittu palvelu</Title>
                { bookings.map(({ service }) =>
                  <div key={'bookinged' + new Date().getTime() + service.id}>
                    <p>{service.name}</p>
                  </div>
                )}
                <p>Total duraction: {totalTime}</p>
                <p>Total duraction: {totalPrice} €</p>

                <BookButton onClick={() => this.confirm()}>Confirm</BookButton>
                <Separator />
              </div>
            }
            <Map src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAB5kywdB3khwgp46s26cboEKBlU10Gy6g&q=${location.address}`} allowfullscreen />
            <Separator />
            <Title>Muu päivämäärä</Title>
            <DatePickerContainer>
              <DatePicker
                inline
                minDate={moment()}
                selected={moment(this.state.date)}
                onChange={date => this.dateChanged(date)}
              />
            <Table>
              <TableBody>
                { this.state.availableHours.map(date =>
                  <Tr
                    onClick={() => this.setState({ hour: date })}
                    key={new Date().getTime() + date.getTime()}
                    >
                    <td>{moment(date).format('hh:mm')}</td>
                  </Tr>
                )}
              </TableBody>
            </Table>
            </DatePickerContainer>
            <Title>Aukioloajat</Title>
            { this.generateWorkingHours(location) }
          </Right>
        </Container>
      </Wrapper>
    )
  }
}

export default enhancer(NewBookingContainer)

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`
const Container = styled.div`
  width: 90%;
  display: flex;
`
const Left = styled.div`
  height: 800px;
  flex: 3;
  border-right: 1px solid #E1E1E1;
  padding: 20px;
`
const Right = styled.div`
  height: 800px;
  flex: 2;
  padding: 20px;
`
const Separator = styled.div`
  border-bottom: 1px solid #E1E1E1;
  margin-top: 10px;
  margin-bottom: 10px;
`
const Map = styled.iframe`
  width: 100%;
  height: 200px;
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
const WorkingHoursContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WorkingHours = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
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
const ServiceName = styled.p`
  width: 290px;
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
const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Table = styled.table`
  width: 60px;
  height: 290px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`
const TableBody = styled.tbody`
  display: block;
  height: 290px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`
const Tr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #EAF3F3;
  }
`
