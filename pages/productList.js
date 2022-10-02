import React, {useContext, useCallback, useState, lazy, Suspense } from "react";
import { useRouter } from "next/router";
import { cartcontext } from "./context";
const Portal = lazy(() => import("./portal"));
import Pagination from "./pagination";
import { Card, CardBody, CardTitle, Button, Row, Col, Container } from 'reactstrap';

export default function ProductList({ productData }) {

  // Context data
  const { addItem, setTotal } = useContext(cartcontext);

  // Filtering according to category
  const [data, setData] = useState(productData);

  const filterResult = (cartCategory) => {
    const result = productData.filter((prod) => {
      return prod.category == cartCategory;
    })

    setData(result);
  }

  // Showing product as a portal
  const [showPortal, setShowPortal] = useState(false);
  const [portalProduct, setPortalProduct] = useState([]);

  const goPortal = ((productItem) => {
    setShowPortal(true);
    setPortalProduct(productItem);
  });

  // Viewing Individual product 
  const router = useRouter();

  const viewProductDetails = useCallback((productId) => {
    router.push(`/product/${productId}`);
  }, [router]);

  // Paging perpage 8 products
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);


  // Get current products
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get product according to paging after filtering
  const productElement = currentProducts.map((productItem) => {

    return (
      <div key={productItem.id}>
        <Card style={{ width: '240px', margin: '10px' }}>

          <CardBody>
            <CardTitle tag="h5">
              {productItem.name}
            </CardTitle>
          </CardBody>

          <img
            onClick={() => viewProductDetails(productItem.id)} style={{ cursor: 'pointer' }}
            alt={productItem.name}
            src={productItem.image}
            width="100%"
            height="150px"
          />

          <CardBody>
            <Row className="align-items-center">
              <Col xs={9}>
                <h6>${productItem.price}</h6>
              </Col>

              <Col xs={3}>
                <Button className="rounded-circle" outline size="sm" onClick={() => { addItem(productItem); setTotal(); }}>
                  <img
                    alt={productItem.name}
                    src="/images/cart-logo.png"
                    width="30px"
                    height="30px"
                    className="rounded-circle"
                  />
                </Button>
              </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Button outline size="md" block color="primary" onClick={() => goPortal(productItem)}>Quick View</Button>
            </Row>
          </CardBody>

        </Card>
      </div>
    )
  });


  return (
    <div>
      <div className="productHome">

        <div className='productFilter'>
          <Button color="secondary" size="md" block type="button" style={{ marginBottom: "5px" }} onClick={() => setData(productData)}>All</Button>
          <Button color="secondary" size="md" block type="button" style={{ marginBottom: "5px" }} onClick={() => filterResult('race')}>Race Car</Button>
          <Button color="secondary" size="md" block type="button" style={{ marginBottom: "5px" }} onClick={() => filterResult('personal')}>Personal Car</Button>
        </div>

        <div className="productContainer">
          {productElement}
        </div>
      </div>

      <Suspense fallback={<div>Loading......</div>}>
        <Portal show={showPortal} onClose={() => setShowPortal(false)} item={portalProduct} />
      </Suspense>

      <Container className="d-flex justify-content-center" style={{ marginBottom: "10px" }}>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
        />
      </Container>

    </div>
  )
}