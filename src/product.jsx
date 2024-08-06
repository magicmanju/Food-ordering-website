import { React, useState } from 'react';

function Product(props) {
    let [prod] = useState(props.product)
    return (
        <div className='col-lg-6 py-2 '>
            <div className='card'>
                <div className='card-body row'>
                    <div className='col-lg-6'>
                        <img src={prod.src} width={300 + 'px'} height={300 + 'px'} ></img>
                    </div>
                    <div className='col-lg-6 py-4 my-4'>
                        <h4> {prod.productName}</h4>
                        <div><h4>₹{prod.price.toFixed(2)}</h4></div>
                        <div>
                            {[...Array(prod.rating).keys()].map((n) => {
                                return <i class="fa fa-star text-warning" aria-hidden="true"></i>
                            })}
                            {[...Array(5 - prod.rating).keys()].map((n) => {
                                return <i class="fa fa-star-o text-warning" aria-hidden="true"></i>
                            })}
                        </div>
                        <div>#{prod.brand.brandname}{" "}#{prod.category.categoryname}</div>

                        <div className='float-right pt-4'>
                            {prod.isordered ? <span>Added to cart</span> : <button className='btn btn-info float-right' onClick={() => (props.addtocart(prod))}><i class="fa fa-cart-arrow-down" aria-hidden="true"></i> Add To Cart</button>}
                        </div>

                    </div>



                </div>
            </div>
        </div>
    );
}

export default Product;