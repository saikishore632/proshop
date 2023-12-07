import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice'


const ProductScreen = () => {
    const { id: productId } = useParams();
    const { data: product, isLoading, error } = useGetProductsDetailsQuery(productId);
    
  return (
    <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {isLoading ? (  <h2>Loading...</h2> ) : error ? ( 
            <div>{ error?.data?.message || error.error}</div>
        ) : (
            <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>

                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                    
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>

                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>

                                    Status:
                                </Col>
                                <strong>
                                    ${product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </strong>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}
                            >
                                Add to Cart
                            </Button>
                        </ListGroup.Item>


                    </ListGroup>
                </Card>
            </Col>
        </Row>
        ) }
        
    </>
  );
};

export default ProductScreen