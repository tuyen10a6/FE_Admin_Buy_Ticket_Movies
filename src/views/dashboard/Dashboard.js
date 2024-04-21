import React from 'react'
import { useState, useEffect } from 'react'

const Dashboard = () => {
  const [danhMuc, setDanhMuc] = useState([])
  const [newLoaiPhim, setNewLoaiPhim] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingLoaiPhim, setEditingLoaiPhim] = useState('')
  const token = localStorage.getItem('token')
  useEffect(() => {
    fetch('http://localhost:3003/v1/api/danhmuc')
      .then((response) => response.json())
      .then((data) => setDanhMuc(data.data))
      .catch((error) => console.error('Error fetching danh muc:', error))
  }, [])

  const handleAddLoaiPhim = () => {
    fetch('http://localhost:3003/v1/api/addDanhMuc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ loai_phim: newLoaiPhim, image: 'image.jpg' }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Loại phim đã được thêm vào thành công:', data)
        setDanhMuc([...danhMuc, data.data]) // Thêm loại phim mới vào danh sách hiện tại
        setNewLoaiPhim('') // Xóa nội dung input
      })
      .catch((error) => console.error('Lỗi khi thêm loại phim:', error))
  }

  const handleEdit = (id, loaiPhim) => {
    setEditingId(id)
    setEditingLoaiPhim(loaiPhim)
  }

  const handleUpdateLoaiPhim = () => {
    fetch(`http://localhost:3003/v1/api/updateDanhMuc/${editingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ loai_phim: editingLoaiPhim }),
    })
      .then(() => {
        const updatedDanhMuc = danhMuc.map((item) =>
          item.id === editingId ? { ...item, loai_phim: editingLoaiPhim } : item,
        )
        setDanhMuc(updatedDanhMuc)
        setEditingId(null)
        setEditingLoaiPhim('')
      })
      .catch((error) => console.error('Error updating loai phim:', error))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3003/v1/api/deleteDanhMuc/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        const updatedDanhMuc = danhMuc.filter((item) => item.id !== id)
        setDanhMuc(updatedDanhMuc)
      })
      .catch((error) => console.error('Error deleting loai phim:', error))
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Danh sách các loại phim</h1>
      <div>
        <input
          type="text"
          value={newLoaiPhim}
          onChange={(e) => setNewLoaiPhim(e.target.value)}
          style={inputStyle}
        />
        <button style={{ marginLeft: '20px' }} onClick={handleAddLoaiPhim}>
          Thêm
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Loại Phim</th>
            <th style={tableHeaderStyle}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {danhMuc.map((item) => (
            <tr key={item.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{item.id}</td>
              <td style={tableCellStyle}>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editingLoaiPhim}
                    onChange={(e) => setEditingLoaiPhim(e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  item.loai_phim
                )}
              </td>
              <td style={tableCellStyle}>
                {editingId === item.id ? (
                  <button onClick={handleUpdateLoaiPhim}>Lưu</button>
                ) : (
                  <button onClick={() => handleEdit(item.id, item.loai_phim)}>Sửa</button>
                )}
                <button style={{ marginLeft: '20px' }} onClick={() => handleDelete(item.id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const tableHeaderStyle = {
  background: '#333',
  color: '#fff',
  padding: '10px',
  textAlign: 'left',
}

const tableRowStyle = {
  borderBottom: '1px solid #ccc',
}

const tableCellStyle = {
  padding: '10px',
}

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
}

export default Dashboard
