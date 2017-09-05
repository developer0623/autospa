import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}

  if (!values.name) errors.name = 'Required'
  if (!values.address) errors.address = 'Required'
  if (!values.slots) errors.slots = 'Required'
  // if (!values.opensAt) errors.opensAt = 'Required'
  // if (!values.endsAt) errors.closesAt = 'Required'
  // if (!values.saturdayOpensAt) errors.opensAt = 'Required'
  // if (!values.saturdayEndsAt) errors.closesAt = 'Required'

  return errors
}

const renderField = field => (
  <div className='field is-horizontal'>
    <div className='field-label is-normal'>
      <label className='label'>{field.label}</label>
    </div>
    <div className='field-body'>
      <div className='field'>
        <div className='control'>
          <input
            {...field.input}
            type={field.type}
            className='input'
          />
          { field.meta.touched && field.meta.error &&
            <p className='help is-danger'>
              {field.meta.error}
            </p>
          }
        </div>
      </div>
    </div>
  </div>
)

const TimeRange = ({ label, opens, closes }) => (
  <div className='field is-horizontal'>
    <div className='field-label is-normal'>
      <label className='label'>{label}</label>
    </div>
    <div className='field-body'>
      <div className='field is-grouped'>
        <p className='control is-expanded'>
          { opens }
        </p>
      </div>
      <div className='field'>
        <p className='control is-expanded'>
          { closes }
        </p>
      </div>
    </div>
  </div>
)

const LocationForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <article className='media'>
        <div className='media-content'>
          <div className='content'>
            <Field name='name' label='Name' component={renderField} type='text' />
            <Field name='address' label='Address' component={renderField} type='text' />
            <Field name='slots' label='Slots' component={renderField} type='number' />
            <TimeRange
              label='Working days'
              opens={<Field className='input' name='opensAt' type='number' component='input' placeholder='Start time' />}
              closes={<Field className='input' name='closesAt' type='number' component='input' placeholder='End time' />}
            />
            <TimeRange
              label='Saturday days'
              opens={<Field className='input' name='saturdayOpensAt' type='number' component='input' placeholder='Start time' />}
              closes={<Field className='input' name='saturdayClosesAt' type='number' component='input' placeholder='End time' />}
            />
            <TimeRange
              label='Saturday days'
              opens={<Field className='input' name='sundayOpensAt' type='number' component='input' placeholder='Start time' />}
              closes={<Field className='input' name='sundayClosesAt' type='number' component='input' placeholder='End time' />}
            />
          </div>
        </div>
      </article>
      <br />
      <br />
      <button style={{ width: '200px' }} type='submit' className='button is-success'>Save</button>
    </form>
  )
}

LocationForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'location',
  validate
})(LocationForm)
