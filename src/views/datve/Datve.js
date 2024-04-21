import React, { useState, useEffect } from 'react'

const DatVe = () => {
  const [danhSachDatVe, setDanhSachDatVe] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingDatVe, setEditingDatVe] = useState({
    lich_chieu_id: '',
    ten_khachhang: '',
    sdt: '',
    email: '',
    thoi_gian_dat: '',
    so_luong: '',
  })

  useEffect(() => {
    // Fetch danh sách đặt vé từ API và cập nhật state
    fetch('http://localhost:3003/v1/api/getDatVe')
      .then((response) => response.json())
      .then((data) => setDanhSachDatVe(data.data))
      .catch((error) => console.error('Error fetching danh sách đặt vé:', error))
  }, [])

  const handleEdit = (id, datVe) => {
    // Xác định đang sửa và cập nhật thông tin đặt vé cần chỉnh sửa
    setIsEditing(true)
    setEditingId(id)
    setEditingDatVe(datVe)
  }

  const handleUpdateDatVe = () => {
    // Gửi yêu cầu cập nhật thông tin đặt vé đến API và cập nhật state sau khi thành công
    fetch(`http://localhost:3003/v1/api/updateDatVe/${editingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingDatVe),
    })
      .then(() => {
        // Cập nhật danh sách đặt vé sau khi chỉnh sửa thành công
        const updatedDanhSachDatVe = danhSachDatVe.map((item) =>
          item.id === editingId ? editingDatVe : item,
        )
        setDanhSachDatVe(updatedDanhSachDatVe)
        // Reset trạng thái của chỉnh sửa và các biến liên quan
        setEditingId(null)
        setEditingDatVe({
          lich_chieu_id: '',
          ten_khachhang: '',
          sdt: '',
          email: '',
          thoi_gian_dat: '',
          so_luong: '',
        })
        setIsEditing(false)
      })
      .catch((error) => console.error('Error updating đặt vé:', error))
  }

  const handleDelete = (id) => {
    // Gửi yêu cầu xoá đặt vé đến API và cập nhật state sau khi thành công
    fetch(`http://localhost:3003/v1/api/deleteDatVe/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Cập nhật danh sách đặt vé sau khi xoá thành công
        const updatedDanhSachDatVe = danhSachDatVe.filter((item) => item.id !== id)
        setDanhSachDatVe(updatedDanhSachDatVe)
      })
      .catch((error) => console.error('Error deleting đặt vé:', error))
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Quản lý đặt vé</h1>
      {/* Hiển thị form chỉnh sửa nếu đang trong trạng thái chỉnh sửa */}
      {isEditing && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '10px' }}>Form sửa đặt vé</h2>
          <div style={{ marginBottom: '10px' }}>
            <label>Tên khách hàng:</label>
            <input
              type="text"
              value={editingDatVe.ten_khachhang}
              onChange={(e) => setEditingDatVe({ ...editingDatVe, ten_khachhang: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Số điện thoại:</label>
            <input
              type="text"
              value={editingDatVe.sdt}
              onChange={(e) => setEditingDatVe({ ...editingDatVe, sdt: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input
              type="text"
              value={editingDatVe.email}
              onChange={(e) => setEditingDatVe({ ...editingDatVe, email: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Thời gian đặt:</label>
            <input
              type="text"
              value={editingDatVe.thoi_gian_dat}
              onChange={(e) => setEditingDatVe({ ...editingDatVe, thoi_gian_dat: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Số lượng:</label>
            <input
              type="text"
              value={editingDatVe.so_luong}
              onChange={(e) => setEditingDatVe({ ...editingDatVe, so_luong: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateDatVe} style={{ padding: '5px' }}>
            Lưu
          </button>
        </div>
      )}
      {/* Hiển thị danh sách đặt vé */}
      <h2 style={{ marginBottom: '10px' }}>Danh sách đặt vé</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Tên khách hàng</th>
            <th style={tableHeaderStyle}>Số điện thoại</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Thời gian đặt</th>
            <th style={tableHeaderStyle}>Số lượng</th>
            <th style={tableHeaderStyle}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {danhSachDatVe.map((datVe) => (
            <tr key={datVe.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{datVe.ten_khachhang}</td>
              <td style={tableCellStyle}>{datVe.sdt}</td>
              <td style={tableCellStyle}>{datVe.email}</td>
              <td style={tableCellStyle}>{datVe.thoi_gian_dat}</td>
              <td style={tableCellStyle}>{datVe.so_luong}</td>
              {/* <td style={tableCellStyle}>
                <button onClick={() => handleEdit(datVe.id, datVe)}>Sửa</button>
                <button style={{ marginLeft: '5px' }} onClick={() => handleDelete(datVe.id)}>
                  Xoá
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// CSS styles cho bảng
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

export default DatVe
