import React from 'react';
import Dashboard from './dashboard';

function Order(props) {
    console.log("order", props)
    return (
        <div className='product'>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title text">{props.productname}</h4>
                    <p class="card-text text1">Price:{" "} ₹{props.price}</p>
                    <p className='card-text text1'>Quantity:{" "}{props.quantity}</p>
                    {!props.payment ? <button className='btn btn-info btn-sm' onClick={() => { props.onbuy(props.orderid, props.userid, props.productid, props.quantity) }}>Buy now <i class="fa fa-truck" aria-hidden="true"></i></button> : ""}{" "}{!props.payment ? <button className='btn btn-danger btn-sm' onClick={() => { props.ondelete(props.orderid) }}>Delete <i class="fa fa-trash" aria-hidden="true"></i></button> : ""}
                </div>
            </div>
        </div>
    );
}
export default React.memo(Order);