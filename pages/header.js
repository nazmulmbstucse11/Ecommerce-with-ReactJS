import Link from 'next/link';
import { Navbar, NavbarBrand, Container } from 'reactstrap';
import { cartcontext } from "./context";
import React, { useContext } from "react";

export default function Header() {

    const { totalItem } = useContext(cartcontext);

    return (
        <div style={{backgroundColor: "white"}}>
            <h4 style = {{ textAlign: "center" }}>ReactJS NextJS Ecommerce Project</h4>
            <hr />
            <Container fluid style={{ display: "flex", height: "40px", margin: "0"}}>

                <Container fluid className='leftIcon'>
                    <Navbar style={{ alignContent: "center" }}>

                        <NavbarBrand>
                            <Link href="/">
                                <a><img src="/images/car-logo.png" alt="" width="70px" height="70px" /></a>
                            </Link>
                        </NavbarBrand>

                    </Navbar>
                </Container>

                <Container fluid className='rightIcon'>
                    <Navbar style={{ alignContent: "center" }}>

                        <NavbarBrand>
                            <Link href="/cart">
                                <a><img src="/images/cart-logo.png" alt="" width="55px" height="55px" />
                                    <span style={{ verticalAlign: "super" }} >{totalItem === 0 ? "" : totalItem}</span>
                                </a>
                            </Link>
                        </NavbarBrand>

                        <NavbarBrand>
                            <Link href="/myOrders">
                                <a><img src="/images/order.png" alt="" width="60px" height="60px" /></a>
                            </Link>
                        </NavbarBrand>

                    </Navbar>
                </Container>

            </Container>
            <hr />
        </div>
    );
}
