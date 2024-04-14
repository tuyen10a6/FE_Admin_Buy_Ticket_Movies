import React, { useState, useEffect } from 'react'

const LichChieu = () => {
  const [danhSachLichChieu, setDanhSachLichChieu] = useState([])
  const [danhSachPhim, setDanhSachPhim] = useState([])
  const [danhSachRap, setDanhSachRap] = useState([])
  const [newLichChieu, setNewLichChieu] = useState({
    phim_id: '',
    rap_id: '',
    thoi_gian_bat_dau: '',
    thoi_gian_ket_thuc: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [editingLichChieu, setEditingLichChieu] = useState({
    phim_id: '',
    rap_id: '',
    thoi_gian_bat_dau: '',
    thoi_gian_ket_thuc: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('http://localhost:3000/v1/api/getLichChieu')
      .then((response) => response.json())
      .then((data) => setDanhSachLichChieu(data.data))
      .catch((error) => console.error('Error fetching danh sách lịch chiếu:', error))

    fetch('http://localhost:3000/v1/api/phim')
      .then((response) => response.json())
      .then((data) => setDanhSachPhim(data.data))
      .catch((error) => console.error('Error fetching danh sách phim:', error))

    fetch('http://localhost:3000/v1/api/rap_phim')
      .then((response) => response.json())
      .then((data) => setDanhSachRap(data.data))
      .catch((error) => console.error('Error fetching danh sách rạp:', error))
  }, [])

  const handleAddLichChieu = () => {
    fetch('http://localhost:3000/v1/api/addLichChieu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newLichChieu),
    })
      .then((response) => response.json())
      .then((data) => {
        setDanhSachLichChieu([...danhSachLichChieu, data])
        setNewLichChieu({
          phim_id: '',
          rap_id: '',
          thoi_gian_bat_dau: '',
          thoi_gian_ket_thuc: '',
        })
        window.location.reload()
      })
      .catch((error) => console.error('Lỗi khi thêm lịch chiếu:', error))
  }

  const handleEdit = (id, lichchieu) => {
    setIsEditing(true)
    setEditingId(id)
    setEditingLichChieu(lichchieu)
  }

  const handleUpdateLichChieu = () => {
    fetch(`http://localhost:3000/v1/api/updateLichChieu/${editingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingLichChieu),
    })
      .then(() => {
        const updatedDanhSachLichChieu = danhSachLichChieu.map((item) =>
          item.id === editingId ? editingLichChieu : item,
        )
        setDanhSachLichChieu(updatedDanhSachLichChieu)
        setEditingId(null)
        setEditingLichChieu({
          phim_id: '',
          rap_id: '',
          thoi_gian_bat_dau: '',
          thoi_gian_ket_thuc: '',
        })
        setIsEditing(false)
        window.location.reload()
      })
      .catch((error) => console.error('Error updating lịch chiếu:', error))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/v1/api/deleteLichChieu/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        const updatedDanhSachLichChieu = danhSachLichChieu.filter((item) => item.id !== id)
        setDanhSachLichChieu(updatedDanhSachLichChieu)
      })
      .catch((error) => console.error('Error deleting lịch chiếu:', error))
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Quản lý lịch chiếu</h1>
      <h2 style={{ marginBottom: '10px' }}>Thêm lịch chiếu mới</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <select
          value={newLichChieu.phim_id}
          onChange={(e) => setNewLichChieu({ ...newLichChieu, phim_id: e.target.value })}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="">Chọn phim</option>
          {danhSachPhim.map((phim) => (
            <option key={phim.id} value={phim.id}>
              {phim.ten_phim}
            </option>
          ))}
        </select>
        <select
          value={newLichChieu.rap_id}
          onChange={(e) => setNewLichChieu({ ...newLichChieu, rap_id: e.target.value })}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="">Chọn rạp</option>
          {danhSachRap.map((rap) => (
            <option key={rap.id} value={rap.id}>
              {rap.ten_rap}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={newLichChieu.thoi_gian_bat_dau}
          onChange={(e) => setNewLichChieu({ ...newLichChieu, thoi_gian_bat_dau: e.target.value })}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="datetime-local"
          value={newLichChieu.thoi_gian_ket_thuc}
          onChange={(e) => setNewLichChieu({ ...newLichChieu, thoi_gian_ket_thuc: e.target.value })}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleAddLichChieu} style={{ padding: '5px' }}>
          Thêm
        </button>
      </div>
      <h2 style={{ marginBottom: '10px' }}>Danh sách lịch chiếu</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Phim</th>
            <th style={tableHeaderStyle}>Rạp</th>
            <th style={tableHeaderStyle}>Thời gian bắt đầu</th>
            <th style={tableHeaderStyle}>Thời gian kết thúc</th>
            <th style={tableHeaderStyle}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {danhSachLichChieu.map((lichchieu) => (
            <tr key={lichchieu.id} style={tableRowStyle}>
              <td style={tableCellStyle}>
                {danhSachPhim.find((phim) => phim.id === lichchieu.phim_id)?.ten_phim || 'N/A'}
              </td>
              <td style={tableCellStyle}>
                {danhSachRap.find((rap) => rap.id === lichchieu.rap_id)?.ten_rap || 'N/A'}
              </td>
              <td style={tableCellStyle}>{lichchieu.thoi_gian_bat_dau}</td>
              <td style={tableCellStyle}>{lichchieu.thoi_gian_ket_thuc}</td>
              <td style={tableCellStyle}>
                <button onClick={() => handleEdit(lichchieu.id, lichchieu)}>Sửa</button>
                <button style={{ marginTop: '5px' }} onClick={() => handleDelete(lichchieu.id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '10px' }}>Form sửa lịch chiếu</h2>
          <select
            value={editingLichChieu.phim_id}
            onChange={(e) => setEditingLichChieu({ ...editingLichChieu, phim_id: e.target.value })}
            style={{ marginRight: '10px', padding: '5px' }}
          >
            <option value="">Chọn phim</option>
            {danhSachPhim.map((phim) => (
              <option key={phim.id} value={phim.id}>
                {phim.ten_phim}
              </option>
            ))}
          </select>
          <select
            value={editingLichChieu.rap_id}
            onChange={(e) => setEditingLichChieu({ ...editingLichChieu, rap_id: e.target.value })}
            style={{ marginRight: '10px', padding: '5px' }}
          >
            <option value="">Chọn rạp</option>
            {danhSachRap.map((rap) => (
              <option key={rap.id} value={rap.id}>
                {rap.ten_rap}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={editingLichChieu.thoi_gian_bat_dau}
            onChange={(e) =>
              setEditingLichChieu({ ...editingLichChieu, thoi_gian_bat_dau: e.target.value })
            }
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="datetime-local"
            value={editingLichChieu.thoi_gian_ket_thuc}
            onChange={(e) =>
              setEditingLichChieu({ ...editingLichChieu, thoi_gian_ket_thuc: e.target.value })
            }
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={handleUpdateLichChieu} style={{ padding: '5px' }}>
            Lưu
          </button>
        </div>
      )}
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

export default LichChieu
