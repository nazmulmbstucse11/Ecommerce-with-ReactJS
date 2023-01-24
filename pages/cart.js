import { cartcontext } from "./context";
import React, { useContext } from "react";
import { ListGroup, ListGroupItem, Button, Row, Col, Container } from "reactstrap";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Cart() {

   const { cartItems, clearCart, removeItem, increment, decrement, totalItem, totalAmount } = useContext(cartcontext);

   const router = useRouter();

   return (
      <div className="cartHome">
         <div className="cartContainer">

            <Container>
               <h4 style={{ textAlign: 'center' }}>Cart Items List</h4>
               <hr />
               {cartItems.length > 0 ? (
                  <ListGroup>
                     {cartItems.map((prod) => (
                        <ListGroupItem key={prod.id}>
                           <Row className="align-items-center">

                              <Col className="d-flex justify-content-center">
                                 <Image
                                    alt={prod.name}
                                    src={prod.image}
                                    width="150px"
                                    height="100px"
                                 />
                              </Col>
                              <Col className="d-flex justify-content-center">
                                 {prod.name}
                              </Col>
                              <Col className="d-flex justify-content-center">
                                 ${prod.price}
                              </Col>

                              <Col className="d-flex justify-content-center" xs={1}>
                                 <Button color="success" onClick={() => increment(prod.id)}>+</Button>
                              </Col>
                              <Col className="d-flex justify-content-center" xs={1}>
                                 {prod.quantity}
                              </Col>
                              <Col className="d-flex justify-content-center" xs={1}>
                                 <Button color="warning" onClick={() => decrement(prod.id)}>-</Button>
                              </Col>
                              <Col className="d-flex justify-content-center">
                                 <Button color="danger" onClick={() => removeItem(prod.id)}>remove</Button>
                              </Col>

                           </Row>
                        </ListGroupItem>
                     ))}</ListGroup>
               ) : <h5 style={{ textAlign: 'center' }}>No Cart Item Added</h5>}

               {cartItems.length > 0 ? (
                  <div className="text-center" style={{ marginTop: "10px"}}>
                     <Button color="danger" type="button" onClick={() => clearCart()}>Clear Cart</Button></div>)
                  : ""}

            </Container>
         </div>

         <div className="cartAmount">
            <span className="title">Total {totalItem} items</span>
            <span style={{ fontWeight: 700, fontSize: 30 }}>Total:  ${totalAmount}</span>

            <Button type="button" color="secondary" disabled={cartItems.length === 0} onClick={() => router.push('/checkout')}>
               Proceed to Checkout
            </Button>
         </div>
      </div>
   )
}