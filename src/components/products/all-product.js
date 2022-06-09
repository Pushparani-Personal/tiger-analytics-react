import React, { useEffect, useState } from 'react';
import { getProduct } from '../../reducer-saga/action';
import { useDispatch , useSelector } from 'react-redux';
import './product.css';
import CreateProduct from '../createProduct/createProduct';
import EditProduct from '../eidtProduct/editProduct';

function AllProducts() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.retail.products);
    const loading = useSelector(state => state.retail.loading);
    const [isSearch, setSearch] = useState(false);
    const error = useSelector(state => state.retail.error);
    const [displayProduct, setDisplayProduct] = useState();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const togglePopupEdit = (product) => {
        setSelectedProduct(product);
        setIsOpenEdit(!isOpenEdit);
    }

    useEffect(() => {
        dispatch(getProduct());
    }, [])

    const onChange = (event) => {
        setDisplayProduct();
    }

    const onSearchProduct = (element) => {
        setSearch(true);
        let filter = element.target.value.toLowerCase()
        let resultProduct = products.filter((product) => {
        let dataFilter = product.productName.toLowerCase()
            return dataFilter.indexOf(filter) !== -1
        })
        setDisplayProduct(resultProduct);
    }

    const onSearchStore = (element) => {
        setSearch(true);
        let filter = element.target.value.toLowerCase()
        let resultProduct = products.filter((product) => {
        let dataFilter = product.storeId.toLowerCase()
            return dataFilter.indexOf(filter) !== -1
        })
        setDisplayProduct(resultProduct);
    }

    return(
        <div className="mainContainer">
            <h1><b className="heading">TIGER ANALYTICS - CASE STUDY</b></h1>
            <div className="searchContainer">
                <div className="search">
                    <input type="text" className="searchText"
                        id="productName"
                        placeholder="Search by Product Name"
                        onClick={onChange}
                        onChange={onSearchProduct}
                        />
                    <img src="search.png" alt="search" className="searchImage" />         
                </div>
                <div className="search">
                    <input type="text" className="searchText"
                        placeholder="Search by Store ID"
                        onClick={onChange}
                        onChange={onSearchStore}
                        /> 
                    <img src="search.png" alt="search" className="searchImage" />  
                </div>

                <button className="createProduct" onClick={togglePopup}>Create New Product</button>
            </div>

            <div className="productContainer">
                { loading && <h1>Loading.....</h1> }
                { error && error != null && <h1>{error}</h1>}
                {
                    !isSearch && products && products.length > 0 &&

                    <div className="row">
                        {
                            products.map((product, index) =>
                            <div className="coulmn">
                                <div className="cardGroupRow">
                                    <div className="card" key={index} onClick={() => togglePopupEdit(product)}>
                                        <img src={product.imageUrl} alt="test" className="cardImage"/>
                                        <div className="container">
                                            <h3><b>{product.productName}</b></h3> 
                                            <p>Price: <span>&#8377;</span>{product.price}</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>        
                            )
                        }
                    </div>
                }

                {
                    isSearch && displayProduct && displayProduct.length > 0 &&
                    <div className="row">
                        {
                            displayProduct.map((product, index) =>
                            <div className="coulmn">
                                <div className="cardGroupRow">
                                    <div className="card" key={index} onClick={togglePopupEdit}>
                                        <img src={product.imageUrl} alt="test" className="cardImage"/>
                                        <div className="container">
                                            <h3><b>{product.productName}</b></h3> 
                                            <p>Price: <span>&#8377;</span>{product.price}</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>        
                            )
                        }
                    </div>
                }
            </div>

            {isOpen && <CreateProduct handleClose={togglePopup} /> }

            {isOpenEdit && <EditProduct content={selectedProduct} handleClose={togglePopupEdit} /> }
        </div>
    )
}

export default AllProducts;