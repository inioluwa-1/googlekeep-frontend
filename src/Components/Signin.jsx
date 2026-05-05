import { Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import authAPI from '../api/authAPI'

const Signin = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const userSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('')
      const response = await authAPI.signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      )
      
      // Store token and user data
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      // Redirect to notes
      navigate('/notes')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
      console.error('Signup error:', err)
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
              <h2 className="text-center mb-4">Signup</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <Formik
                initialValues={initialValues}
                validationSchema={userSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, values, touched, errors, handleSubmit, isSubmitting }) => (
                  <form onSubmit={handleSubmit} className="needs-validation">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="form-control"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && touched.firstName && <div >{errors.firstName}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="form-control"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && touched.lastName && <div >{errors.lastName}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={values.email}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email && <div >{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={values.password}
                        onChange={handleChange}
                      />
                      {errors.password && touched.password && <div>{errors.password}</div>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
                      Signup
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin