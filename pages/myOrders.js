import { Container, Row, Col, Table, Button } from "reactstrap";
import { cartcontext } from "./context";
import React, { useContext } from "react";
import { useRouter } from "next/router";

export default function MyOrders() {

    const { formData, orderItems } = useContext(cartcontext);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const subTotal = orderItems.reduce((price, item) => price + item.quantity * item.price, 0);
    const tax = (subTotal * 15) / 100;
    const grandTotal = subTotal + tax;

    let i = 1;

    const router = useRouter();

    return (
        <div>
            {(formData.name && formData.phone && formData.email && formData.address) ? (
                <Container fluid className="mt-2">

                    <Row className="justify-content-center">
                        <Col className="text-center" md={12}>
                            <h3>{formData.name}, {formData.address}</h3>
                            <h5>Phone: {formData.phone}</h5>
                            <h5>Email: {formData.email}</h5>
                            <h4>Orders History</h4>
                        </Col>
                    </Row>

                    <hr />

                    <Row className="d-flex justify-content-center">
                        <Col md={12}>

                            <Table striped bordered hover responsive>
                                <thead style={{ backgroundColor: "gray" }} className="text-white">
                                    <tr>
                                        <th>Order Id</th>
                                        <th>Order Time</th>
                                        <th>Total</th>
                                        <th style={{ textAlign: "center" }}>Status</th>
                                        <th style={{ textAlign: "center" }}>Check Order</th>
                                    </tr>
                                </thead>

                                <tbody className="table-body">

                                    <tr className="cell-1">
                                        <td>#SO@{date}&{i++}</td>
                                        <td>Today, {date}</td>
                                        <td>${grandTotal}</td>
                                        <td><p className="tdUnpaid">Unpaid</p></td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button color="success" size="sm" type="button" onClick={() => router.push('/orderDetails')}>Order Details</Button>
                                        </td>
                                    </tr>

                                    <tr className="cell-1">
                                        <td>#SO@5/12/2020&{i++}</td>
                                        <td>05/12/2020</td>
                                        <td>$3000</td>
                                        <td><p className="tdPaid">Paid</p></td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button color="success" size="sm" type="button" onClick={() => alert('The old data has been removed.')}>Order Details</Button>
                                        </td>
                                    </tr>

                                    <tr className="cell-1">
                                        <td>#SO@5/12/2019&{i++}</td>
                                        <td>05/12/2019</td>
                                        <td>$2500</td>
                                        <td><p className="tdPaid">Paid</p></td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button color="success" size="sm" type="button" onClick={() => alert('The old data has been removed.')}>Order Details</Button>
                                        </td>
                                    </tr>

                                    <tr className="cell-1">
                                        <td>#SO@5/12/2018&{i++}</td>
                                        <td>05/12/2018</td>
                                        <td>$3500</td>
                                        <td><p className="tdPaid">Paid</p></td>
                                        <td style={{ textAlign: "center" }}>
                                            <Button color="success" size="sm" type="button" onClick={() => alert('The old data has been removed.')}>Order Details</Button>
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>

                        </Col>
                    </Row>
                </Container>

            ) : (<Container className="mt-5">
                <h3 className="text-center">Please, Place The Order</h3>
            </Container>)}

        </div>
    )
}