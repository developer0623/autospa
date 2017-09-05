import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}

  if (!values.name) errors.name = 'Required'
  if (!values.type) errors.type = 'Required'
  if (!values.typeName) errors.type = 'Required'
  if (!values.description) errors.description = 'Required'
  if (!values.price) errors.price = 'Required'
  if (!values.time) errors.time = 'Required'

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

const ServiceForm = ({ show, hide, handleSubmit }) => (
  <div className={'modal ' + (show ? 'is-active' : '')}>
    <div className='modal-background' />
    <div className='modal-card'>
      <form onSubmit={handleSubmit}>
        <section className='modal-card-body'>
          <article className='media'>
            <div className='media-content'>
              <div className='content'>
                <Field name='name' label='Name' component={renderField} type='text' />
                <Field name='typeName' label='Type name' component={renderField} type='text' />
                <Field name='type' label='Type' component={renderField} type='text' />
                <Field name='description' label='Description' component={renderField} type='text' />
                <Field name='price' label='Price' component={renderField} type='number' />
                <Field name='time' label='Duration' component={renderField} type='number' />
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

ServiceForm.propTypes = {
  show: React.PropTypes.bool.isRequired,
  hide: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'service',
  validate
})(ServiceForm)
