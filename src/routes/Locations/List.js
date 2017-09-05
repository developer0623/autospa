import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const LocationsList = ({ locations, remove }) => (
  <table className='table is-bordered is-narrow'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Slots</th>
        <th>Working days</th>
        <th>Saturday</th>
        <th>Sunday</th>
        <th />
      </tr>
    </thead>
    <tbody>
      { locations.map(location =>
        <tr key={location.id}>
          <td>{location.name}</td>
          <td>{location.address}</td>
          <td>{location.slots}</td>
          <td>{location.opensAt + '-' + location.closesAt}</td>
          <td>{location.saturdayOpensAt + '-' + location.saturdayClosesAt}</td>
          <td>{location.sundayOpensAt + '-' + location.sundayClosesAt}</td>
          <td>
            <button className='button is-link' onClick={() => remove(location.id)}>
              delete
            </button>
          </td>
        </tr>
      )}
    </tbody>
  </table>
)

LocationsList.propTypes = {
  locations: ImmutablePropTypes.list.isRequired,
  remove: React.PropTypes.func.isRequired
}

export default LocationsList
