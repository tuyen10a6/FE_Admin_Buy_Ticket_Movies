import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import Page500 from './views/pages/page500/Page500'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    const token = localStorage.getItem('token')

    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            {/* Đăng nhập và đăng ký không cần kiểm tra xác thực */}
            <Route path="/" exact name="Login Page" element={<Login />} />
            <Route path="/register" name="Register Page" element={<Register />} />

            {/* Các trang cần xác thực */}

            <Route path="/404" name="Page 404" element={<Page404 />} />
            <Route path="/500" name="Page 500" Component={Page500} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
