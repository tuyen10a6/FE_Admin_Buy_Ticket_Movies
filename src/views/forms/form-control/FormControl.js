import React from 'react'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from 'react'
import axios from 'axios'

import ReactPaginate from 'react-paginate'
import './../../../scss/_Order.scss'
import imageLogo from './../../../../src/assets/images/images.png'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
// Import Icon
import { GrUpdate, GrWifiNone } from 'react-icons/gr'
import { FaPrint } from 'react-icons/fa6'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { NavItem } from 'react-bootstrap'

const FormControl = () => {
  // Hook quản lý data Orders
  const [orders, setOrders] = useState([])
  // Phân trang
  const [currentPage, setCurrentPage] = useState(0)
  const PER_PAGE = 10
  //
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage)
  }

  const printOrder = (orderId) => {
    axios
      .get(`https://localhost:7014/api/Order/GetOrderById/${orderId}`)
      .then((response) => {
        const orderData = response.data[0]
        const printWindow = window.open('', '_blank')

        if (orderData && orderData.orderDetails && orderData.orderDetails.length > 0) {
          printWindow.document.write('<html><head><title></title>')
          printWindow.document.write('<style>')
          printWindow.document.write(
            'th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }',
          )
          printWindow.document.write('</style></head><body >')
          printWindow.document.write('<div style ="display:flex; align-items:center">')
          printWindow.document.write(
            `<img style ="width:130px; margin-right:30px" src ='${imageLogo}'/>`,
          )
          printWindow.document.write(
            '<h1 style="text-align: center; color:red">HOÁ ĐƠN BÁN HÀNG CLICKBUY</h1>',
          )
          printWindow.document.write('</div>')
          printWindow.document.write('<div>')
          printWindow.document.write(
            '<div> <span style ="font-weight: bold">Địa chỉ</span>:<span style ="margin-left:10px">Đội 8 - Thôn Lê Lợi - Xã Tân Hưng - TP Hưng Yên - Hưng Yên</span> </div> <br> ',
          )
          printWindow.document.write(
            '<div> <span style ="font-weight: bold">Hotline</span>: <span style="margin-left:10px">0853.675.166</span> </div> <br>',
          )
          printWindow.document.write(
            '<div> <span style ="font-weight: bold">Gmail</span>  : <span style="margin-left:10px">phamtuyenok2002@gmail.com</span> </div>',
          )
          printWindow.document.write('</div> <hr style =" border: 1px solid #ccc">')
          const orderDate = new Date(orderData.orderDate)

          const formattedOrderDate = `${orderDate.getDate()}-${
            orderDate.getMonth() + 1
          }-${orderDate.getFullYear()}`

          // Thêm thông tin khách hàng
          printWindow.document.write('<div style ="display:flex; flex-wrap:wrap">')
          printWindow.document.write(
            '<p style ="width:50%"><span style ="font-weight: bold"> Mã đơn hàng</span> : ' +
              orderData.orderID +
              '</p>',
          )
          printWindow.document.write(
            '<p style ="width:50%"> <span style ="font-weight: bold"> Ngày đặt hàng</span> : ' +
              formattedOrderDate +
              '</p>',
          )
          printWindow.document.write(
            '<p style ="width:50%"><span style ="font-weight: bold">Tên khách hàng</span> : ' +
              orderData.customerName +
              '</p>',
          )
          printWindow.document.write(
            '<p style ="width:50%"><span style ="font-weight: bold">Số điện thoại</span> : ' +
              orderData.customerPhone +
              '</p>',
          )
          printWindow.document.write(
            '<p style ="width:50%"><span style ="font-weight: bold">Địa chỉ</span> : ' +
              orderData.customerAddress +
              '</p>',
          )
          printWindow.document.write(
            '<p style ="width:50%"><span style ="font-weight: bold">Email khách hàng</span> : ' +
              orderData.customerEmail +
              '</p>',
          )
          printWindow.document.write(
            '<p style ="width:50%"><span style ="font-weight: bold">Hình thức thanh toán</span> : ' +
              '<span style ="color:red"> Thanh toán khi nhận hàng</span>' +
              '</p>',
          )
          printWindow.document.write('</div>')
          // Render thông tin đơn hàng vào bảng
          printWindow.document.write('<table style="width:100%;"> <tr>')
          printWindow.document.write('<th>STT</th>')
          printWindow.document.write('<th>Tên sản phẩm</th>')
          printWindow.document.write('<th>Đơn giá</th>')
          printWindow.document.write('<th>Số lượng</th>')
          printWindow.document.write('<th>Tổng tiền</th>')
          printWindow.document.write('</tr>')

          let stt = 1
          let totalAmount = 0
          orderData.orderDetails.forEach((orderDetail) => {
            const lineTotal = orderDetail.quantity * orderDetail.price

            totalAmount += lineTotal
            printWindow.document.write(' <tr>')
            printWindow.document.write('<td>' + stt++ + '</td>')
            printWindow.document.write('<td>' + orderDetail.varrianname + '</td>')
            printWindow.document.write(
              '<td>' +
                orderDetail.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) +
                '</td>',
            )
            printWindow.document.write('<td>' + orderDetail.quantity + '</td>')
            printWindow.document.write(
              '<td>' +
                (orderDetail.quantity * orderDetail.price).toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                }) +
                '</td>',
            )
            printWindow.document.write('</tr>')
          })

          printWindow.document.write(
            '<tr> <td colspan="5" style="text-align: right;"> <span style ="font-weight: bold"> Tổng tiền </span> : ' +
              totalAmount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) +
              '</td> </tr>',
          )

          printWindow.document.write('</table>')
          printWindow.document.write(
            '<div style ="margin-top:40px; display: flex; justify-content: space-between; "> <span> Người mua hàng <br> <i>(Ký, ghi rõ họ, tên)</i> </span>',
          )
          printWindow.document.write('  <span> Người bán <br> <i>(Ký, ghi rõ họ, tên)</i> </span>')
        } else {
          console.error('Error: Empty order data or missing order details.')
        }

        printWindow.document.write('</div> </div></body></html>')
        printWindow.document.close()

        printWindow.onload = function () {
          printWindow.print()
        }
      })
      .catch((error) => {
        console.error('Error fetching order data:', error)
        // Xử lý lỗi khi gọi API
      })
  }

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:7014/api/Order/GetAllOrderAdmin')
      setOrders(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  //
  const pagesToShow = 5 // số trang muốn hiển thị tối đa
  const totalPages = Math.ceil(orders.length / PER_PAGE)

  // tính toán số trang để hiển thị
  let startPage = Math.max(0, currentPage - Math.floor(pagesToShow / 2))
  let endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1)

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(0, endPage - pagesToShow + 1)
  }

  const pageRange = [...Array(endPage - startPage + 1)].map((_, i) => startPage + i)

  const [showSecond, setShowSecond] = useState(false)

  const handleCloseSecond = () => setShowSecond(false)
  const handleShowSecond = () => setShowSecond(true)

  // Hook quản lý trạng thái của Modal Update
  const [showUpdate, setShowUpdate] = useState(false)
  const handleCloseUpdate = () => setShowUpdate(false)
  const handleOpenUpdate = () => setShowUpdate(true)
  useEffect(() => {
    fetchOrders()
  }, [])
  // state mới để lưu trữ đơn hàng đang được chọn
  const [selectedOrder, setSelectedOrder] = useState(null)
  //  Khởi tạo Hook state lưu trữ các trạng thái đơn hàng
  const [dataorderstatus, setdataorderstatus] = useState([])
  const fetchDataOrderStatus = async () => {
    try {
      const reponse = await axios('https://localhost:7014/api/Order/GetAllOrderStatus')
      setdataorderstatus(reponse.data)

      const idMap = {}
      reponse.data.forEach((order) => {
        idMap[order.orderStatusName] = order.orderStatusID
      })
      setOrderStatusIdMap(idMap)
    } catch (error) {
      console.log(error)
    }
  }
  // Useffect tải dữ liệu và cập nhật state
  useEffect(() => {
    fetchDataOrderStatus()
  }, [])

  // Api Update Product
  const updateOrder = () => {
    const orderID = document.getElementById('Text_OrderID_edit').value
    const customerID = document.getElementById('Text_CustomerID_edit').value
    const customerName = document.getElementById('Text_CustomerName_edit').value
    const customerPhone = document.getElementById('Text_CustomerPhone_edit').value
    const customerAddress = document.getElementById('Text_CustomerAdrress_edit').value
    const customerEmail = document.getElementById('Text_CustomerEmail_edit').value
    const orderStatusID = document.getElementById('Text_OrderStatusID').value

    const data = {
      orderID,
      customerID,
      customerName,
      customerPhone,
      customerAddress,
      customerEmail,
      orderStatusID,
      orderStatusName: 'string',
      orderDetails: [],
    }

    fetch('https://localhost:7014/api/Order/UpdateOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        handleCloseUpdate()
        alert('Sửa thành công')
        fetchOrders()
      })
      .catch((error) => {
        // Xử lý lỗi khi gửi yêu cầu lên server
      })
  }
  //Api Fillter Orders By OrderStatus

  const [OrderStatusIdMap, setOrderStatusIdMap] = useState({})

  const handleOrderChange = async (OrderId) => {
    try {
      const response = await fetch(
        `https://localhost:7014/api/Order/GetOrdersByOrderStatus/${OrderId}`,
      )
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="Title_Order">
              <strong>Đơn hàng</strong>
            </div>
            <div className="Select_OrderStatus">
              <Form.Control
                value={selectedOrder ? selectedOrder.orderStatusName : ''}
                onChange={(e) => {
                  const orderstatusId = OrderStatusIdMap[e.target.value]
                  setSelectedOrder({
                    ...selectedOrder,
                    orderStatusID: orderstatusId,
                    orderStatusName: e.target.value,
                  })
                  handleOrderChange(orderstatusId)
                }}
                style={{ width: '300px' }}
                as="select"
              >
                <option value="" disabled>
                  Select an order status
                </option>
                {dataorderstatus.map((item) => (
                  <option key={item.orderStatusID} value={item.orderStatusName}>
                    {item.orderStatusName}
                  </option>
                ))}
              </Form.Control>
            </div>
          </CCardHeader>
          <CCardBody>
            <Table striped bordered hover>
              <thead>
                <tr style={{ fontSize: '14px' }}>
                  <th>Số thứ tự</th>
                  <th> Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Email</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Sản phẩm mua</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
                  .map((order, index) => (
                    <tr style={{ fontSize: '13px' }} key={order.orderID}>
                      <td>{currentPage * PER_PAGE + index + 1}</td>
                      <td>{order.customerName}</td>
                      <td>{order.customerPhone}</td>
                      <td>{order.customerAddress}</td>
                      <td>{order.customerEmail}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
                      <td>{order.orderStatusName}</td>
                      <td
                        onClick={() => {
                          setSelectedOrder(order)
                          handleShowSecond()
                        }}
                      >
                        Xem chi tiết
                      </td>
                      <Modal
                        style={{ background: 'none' }}
                        show={showSecond}
                        onHide={handleCloseSecond}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Tên sản phẩm</th>
                                <th>Phiên bản</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedOrder &&
                                selectedOrder.orderDetails &&
                                selectedOrder.orderDetails.map((detail) => (
                                  <tr key={detail.orderID}>
                                    <td style={{ fontSize: '13.5px' }}>{detail.productName}</td>
                                    <td style={{ fontSize: '13.5px' }}>{detail.varrianname}</td>
                                    <td>{detail.quantity}</td>
                                    <td>
                                      <td>
                                        {detail.price.toLocaleString('vi-VN', {
                                          style: 'currency',
                                          currency: 'VND',
                                        })}
                                      </td>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseSecond}>
                            Đóng
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <td style={{ textAlign: 'center' }}>
                        <GrUpdate
                          onClick={() => {
                            setSelectedOrder(order)
                            handleOpenUpdate()
                          }}
                        />
                        <FaPrint
                          onClick={() => {
                            printOrder(order.orderID)
                          }}
                          style={{ marginLeft: '10px' }}
                        />
                      </td>

                      <Modal
                        style={{ background: 'none' }}
                        show={showUpdate}
                        onHide={handleCloseUpdate}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title> Sửa thông tin đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Control
                            id="Text_OrderID_edit"
                            type="hidden"
                            placeholder=""
                            defaultValue={selectedOrder?.orderID}
                            autoFocus
                          />
                          <Form.Control
                            id="Text_CustomerID_edit"
                            type="hidden"
                            placeholder=""
                            defaultValue={selectedOrder?.customerID}
                            autoFocus
                          />
                          <Form.Label> Tên khách hàng</Form.Label>
                          <Form.Control
                            id="Text_CustomerName_edit"
                            type="text"
                            placeholder=""
                            value={selectedOrder?.customerName}
                            onChange={(event) =>
                              setSelectedOrder({
                                ...selectedOrder,
                                customerName: event.target.value,
                              })
                            }
                            autoFocus
                          />

                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                              id="Text_CustomerPhone_edit"
                              type="text"
                              placeholder=""
                              value={selectedOrder?.customerPhone}
                              onChange={(event) =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  customerPhone: event.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                              id="Text_CustomerAdrress_edit"
                              type="text"
                              placeholder=""
                              value={selectedOrder?.customerAddress}
                              onChange={(event) =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  customerAddress: event.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              id="Text_CustomerEmail_edit"
                              type="text"
                              placeholder=""
                              value={selectedOrder?.customerEmail}
                              onChange={(event) =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  customerEmail: event.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Control
                            style={{ width: '300px', textAlign: 'center', margin: '0px auto' }}
                            as="select"
                            id="Text_OrderStatusID"
                            value={selectedOrder?.orderStatusId}
                            onChange={(event) =>
                              setSelectedOrder({
                                ...selectedOrder,
                                orderStatusId: event.target.value,
                              })
                            }
                          >
                            {dataorderstatus.map((item) => (
                              <option
                                key={item.orderStatusId}
                                value={item.orderStatusID}
                                selected={selectedOrder?.orderStatusId === item.orderStatusID}
                              >
                                {item.orderStatusName}
                              </option>
                            ))}
                          </Form.Control>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseUpdate}>
                            Đóng
                          </Button>
                          <Button onClick={updateOrder} variant="primary">
                            Thêm
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center my-3">
              {/* Phân trang */}
              <ReactPaginate
                //...
                pageCount={totalPages}
                initialPage={currentPage}
                pageRangeDisplayed={pagesToShow}
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                breakLabel="..."
                breakClassName="page-item disabled"
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                disabledClassName="disabled"
                previousLabel="Previous"
                nextLabel="Next"
                renderPageNumbers={() => {
                  return pageRange.map((page) => {
                    return (
                      <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                      >
                        <a className="page-link" onClick={() => setCurrentPage(page)}>
                          {page + 1}
                        </a>
                      </li>
                    )
                  })
                }}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
