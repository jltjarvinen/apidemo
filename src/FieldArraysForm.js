import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
// import validate from './validate'
// import Results from './Results';
//import { registerField, unregisterField, arrayPush } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

// const renderInput = ({ input, label, type, meta: { touched, error } }) => (
//       <input {...input} type={type} placeholder={label} />
// )

const renderHeaders = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Header
      </button>
    </li>
    {fields.map((header, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Header"
          onClick={() => fields.remove(index)}
        />
        {/* <div>
          <label>{`Header #${index + 1}`}</label>
          <div>
            <Field
            name={`${header}.x`}
            type="text"
            component={renderInput}
            label={`Key ${index + 1}`}
            />
            <Field
              name={`${header}.y`}
              type="text"
              component={renderInput}
              label={`Value ${index + 1}`}
            />
          </div>
        </div> */}
        <Field
          name={header}
          type="text"
          component={renderField}
          label={`Header #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderDatas = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Data
      </button>
    </li>
    {fields.map((data, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Data"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={data}
          type="text"
          component={renderField}
          label={`Data #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderApis = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add API
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((api, index) => (
      <li key={index} style={{ border: '2px solid black' }}>
        <button
          type="button"
          title="Remove API"
          onClick={() => fields.remove(index)}
        />
        <h4>API #{index + 1}</h4>
        <Field
          name={`${api}.name`}
          type="text"
          component={renderField}
          label="API name"
        />
        <Field
          name={`${api}.url`}
          type="text"
          component={renderField}
          label="URL"
        />
        <Field
          name={`${api}.endpoint`}
          type="text"
          component={renderField}
          label="API endpoint"
        />
        <FieldArray name={`${api}.headers`} component={renderHeaders} />
        <FieldArray name={`${api}.data`} component={renderDatas} />
        </li>
    ))}
  </ul>
)

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    // <div>
    <form onSubmit={handleSubmit}>
      <FieldArray name="apis" component={renderApis} />
      <div>
        <button type="submit" disabled={submitting}>
          Test
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  // validate
})(FieldArraysForm)
