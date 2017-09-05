import React from 'react'
import { connect } from 'react-redux'
import { LocationActions, ServiceActions, BookingActions } from 'store/actions'
import { LocationSelectors, ServiceSelectors, UserSelectors, BookingSelectors } from 'store/selectors'
import { Service } from 'store/records'
// import styled from 'styled-components'
// import _ from 'underscore'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Type, Location, Date, Booking, Confirmation } from './Tabs'

const mapState = state => ({
  locations: LocationSelectors.list(state),
  services: ServiceSelectors.list(state),
  currentUser: UserSelectors.current(state),
  bookings: BookingSelectors.list(state)
})
const mapProps = { ...LocationActions, ...ServiceActions, ...BookingActions }
const enhancer = connect(mapState, mapProps)

class NewBookingContainer extends React.Component {
  state = {
    tabIndex: 0,
    date: new Date(),
    hour: null,
    availableHours: [],
    bookings: [],
    location: {},
    type: {}
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

  book () {
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
        confirmed: true
        // createdAt: new Date()
      }
      this.props.createBooking(booking)
    })

    window.location.href = '/'
  }

  render () {
    return (
      <Tabs
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
        style={{height: '500px'}}>
        <TabList>
          <Tab>Palvelun tyyppi</Tab>
          <Tab>Sijainti</Tab>
          <Tab>Muu päivämäärä</Tab>
          <Tab>Palvelut</Tab>
          <Tab>Vahvistettu varaus</Tab>
        </TabList>
        <TabPanel style={{ height: '100%' }}>
          <Type onSelect={type => this.setState({ type, tabIndex: 1 })} />
        </TabPanel>
        <TabPanel>
          <Location
            locations={this.props.locations}
            onSelect={location => this.setState({ location, tabIndex: 2 })}
          />
        </TabPanel>
        <TabPanel>
          <Date
            type={this.state.type}
            location={this.state.location}
            bookings={this.props.bookings}
            onSelect={(hour, date) => this.setState({ date, hour, tabIndex: 3 })}
          />
        </TabPanel>
        <TabPanel>
          <Booking
            location={this.state.location}
            services={this.props.services}
            date={this.state.date}
            hour={this.state.hour}
            onSelect={bookings => this.setState({ bookings, tabIndex: 4 })}
          />
        </TabPanel>
        <TabPanel>
          <Confirmation
            location={this.state.location}
            bookings={this.state.bookings}
            onSelect={this.book.bind(this)}
          />
        </TabPanel>
      </Tabs>
    )
  }
}

export default enhancer(NewBookingContainer)
