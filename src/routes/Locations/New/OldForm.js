import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}

  if (!values.name) errors.name = 'Required'
  if (!values.address) errors.address = 'Required'
  if (!values.slots) errors.slots = 'Required'
  if (!values.opensAt) errors.opensAt = 'Required'
  if (!values.closesAt) errors.closesAt = 'Required'

  return errors
}

const renderField = (field) => (
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

const LocationForm = ({ show, hide, handleSubmit }) => (
  <div className={'modal ' + (show ? 'is-active' : '')}>
    <div className='modal-background' />
    <div className='modal-card'>
      <form onSubmit={handleSubmit}>
        <section className='modal-card-body'>
          <article className='media'>
            <div className='media-content'>
              <div className='content'>
                <Field name='name' label='Name' component={renderField} type='text' />
                <Field name='address' label='Address' component={renderField} type='text' />
                <Field name='slots' label='Slots' component={renderField} type='number' />
                <Field name='opensAt' label='Opening time' component={renderField} type='number' />
                <Field name='closesAt' label='Closing time' component={renderField} type='number' />

                <div className='field is-horizontal'>
                  <div className='field-label is-normal'>
                    <label className='label'>Working days</label>
                  </div>
                  <div className='field-body'>
                    <div className='field is-grouped'>
                      <p className='control is-expanded'>
                        <input className='input' placeholder='Opening time' />
                      </p>
                    </div>
                    <div className='field'>
                      <p className='control is-expanded'>
                        <input className='input' placeholder='Closing time' />
                      </p>
                    </div>
                  </div>
                </div>

                <div className='field is-horizontal'>
                  <div className='field-label is-normal'>
                    <label className='label'>Saturday</label>
                  </div>
                  <div className='field-body'>
                    <div className='field is-grouped'>
                      <p className='control is-expanded'>
                        <input className='input' placeholder='Opening time' />
                      </p>
                    </div>
                    <div className='field'>
                      <p className='control is-expanded'>
                        <input className='input' placeholder='Closing time' />
                      </p>
                    </div>
                  </div>
                </div>


                <div className='field is-horizontal'>
                  <div className='field-label'>
                    <label className='label'>Works on Sunday?</label>
                  </div>
                  <div className='field-body'>
                    <div className='field'>
                      <div className='control'>
                        <label className='checkbox'>
                          <input type='checkbox' />
                          Checkbox
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='field is-horizontal'>
                  <div className='field-label is-normal'>
                    <label className='label'>Sunday</label>
                  </div>
                  <div className='field-body'>
                    <div className='field is-grouped'>
                      <p className='control is-expanded'>
                        <input className='input' placeholder='Opening time' />
                      </p>
                    </div>
                    <div className='field'>
                      <p className='control is-expanded'>
                        <input className='input' placeholder='Closing time' />
                      </p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </article>
        </section>
        <footer className='modal-card-foot'>
          <button type='submit' className='button is-success'>Save</button>
        </footer>
      </form>
    </div>
    <button className='modal-close' onClick={hide} />
  </div>
)

LocationForm.propTypes = {
  show: React.PropTypes.bool.isRequired,
  hide: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'location',
  validate
})(LocationForm)
