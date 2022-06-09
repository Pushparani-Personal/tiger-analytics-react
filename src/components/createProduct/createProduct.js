import React, { useState } from 'react';
import './createProduct.css';
import * as constants from '../../reducer-saga/constants';

const apiUrl = constants.PRODUCT_URL;

function CreateProduct(props) {

    const [newProduct, setNewProduct] = React.useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        setNewProduct({
        ...newProduct,
        [e.target.id]: e.target.value.trim()
        });
    };

    function createNewProduct(data) {
        return fetch(apiUrl + 'create', {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json',
           },
           body: JSON.stringify(data),
       }).then(response => response.json())
       .then((result) => {
           if (result.status === '200') {
                setSuccess(result.message);
                setError('');
                setMessage('');
           } else {
                setSuccess('');
                setError(result.error);
                setMessage(result.message);
           }
       })
          
         .catch((error) => {throw error})
     }
    const handleSubmit = (e) => {
       createNewProduct(newProduct)
    };

    return(
        <div className="popup-box">
            <h1>Create New Product</h1>
            { success && <div className="successMessage">{success}</div> } 
            { error && <div className="errorMessage">{error}</div>}   
            { message && <div className="errorMessage">{message}</div>}  
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <div className="itemRow">
                <label className="itemRowLabel">Store ID</label><input type="text" className="itemRowText"
                            id="storeId"
                            placeholder="Store Id"
                            onChange={handleChange}
                            />
                </div>            
                <div className="itemRow">
                <label className="itemRowLabel">SKU</label><input type="text" className="itemRowText"
                            id="sku"
                            placeholder="SKU"
                            onChange={handleChange}
                            />
                </div>   
                <div className="itemRow">
                <label className="itemRowLabel">PRODUCT NAME</label> <input type="text" className="itemRowText"
                            id="productName"
                            placeholder="Product Name"
                            onChange={handleChange}
                            />
                </div>   
                <div className="itemRow">
                <label className="itemRowLabel">PRICE</label> <input type="text" className="itemRowText"
                            id="price"
                            placeholder="Price"
                            onChange={handleChange}
                            />
                </div>   
                <div className="itemRow">
                <label className="itemRowLabel">DATE</label> <input type="text" className="itemRowText"
                            id="date"
                            placeholder="DD/MM/YYYY"
                            onChange={handleChange}
                            />
                </div>  
                <div className="itemRow">
                <label className="itemRowLabel">DESCRIPTION</label><input type="text" className="itemRowText"
                            id="description"
                            placeholder="Description"
                            onChange={handleChange}
                            />
                </div>  
                <div className="itemRow">
                <label className="itemRowLabel">IMAGEURL</label><input type="text" className="itemRowText"
                            id="imageUrl"
                            placeholder="Image URL"
                            onChange={handleChange}
                            />
                </div>
            </div>
            <button className="submitButton" onClick={handleSubmit}>Create Product</button>            
        </div>
    )
}

export default CreateProduct;