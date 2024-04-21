import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const handleLogin = () => {
    if (email !== '' && password !== '') {
      // Gọi API đăng nhập
      fetch('http://localhost:3003/v1/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Đăng nhập không thành công')
          }
          return response.json()
        })
        .then((data) => {
          // Lưu token vào Local Storage
          localStorage.setItem('token', data.access_token)
          navigate('/Dashboard')

          console.log(data)
          setError(null)
          // Redirect hoặc thực hiện các hành động khác sau khi đăng nhập thành công
        })
        .catch((error) => {
          console.error('Đăng nhập không thành công:', error)
          setError('Đăng nhập không thành công. Vui lòng kiểm tra lại tên người dùng và mật khẩu.')
        })
    } else {
      setError('Vui lòng nhập tên người dùng và mật khẩu.')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h2
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        ĐĂNG NHẬP ADMIN ĐẶT VÉ XEM PHIM
      </h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <div style={{ marginBottom: '10px' }}>
        <label
          style={{
            marginBottom: '5px',
            marginRight: '10px',
          }}
        >
          Tên người dùng
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label
          style={{
            marginBottom: '5px',
            marginRight: '50px',
          }}
        >
          Mật khẩu:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
      </div>
      <button
        type="button"
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Đăng nhập
      </button>
    </div>
  )
}

export default Login
