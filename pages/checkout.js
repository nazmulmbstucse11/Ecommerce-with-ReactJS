import { useState, useEffect } from "react";
import { cartcontext } from "./context";
import React, { useContext } from "react";
import { Row, Col, ListGroup, ListGroupItem, Button, Container, FormGroup, Form, Label, Input } from "reactstrap";
import { useRouter } from 'next/router';

export default function Checkout() {

    const { cartItems, totalAmount, setFormData, setOrder } = useContext(cartcontext);

    // Form data setting and go orderDeatils page
    const initialValues = { name: "", email: "", phone: "", address: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const [formErrors, setFormErrors] = useState({});

    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        setFormData(formValues);

        if (formValues.name && formValues.phone && formValues.email && formValues.address) {
            setOrder();
            router.push('/orderDetails')
        }
    };

    // Form validation
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            //console.log("from check", formValues);
        }
    }, [formErrors]);

    const validate = (values) => {

        const errors = {};
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const phone_regex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

        if (!values.name) {
            errors.name = "Name is required!";
        }

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!email_regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

        if (!values.phone) {
            errors.phone = "Phone is required";
        } else if (!phone_regex.test(values.phone)) {
            errors.phone = "This is not a valid phone format!";
        }

        if (!values.address) {
            errors.address = "Address is required!";
        }

        return errors;
    };

    return (
        <div className="checkHome">

            <div className="checkForm">
                <Container>
                    <h2>Customer Information</h2>

                    <Form onSubmit={handleSubmit}>

                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formValues.name}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <p>{formErrors.name}</p>

                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <p>{formErrors.email}</p>

                        <FormGroup>
                            <Label>Phone</Label>
                            <Input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formValues.phone}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <p>{formErrors.phone}</p>

                        <FormGroup>
                            <Label>Address</Label>
                            <Input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formValues.address}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <p>{formErrors.address}</p>

                        <Button type="submit">Submit</Button>

                    </Form>
                </Container>
            </div>

            <div className="checkData">
                <Container>
                    <ListGroup>

                        <ListGroupItem>
                            <Row className="align-items-center">

                                <Col className="d-flex justify-content-center" xs={3}>
                                    <h6>Product</h6>
                                </Col>

                                <Col className="d-flex justify-content-center" xs={3}>
                                    <h6>Price</h6>
                                </Col>

                                <Col className="d-flex justify-content-center" xs={3}>
                                    <h6>Quantity</h6>
                                </Col>

                                <Col className="d-flex justify-content-center" xs={3}>
                                    <h6>Total</h6>
                                </Col>

                            </Row>
                        </ListGroupItem>

                        {cartItems.map((prod) => (
                            <ListGroupItem key={prod.id}>
                                <Row className="align-items-center">

                                    <Col className="d-flex justify-content-center" xs={3}>
                                        {prod.name}
                                    </Col>

                                    <Col className="d-flex justify-content-center" xs={3}>
                                        ${prod.price}
                                    </Col>

                                    <Col className="d-flex justify-content-center" xs={3}>
                                        {prod.quantity}
                                    </Col>

                                    <Col className="d-flex justify-content-center" xs={3}>
                                        ${prod.price}* {prod.quantity}
                                    </Col>

                                </Row>
                            </ListGroupItem>
                        ))}

                        <ListGroupItem>
                            <Row className="align-items-center">

                                <Col className="d-flex justify-content-center" xs={9}>
                                    Grandtotal
                                </Col>

                                <Col className="d-flex justify-content-center" xs={3}>
                                    ${totalAmount}
                                </Col>

                            </Row>
                        </ListGroupItem>

                    </ListGroup>
                </Container>
            </div>

        </div>
    );
}