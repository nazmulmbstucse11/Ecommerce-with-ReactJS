import { Button } from "reactstrap";
import { useContext } from "react";
import { cartcontext } from "../context";
import Image from "next/image";

export default function IndividualProduct({ details }) {

    const { addItem, setTotal } = useContext(cartcontext);

    return (
        <div>
            <h4 style={{ textAlign: 'center' }}>Product Description</h4>
            <hr />
            <div className="itemContainer">

                <div className="itemImage">
                    <Image
                        src={details.image}
                        alt={details.name}
                        width="350px"
                        height="400px"
                    />
                </div>

                <div className="itemDesPos">
                    <div className="itemDes">
                        <p className="productInfo">NEW</p>
                        <h4>Product Name: {details.name}</h4>
                        <h5>Product Code: ISRT@{details.name}</h5>
                        <Image src="/images/rate.png"
                            alt="none"
                            height='40px'
                            width='150px'
                            margin-left='-18px' />
                        <p className="price">USD ${details.price}</p>
                        <p><b>Availability:</b> In Stoke</p>
                        <p><b>Condition:</b> New</p>
                        <p><b>Barnd:</b> ABC Company</p>
                        <Button color="primary" size="md" block onClick={() => { addItem(details); setTotal(); }}>Add to Cart</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

// Get product by id using getStaticProps from localhost api
export const getProductById = async (productId) => {

    const data = await fetch("http://localhost:3000/api/getProduct");
    const productData = await data.json();

    return productData.find(product => product.id === productId);
}

export const getServerSideProps = async (context) => {

    const productId = context.params.productId;
    const details = await getProductById(productId);

    return {
        props: {
            details
        },
    };
};

/*
export const getStaticProps = async (context) => {

    const productId = context.params.productId;
    const details = await getProductById(productId);

    return {
        props: {
            details
        },
    };
};

export const getStaticPaths = async () => {

    const data = await fetch("http://localhost:3000/api/getProduct");
    const productData = await data.json();

    const paths = productData.map((data) => ({
        params: { productId: data.id.toString() }
    }))

    return { paths, fallback: false }
}
*/