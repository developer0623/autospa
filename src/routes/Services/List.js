import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const ServicesList = ({ services, remove }) => (
  <table className='table is-bordered is-narrow'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Type Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Time</th>
        <th />
      </tr>
    </thead>
    <tbody>
      { services.map(service =>
        <tr key={service.id}>
          <td>{service.name}</td>
          <td>{service.type}</td>
          <td>{service.typeName}</td>
          <td>{service.description}</td>
          <td>{service.price}</td>
          <td>{service.time}</td>
          <td>
            <button className='button is-link' onClick={() => remove(service.id)}>
              delete
            </button>
          </td>
        </tr>
      )}
    </tbody>
  </table>
)

ServicesList.propTypes = {
  services: ImmutablePropTypes.list.isRequired,
  remove: React.PropTypes.func.isRequired
}

export default ServicesList
