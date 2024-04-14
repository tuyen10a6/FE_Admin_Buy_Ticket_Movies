import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ path, element: Component }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Route path={path} element={<Component />} />
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  element: PropTypes.elementType.isRequired,
}

export default PrivateRoute
