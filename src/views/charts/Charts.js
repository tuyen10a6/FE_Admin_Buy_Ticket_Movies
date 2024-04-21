import React, { useState, useEffect } from 'react'

const RapPhim = () => {
  const [danhMuc, setDanhMuc] = useState([])
  const [newRapPhim, setNewRapPhim] = useState({
    ten_rap: '',
    dia_chi_rap: '',
    sdt: '',
    suc_chua: 0,
    trang_thai: 1,
  })
  const [editingId, setEditingId] = useState(null)
  const [editingRapPhim, setEditingRapPhim] = useState({
    ten_rap: '',
    dia_chi_rap: '',
    sdt: '',
    suc_chua: 0,
  })
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('http://localhost:3003/v1/api/rap_phim')
      .then((response) => response.json())
      .then((data) => setDanhMuc(data.data))
      .catch((error) => console.error('Error fetching danh muc:', error))
  }, [])

  const handleAddRapPhim = () => {
    fetch('http://localhost:3003/v1/api/addRapPhim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newRapPhim),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Rạp phim đã được thêm vào thành công:', data)
        setDanhMuc([...danhMuc, data]) // Thêm rạp phim mới vào danh sách hiện tại
        window.location.reload()
        setNewRapPhim({
          ten_rap: '',
          dia_chi_rap: '',
          sdt: '',
          suc_chua: 0,
        }) // Xóa nội dung input
      })
      .catch((error) => console.error('Lỗi khi thêm rạp phim:', error))
  }

  const handleEdit = (id, rapPhim) => {
    setEditingId(id)
    setEditingRapPhim(rapPhim)
  }

  const handleUpdateRapPhim = () => {
    fetch(`http://localhost:3003/v1/api/updateRapPhim/${editingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingRapPhim),
    })
      .then(() => {
        const updatedDanhMuc = danhMuc.map((item) =>
          item.id === editingId ? editingRapPhim : item,
        )
        setDanhMuc(updatedDanhMuc)
        setEditingId(null)
        setEditingRapPhim({
          ten_rap: '',
          dia_chi_rap: '',
          sdt: '',
          suc_chua: 0,
        })
      })
      .catch((error) => console.error('Error updating rap phim:', error))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3003/v1/api/deleteRapPhim/${id}`, {
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
      .catch((error) => console.error('Error deleting rap phim:', error))
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Danh sách các rạp chiếu phim</h1>
      <div>
        <input
          type="text"
          value={newRapPhim.ten_rap}
          onChange={(e) => setNewRapPhim({ ...newRapPhim, ten_rap: e.target.value })}
          placeholder="Tên rạp"
          style={inputStyle}
        />
        <input
          type="text"
          value={newRapPhim.dia_chi_rap}
          onChange={(e) => setNewRapPhim({ ...newRapPhim, dia_chi_rap: e.target.value })}
          placeholder="Địa chỉ rạp"
          style={{ ...inputStyle, marginLeft: '10px' }}
        />
        <input
          type="text"
          value={newRapPhim.sdt}
          onChange={(e) => setNewRapPhim({ ...newRapPhim, sdt: e.target.value })}
          placeholder="Số điện thoại"
          style={{ ...inputStyle, marginLeft: '10px' }}
        />
        <input
          type="number"
          value={newRapPhim.suc_chua}
          onChange={(e) => setNewRapPhim({ ...newRapPhim, suc_chua: e.target.value })}
          placeholder="Sức chứa"
          style={{ ...inputStyle, marginLeft: '0px', marginTop: '10px' }}
        />
        <button style={{ marginLeft: '20px' }} onClick={handleAddRapPhim}>
          Thêm
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Tên rạp</th>
            <th style={tableHeaderStyle}>Địa chỉ rạp</th>
            <th style={tableHeaderStyle}>SĐT</th>
            <th style={tableHeaderStyle}>Sức chứa</th>
            <th style={tableHeaderStyle}>Thao tác</th>
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
                    value={editingRapPhim.ten_rap}
                    onChange={(e) =>
                      setEditingRapPhim({
                        ...editingRapPhim,
                        ten_rap: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                ) : (
                  item.ten_rap
                )}
              </td>
              <td style={tableCellStyle}>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editingRapPhim.dia_chi_rap}
                    onChange={(e) =>
                      setEditingRapPhim({
                        ...editingRapPhim,
                        dia_chi_rap: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                ) : (
                  item.dia_chi_rap
                )}
              </td>
              <td style={tableCellStyle}>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editingRapPhim.sdt}
                    onChange={(e) =>
                      setEditingRapPhim({
                        ...editingRapPhim,
                        sdt: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                ) : (
                  item.sdt
                )}
              </td>
              <td style={tableCellStyle}>
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={editingRapPhim.suc_chua}
                    onChange={(e) =>
                      setEditingRapPhim({
                        ...editingRapPhim,
                        suc_chua: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                ) : (
                  item.suc_chua
                )}
              </td>
              <td style={tableCellStyle}>
                {editingId === item.id ? (
                  <button onClick={handleUpdateRapPhim}>Lưu</button>
                ) : (
                  <button onClick={() => handleEdit(item.id, item)}>Sửa</button>
                )}
                <button style={{ marginLeft: '10px' }} onClick={() => handleDelete(item.id)}>
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

export default RapPhim
