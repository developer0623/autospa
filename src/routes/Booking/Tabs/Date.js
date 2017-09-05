import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Footer from '../Footer'

export default class DateTab extends React.Component {
  state = { date: moment(), availableHours: [] }

  componentDidMount () {
    this.dateChanged(moment())
  }

  dateChanged (date) {
    let ranges = []
    this.props.bookings
      .filter(x => x.location.id === this.props.location.id)
      .map(x => ranges.push(...x.range()))
    let availableHours = this.props.location.availableHours(date.toDate(), [])

    availableHours = availableHours.map(x => {
      const exists = ranges.findIndex(y => y.getTime() === x.getTime())
      if (exists > -1) {
        return { date: x, available: false }
      } else {
        return { date: x, available: true }
      }
    })

    availableHours = availableHours.filter((_, i) => i % 6 === 0)
    this.setState({ availableHours, date: date.toDate() })
  }

  selectHour (date, hour, available) {
    if (available) {
      this.props.onSelect(date, hour)
    }
  }

  renderWorkingHours () {
    const { location } = this.props
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
    const { type } = this.props
    let minDate = moment()
    if (!type.isWashing && type.storedWithAutospa) {
      minDate = moment().add(2, 'days')
    }

    return (
      <Wrapper>
        <MainContainer>
          <Container>
            <LocationName>{this.props.location.name}</LocationName>
            {this.props.location.address}
            <Title>
              <p>Kartta</p>
              <p>Aukioloajat</p>
            </Title>
            <MapContainer>
              <Map src={mapUrl(this.props.location.address)} allowfullscreen />
              { this.renderWorkingHours() }
            </MapContainer>
          </Container>
          <Container>
            <Title>
              <p>Päivämäärä</p>
              <p>Kellon aika</p>
            </Title>
            <DateContainer>
              <div style={{ width: 300 }}>
                <DatePicker
                  inline
                  minDate={minDate}
                  selected={minDate}
                  onChange={date => this.dateChanged(date)}
                />
              </div>
              <Table>
                <TableBody>
                  { this.state.availableHours.map(({ date, available }) =>
                    <Tr
                      onClick={() => this.selectHour(date, this.state.date, available)}
                      key={new Date().getTime() + date.getTime()}
                      >
                      <Td available={available}>{moment(date).format('hh:mm')}</Td>
                    </Tr>
                  )}
                </TableBody>
              </Table>
            </DateContainer>
            <Warning>Punaiset merkattu päivämäärät ja kellon ajat ei ole varattavissa</Warning>
          </Container>
        </MainContainer>
        <Footer />
      </Wrapper>
    )
  }
}

const mapUrl = address => {
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyAB5kywdB3khwgp46s26cboEKBlU10Gy6g&q=${address}`
}

const Wrapper = styled.div`
`
const MainContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`
const Container = styled.div`
  min-width: 450px;
  border: 2px solid #F7F7F7;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 2px solid #F7F7F7;
  padding: 20px;
`
const MapContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Table = styled.table`
  width: 40px;
  height: 280px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`
const TableBody = styled.tbody`
  display: block;
  height: 290px;
  overflow-y: auto;
  overflow-x: hidden;
`
const Tr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #EAF3F3;
  }
`
const Td = styled.td`
  color: ${props => props.available ? '#000' : 'red'}
`

const LocationName = styled.div`
  color: #17B4DB;
  font-weight: bold;
  font-size: 18px;
`
const Title = styled.div`
  background-color: #42BADE;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 6px;
  margin-top: 10px;
  margin-bottom: 10px
`
const Map = styled.iframe`
  width: 250px;
  height: 200px;
`
const WorkingHoursContainer = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WorkingHours = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Warning = styled.p`
  color: #FF3613;
  padding-top: 5px;
`
