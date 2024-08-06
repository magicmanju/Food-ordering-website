import { React, useState, useEffect, useContext, useCallback } from 'react';
import { usercontext } from './createcontext';
import Services from './services';
import Product from './product';
import { json } from 'react-router';

function Store(props) {
    let UserContext = useContext(usercontext)
    let [brands, setbrands] = useState([])
    let [category, setcategory] = useState([])
    let [products, setproducts] = useState([])
    let [productstoshow, setproductstoshow] = useState([])
    let [search, setsearch] = useState("")
    console.log("hi")
    console.log(products)

    useEffect(() => {
        let getproduct = async () => {
            let brandresponse = await fetch(`http://localhost:5000/brands`, { method: "GET" })
            let brandresponsebody = await brandresponse.json();
            brandresponsebody.forEach((brand) => {
                brand.ischecked = true;
            });
            setbrands(brandresponsebody)

            var catresponse = await fetch(`http://localhost:5000/categories`, { method: "GET" })
            let catresponsebody = await catresponse.json();
            catresponsebody.forEach((cat) => {
                cat.ischecked = true;
            });
            setcategory(catresponsebody)

            let productresponse = await fetch(`http://localhost:5000/product?productName_like=${search}`, { method: "GET" })
            let productresponsebody = await productresponse.json();
            productresponsebody.forEach((product) => {
                product.brand = getbrandbyid(brandresponsebody, product.brandid);
                product.category = getcatbyid(catresponsebody, product.categoryid);
                product.isordered = false;
            })
            setproducts(productresponsebody);
            setproductstoshow(productresponsebody)
        }
        getproduct()
    }, [search])
    console.log(products
    )
    let addtocart = (prod) => {
        (
            async () => {
                let neworder = {
                    userid: UserContext.user.userid,
                    productid: prod.id,
                    quantity: 1,
                    ispayment: false
                }
                let response = await fetch("http://localhost:5000/order", { method: "POST", body: JSON.stringify(neworder), headers: { "Content-Type": "application/json" } })
                if (response.ok) {
                    let responsebody = await response.json();
                    console.log(responsebody)
                    let prods = products.map((p) => {
                        if (p.id === prod.id) p.isordered = true;
                        return p;
                    })
                    setproducts(prods);
                    updateproducts();
                }
            }
        )();
    }
    let updateproducts = () => {
        setproductstoshow(products
            .filter((prod) => {
                return (category.filter((category) =>
                    category.id === prod.categoryid && category.ischecked == true
                ).length > 0
                )
            })
            .filter((prod) => {
                return (brands.filter((brand) => brand.id === prod.brandid && brand.ischecked === true).length > 0
                );
            })
        )
    }
    let updatebrand = (id) => {
        let branddata = brands.map((brd) => {
            if (brd.id == id) brd.ischecked = !brd.ischecked;
            return brd;
        })
        setbrands(branddata)
        updateproducts()
    }
    let updatecategory = (id) => {
        let catdata = category.map((cat) => {
            if (cat.id == id) cat.ischecked = !cat.ischecked;
            return cat;
        })
        setcategory(catdata)
        updateproducts()
    }
    let getbrandbyid = (brands, brandid) => {
        return brands.find((brand) =>
            brand.id === brandid
        )
    }
    let getcatbyid = (cat, catid) => {
        return cat.find((cat) =>
            cat.id === catid
        )
    }
    return (
        <div className='row'>
            <div className='searchbar bg-info row sticky-top'>
                <div className='col-lg-3'>
                    <h2 className='p-2'><i class="fa fa-shopping-basket" aria-hidden="true"></i> store</h2>
                </div>
                <div className='col-lg-9'>
                    <input type="search" className='col-lg-8 py-2 my-2 px-2' value={search} autoFocus='autofocus' onChange={(event) => {
                        setsearch(event.target.value);
                    }} placeholder='search' />
                </div>
            </div>
            <div className='col-lg-2
            border-start border-end mx-4 container-fluid card mb-2 sticky-top h-100'>
                <div class="">
                    <h3 className='border-bottom border-info border-4 px-4'>Brands</h3>
                    <ul>
                        {brands.map((brand) => (
                            <li className='' key={brand.id}><div class="list-group-item">
                                <input type="checkbox" class="form-check-input" name="" value="true" checked={brand.ischecked} id={`brands${brand.id}`} onChange={() => { updatebrand(brand.id) }} />
                                <label class="form-check-label px-2" htmlFor={`brands${brand.id}`}>
                                    {brand.brandname}
                                </label>
                                <hr />
                            </div></li>
                        )
                        )}
                    </ul>
                </div>
                <div class="">
                    <h3 className='border-bottom border-info border-4 px-4'>category</h3>
                    <ul>
                        {category.map((cat) => (
                            <li className='' key={cat.id}><div class="list-group-item">
                                <input type="checkbox" class="form-check-input" name="" value="true" checked={cat.ischecked} id={`cat${cat.id}`} onChange={() => { updatecategory(cat.id) }} />
                                <label class="form-check-label px-2" htmlFor={`category${cat.id}`}>
                                    {cat.categoryname}
                                </label>
                                <hr />
                            </div></li>
                        )
                        )}
                    </ul>
                </div>
            </div>
            <div className='col-lg-8 mx-4'>
                <div className='row'>
                    {productstoshow.length === 0 ? <div><center><h1>search is not matched</h1></center></div> : ""
                    }
                    {productstoshow.map((prod) => (

                        <Product key={prod.id} product={prod} addtocart={addtocart} />
                    ))}

                </div>

            </div>
        </div>
    );
}
export default Store;