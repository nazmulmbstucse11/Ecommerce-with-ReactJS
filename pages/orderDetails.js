import { cartcontext } from "./context";
import React, { useContext } from "react";
import { Container, Row, Col, Table, Button } from 'reactstrap';

export default function OrderDetails() {

  const { formData, orderItems } = useContext(cartcontext);

  const subTotal = orderItems.reduce((price, item) => price + item.quantity * item.price, 0);
  const tax = (subTotal * 15) / 100;
  const grandTotal = subTotal + tax;

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  let i = 1;

  return (
    <div>
      <Container fluid className="mb-5 mt-3">

        <Row className="d-flex align-items-baseline">
          <Col md={10}>
            <h4 className="leftMargin" style={{ color: "black" }}>Invoice//#SO@{date}&1</h4>
          </Col>

          <Col md={2} className="float-end d-flex align-items-baseline">
            <a className="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark"><i
              className="fas fa-print text-primary"></i> Print</a>
            <a className="btn btn-light text-capitalize" data-mdb-ripple-color="dark"><i
              className="far fa-file-pdf text-danger"></i> Export</a>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col md={12}>
            <div className="text-center">
              <i className="fa fa-car" style={{ color: "black", fontSize: "40px" }}></i>
              <p className="pt-0">www.ecommerce.bd.com</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={10}>
            <ul className="list-unstyled leftMargin">
              <li className="text-muted">To: <span style={{ color: "red" }}>{formData.name}</span></li>
              <li className="text-muted"><i className="fa fa-home"></i> {formData.address}</li>
              <li className="text-muted"><i className="fa fa-phone"></i> {formData.phone}</li>
              <li className="text-muted"><i className="fa fa-envelope"></i> {formData.email}</li>
            </ul>
          </Col>

          <Col md={2}>
            <ul className="list-unstyled">
              <li className="text-muted"><span style={{ color: "red" }}>Invoice</span></li>
              <li className="text-muted"><i className="fa fa-circle"></i> <span
                className="fw-bold">ID: </span>#SO@{date}&1</li>
              <li className="text-muted"><i className="fa fa-circle"></i> <span
                className="fw-bold">Creation Date: </span>{date}</li>
              <li className="text-muted"><i className="fa fa-circle"></i> <span
                className="me-1 fw-bold">Status:</span><span className="badge bg-warning text-black fw-bold">
                  Unpaid</span></li>
            </ul>
          </Col>
        </Row>

        <Row className="my-2 mx-1 justify-content-center">
          <Col md={12}>
            <Table striped bordered hover responsive>

              <thead style={{ backgroundColor: "gray" }} className="text-white">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Products</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>

              <tbody>
                {orderItems.map((prod) => (

                  <tr key={prod.id}>
                    <th scope="row">{i++}</th>
                    <td>{prod.name}</td>
                    <td>{prod.quantity}</td>
                    <td>${prod.price}</td>
                    <td>${prod.quantity}*{prod.price}</td>
                  </tr>
                ))}
              </tbody>

            </Table>
          </Col>
        </Row>

        <Row>
          <Col md={9}>
            <p className="ms-3">You can payment online via bKash, rocket, nagad or to our delivery man</p>
          </Col>

          <Col md={3}>
            <ul className="list-unstyled">
              <li className="text-muted ms-3"><span className="text-black me-2">Sub Total =</span>${subTotal}</li>
              <li className="text-muted ms-3"><span className="text-black me-2">Tax(15%) =</span>${tax}</li>
            </ul>
            <p className="text-black float-start"><span className="text-black me-2">Grand Total =</span><span>${grandTotal}</span></p>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col md={10}>
            <p className="leftMargin">Thank you for your purchase</p>
          </Col>

          <Col md={2}>
            <Button type="button" color="primary" onClick={() => alert('See you letter')}>Pay Now</Button>
          </Col>
        </Row>

      </Container>
    </div>
  )
}