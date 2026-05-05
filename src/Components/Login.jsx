import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import authAPI from '../api/authAPI'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum')
    .required('Password is required'),
});

const Login = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('')
      const response = await authAPI.login(values.email, values.password)
      
      // Store token and user data
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      // Redirect to notes
      navigate('/notes')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
      console.error('Login error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form className="needs-validation">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                      {errors.email && touched.email && (
                        <ErrorMessage name="email" component="div" className="text-danger mt-2" />
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                      />
                      {errors.password && touched.password && (
                        <ErrorMessage name="password" component="div" className="text-danger mt-2" />
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-100"
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login