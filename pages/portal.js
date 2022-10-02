import React, { useState, useEffect, useContext } from "react";
import { cartcontext } from "./context";
import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.css";
import { Button } from "reactstrap";

export default function Portal({ show, onClose, item }) {
    
    const { addItem, setTotal } = useContext(cartcontext);

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const portalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <div className={styles.modalHeader}>
                    <h3 style={{ float: "left" }}>Quick View</h3>
                    <Button color="danger" outline size="sm" style={{ float: "right" }} onClick={handleClose}>close</Button>
                </div>

                <div className={styles.modalBody}>

                    <div className={styles.productImage}>
                        <img src={item.image} alt={item.name}/>
                     </div>
                     
                     <div className={styles.productDes} style={{ textAlign: "center"}}>
                        <h5>Name: {item.name}</h5>
                        <h6>Price: ${item.price}</h6>
                        <h6>Description :</h6>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                           Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                           when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>

                </div>

                <div className={styles.modalFooter}>
                    <Button color="primary" size="md" block onClick={() => { addItem(item); setTotal(); }}>Add to Cart</Button>
                </div>

            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            portalContent,
            document.getElementById("portal-root")
        );
    }

    else {
        return null;
    }
}