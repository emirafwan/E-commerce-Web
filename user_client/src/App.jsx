// import Home from "./pages/Home"
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products"
import Cart from "./components/cart/Cart"
import Checkout from "./components/checkoutForm/checkout/Checkout";
import Login from "./components/loginRegister/Login";
import Register from "./components/loginRegister/Register";
import ProductTable from "./components/tables/product/ProductTable";
import AddressForm from "./components/tables/salesReport/AddressForm";
import SalesReport from "./components/tables/salesReport/SalesReport";
import BranchTable from "./components/tables/branch/BranchTable";
import ResponsiveDrawer from "./layout/ResponsiveDrawer";

import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {


    // const products = [
    //     {id:1, name:'Magic-Mouse', description:'magic mouse with 1ms response time.', price:'$50', image:'https://macstore.id/konten/uploads/2018/08/MRME2_AV1-1.jpg'},
    //     {id:2, name:'Bi-Headphone', description:'comfort way to hear music', price:'$15', image: 'https://i5.walmartimages.com/asr/4fe97836-61ac-43f4-9435-549ea693e793_1.b71a34c39acf22b59157d031ffac43e2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},
    //     {id:3, name:'Mentega', description:'Blue Band Mentega [200gr].', price:'$3', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//90/MTA-7138125/blue_band_blue_band_mentega_serbaguna_-200gr-_full05_d3e66wvi.jpg'},
    //     {id:4, name:'Saos Pedas', description:'ABC Saus Pedas [335 mL].', price:'$0.4', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-12133651/abc_saus_sambal_abc_sambal_asli_sauce_saos_sambal_335ml_full02_faksfc3z.jpg'},
    //     {id:5, name:'Kecap', description:'Kecap Bango 135ml.', price:'$1', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/MTA-11707649/bango_bango_kecap_manis_275_ml_full02_k45lbfna.jpeg'},
    //     {id:6, name:'Garam', description:'Refina Garam Meja Reffil 250 Gr.', price:'$0.5', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//89/MTA-11324276/refina_refina-garam-meja-reffil-250-gr_full01.jpg'},
    //     {id:7, name:'Saos Tomat', description:'ABC Saus Tomat [335 mL].', price:'$0.3', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-3939155/abc_abc_saus_tomat_335ml_full02.jpg'},
    // ]

    // const products = [
    //     {id:1, name:'Minyak goreng', description:'minyak goreng Bimoli 2 Liter.', price:'$2', image:'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/1/21/941cce47-8898-41e0-be56-a973b36d77df.jpg'},
    //     {id:2, name:'Gula Pasir', description:'GULAKU Premium Gula Pasir 1 kg', price:'$1', image: 'https://www.kiozorenz.com/image-product/img4918-1586591386.jpg'},
    //     {id:3, name:'Mentega', description:'Blue Band Mentega Serbaguna [200gr].', price:'$3', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//90/MTA-7138125/blue_band_blue_band_mentega_serbaguna_-200gr-_full05_d3e66wvi.jpg'},
    //     {id:4, name:'Saos Pedas', description:'ABC Saus Pedas [335 mL].', price:'$0.4', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-12133651/abc_saus_sambal_abc_sambal_asli_sauce_saos_sambal_335ml_full02_faksfc3z.jpg'},
    //     {id:5, name:'Kecap', description:'Kecap Bango 135ml.', price:'$1', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/MTA-11707649/bango_bango_kecap_manis_275_ml_full02_k45lbfna.jpeg'},
    //     {id:6, name:'Garam', description:'Refina Garam Meja Reffil 250 Gr.', price:'$0.5', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//89/MTA-11324276/refina_refina-garam-meja-reffil-250-gr_full01.jpg'},
    //     {id:7, name:'Saos Tomat', description:'ABC Saus Tomat [335 mL].', price:'$0.3', image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-3939155/abc_abc_saus_tomat_335ml_full02.jpg'},
    // ]
    
    // console.log(products)


    const [products, setProducts] = useState([])
    const [carts, setCarts] = useState({})

    const fetchProducts = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }, 
        }
    
        const response = await fetch("http://localhost:8000/api/products", requestOptions)
            const data = await response.json()
            
        if (!response.ok) {
            console.log(data.detail);
        } else {
            console.log(data)
        }
        
        setProducts(data.data)
    }

    
    const fetchCarts =  async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }, 
        }
    
        const response = await fetch("http://localhost:8000/api/carts", requestOptions)
            const data = await response.json()
            
        if (!response.ok) {
            console.log("something wrong");
            // console.log(data.detail);
        } else {
            console.log(data)
        }
        setCarts(data.data)
    }

    const handleAddToCart = async (_id, quantity) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId:_id, quantity:quantity }), 
        }
    
        const response = await fetch("http://localhost:8000/api/carts/add", requestOptions)
            const data = await response.json()
            
        if (!response.ok) {
            console.log(data.detail);
        } else {
            console.log(data)
        }
        setCarts(data.data)
    }

    const handleUpdateQty = async (_id, quantity) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id:_id, quantity:quantity }), 
        }
    
        const response = await fetch("http://localhost:8000/api/carts/update", requestOptions)
            const data = await response.json()
            
        if (!response.ok) {
            console.log(data.detail);
        } else {
            console.log(data)
        }
        setCarts(data.data)
    }

    const handleURemoveCart = async (_id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id:_id }), 
        }
    
        const response = await fetch("http://localhost:8000/api/carts/delete", requestOptions)
            const data = await response.json()
            
        if (!response.ok) {
            console.log(data.detail);
        } else {
            console.log(data)
        }
        setCarts(data.data)
    }


    const handleEmptyCart = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }
    
        const response = await fetch("http://localhost:8000/api/carts/empty", requestOptions)
            const data = await response.json()
            
        if (!response.ok) {
            console.log(data.detail);
        } else {
            console.log(data)
        }
        setCarts(data.data)
    }

    const refreshCart = async () => {
        handleEmptyCart();
    }

    useEffect(() => {
        fetchProducts()
        fetchCarts()
    }, [])

    const totalItems = carts[1]
    const totalPrice = carts[2]

    return (
        <Router>
            <div>
                {/* <Navbar totalItems={totalItems}/> */}
                <Routes >
                    <Route exact path="/" element={
                        <>
                            <Navbar totalItems={totalItems}/>
                            <Products products={products} onAddToCart={handleAddToCart} /> 
                        </>
                    } />

                    <Route exact path="/Checkout" element={
                        <>
                            <Navbar totalItems={totalItems}/>
                            <Checkout cart={carts[0]} totalPrice={totalPrice} refreshCart={refreshCart}/>
                        </>
                    } />

                    <Route exact path="/Cart" element={
                        <>
                            <Navbar totalItems={totalItems}/>
                            <Cart 
                                cart={carts[0]} 
                                totalPrice={totalPrice} 
                                handleUpdateQty={handleUpdateQty}    
                                handleURemoveCart={handleURemoveCart}    
                                handleEmptyCart={handleEmptyCart}    
                            />
                        </>
                    } />

                    <Route path="/Dashboard" element={
                        <>
                            <ResponsiveDrawer />
                            <AddressForm  /> 
                        </>
                    } />
                    <Route path="/Dashboard/SalesReport" element={
                        <>
                            <ResponsiveDrawer />
                            <SalesReport  /> 
                        </>
                    } />
                    <Route path="/Dashboard/ProductTable" element={
                        <>
                            <ResponsiveDrawer />
                            <ProductTable  /> 
                        </>
                    } />
                    <Route path="/Dashboard/BranchTable" element={
                        <>
                            <ResponsiveDrawer />
                            <BranchTable  /> 
                        </>
                    } />
                    
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;