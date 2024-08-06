import { React, useContext, useEffect, useState, useCallback } from 'react';
import { usercontext } from './createcontext';
import Order from './order';
import { event } from 'jquery';

//getPreviousOrders
let getPreviousOrders = (orders) => {
    return orders.filter((ord) => ord.ispayment === true);
};

//getCart
let getCart = (orders) => {
    return orders.filter((ord) => ord.ispayment === false);
};

function Dashboard() {
    var [orders, setOrders] = useState([]);

    //get context
    let UserContext = useContext(usercontext);
    var loaddata = useCallback(async () => {
        let ordersResponse = await fetch("http://localhost:5000/order", { method: "GET" });
        if (ordersResponse.ok) {
            //status code is 200
            let ordersResponseBody = await ordersResponse.json();
            //get all data from products
            let productsResponse = await fetch("http://localhost:5000/product", {
                method: "GET",
            });
            if (productsResponse.ok) {
                let productsResponseBody = await productsResponse.json();
                ordersResponseBody.forEach((order) => {

                    order.product = productsResponseBody.find(
                        (prod) => prod.id == order.productid
                    );
                });
                setOrders(ordersResponseBody);
            };
        }

    }, [UserContext.user.userid]);
    var onbuy = useCallback(async (orderid, userid, productid, quantity) => {
        if (window.confirm("do you want to buy this product")) {
            let updateorder = {
                id: orderid,
                userid: userid,
                productid: productid,
                ispayment: true
            }
            let orderesponse = await fetch(`http://localhost:5000/order/${orderid}`, { method: "PUT", body: JSON.stringify(updateorder), headers: { "content-type": "application/json" } })
            let orderesponsebody = await orderesponse.json()
            if (orderesponse.ok) {
                console.log("hi")
                console.log(orderesponsebody)
                loaddata()
            }
        }

    }, [loaddata])
    var ondelete = useCallback(async (orderid) => {
        if (window.confirm("are you sure want to delete")) {
            let orderesponse = await fetch(`http://localhost:5000/order/${orderid}`, { method: "DELETE" })
            if (orderesponse.ok) {
                loaddata()
            }
        }

    }, [loaddata])

    //executes only once - on initial render =  componentDidMount
    useEffect(() => {
        document.title = "Dashboard - eCommerce";
        loaddata();
    }, [UserContext.user.userid, loaddata])

    return (
        <div className="row">
            <div className="col-12 py-3 header">
                <h4>
                    <i className="fa fa-dashboard"></i> Dashboard {" "}
                    <button className='btn btn-primary' onClick={loaddata}><i class="fa fa-refresh" aria-hidden="true"></i> refresh</button>
                </h4>
            </div>

            <div className="col-12 bg1">
                <div className="row">
                    {/* previous orders starts*/}
                    <div className="col-lg-6">
                        <h4 className="py-2 my-2 text-info border-bottom border-info">
                            <i className="fa fa-history"></i> Previous Orders{" "}
                            <span className="">
                                {getPreviousOrders(orders).length}
                            </span>
                        </h4>
                        {getPreviousOrders(orders).length === 0 ? (
                            <div className="text-danger">No Orders</div>
                        ) : (
                            ""
                        )}

                        {getPreviousOrders(orders).map((ord) => {
                            return (
                                <Order
                                    key={ord.id}
                                    userid={ord.userid}
                                    productid={ord.productid}
                                    orderid={ord.id}
                                    quantity={ord.quantity}
                                    productname={ord.product.productName}
                                    price={ord.product.price}
                                    rating={ord.product.rating}
                                    payment={ord.ispayment}
                                    onbuy={onbuy}
                                    ondelete={ondelete}
                                />
                            );
                        })}
                    </div>
                    {/* previous orders ends*/}

                    {/* cart starts*/}
                    <div className="col-lg-6">
                        <h4 className="py-2 my-2 text-primary border-bottom border-primary">
                            <i className="fa fa-shopping-cart"></i> Cart{" "}
                            <span className="">
                                {getCart(orders).length}
                            </span>
                        </h4>

                        {getCart(orders).length === 0 ? (
                            <div className="text-danger">No products in your cart</div>
                        ) : (
                            ""
                        )}

                        {getCart(orders).map((ord) => {
                            return (
                                <Order
                                    key={ord.id}
                                    userid={ord.userid}
                                    productid={ord.productid}
                                    orderid={ord.id}
                                    quantity={ord.quantity}
                                    productname={ord.product.productName}
                                    price={ord.product.price}
                                    rating={ord.product.rating}
                                    payment={ord.ispayment}
                                    onbuy={onbuy}
                                    ondelete={ondelete}
                                />
                            );
                        })}
                    </div>
                    {/* cart ends*/}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
