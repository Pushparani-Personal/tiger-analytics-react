import React, { useState } from 'react';
import './editProduct.css';
import * as constants from '../../reducer-saga/constants';

const apiUrl = constants.PRODUCT_URL;

function EditProduct(props) {

    const intialValue = {
        storeId: props.content.storeId,
        sku: props.content.sku,
        productName: props.content.productName,
        price: props.content.price,
        date: props.content.date,
        description: props.content.description,
        imageUrl: props.content.imageUrl,
    }

    const [editProduct, setEditProduct] = useState(intialValue);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [message, setMessage] = useState();


    const handleChange = (propertyName) => (event) => {
        setEditProduct({
        ...editProduct,
        [propertyName]: event.target.value.trim()
        });
    };

    function updateProduct(data) {
        return fetch(apiUrl + 'update', {
           method: 'PUT',
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
        updateProduct(editProduct)
    };

    return(
        <div className="popup-box">
            <h1>Update Product</h1>
            { success && <div className="successMessage">{success}</div> } 
            { error && <div className="errorMessage">{error}</div>}   
            { message && <div className="errorMessage">{message}</div>}  
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <div className="editContainer">
                    <div className="imageDesc">
                        <img className="imageUrl" src={props.content.imageUrl} alt="product"></img>
                        <div dangerouslySetInnerHTML={{__html: props.content.description}}></div>
                    </div>
                    <div className="editRows">
                        <div className="itemRow">
                        <label className="itemRowLabel">Store ID</label><input type="text" className="itemRowText"
                                    id="storeId"
                                    value={editProduct.storeId}
                                    onChange={handleChange("storeId")}
                                    />
                        </div>            
                        <div className="itemRow">
                        <label className="itemRowLabel">SKU</label><input type="text" className="itemRowTextReadOnly"
                                    id="sku" readOnly="readOnly"
                                    value={editProduct.sku}
                                    />
                        </div>   
                        <div className="itemRow">
                        <label className="itemRowLabel">PRODUCT NAME</label> <input type="text" className="itemRowText"
                                    id="productName"
                                    value={editProduct.productName}
                                    onChange={handleChange("productName")}
                                    />
                        </div>   
                        <div className="itemRow">
                        <label className="itemRowLabel">PRICE</label> <input type="text" className="itemRowText"
                                    id="price"
                                    value={editProduct.price}
                                    onChange={handleChange("price")}
                                    />
                        </div>   
                        <div className="itemRow">
                        <label className="itemRowLabel">DATE</label> <input type="text" className="itemRowText"
                                    id="date"
                                    value={editProduct.date}
                                    onChange={handleChange("date")}
                                    />
                        </div>  
                        <div className="itemRow">
                        <label className="itemRowLabel">DESCRIPTION</label><input type="text" className="itemRowText"
                                    id="description"
                                    value={editProduct.description}
                                    onChange={handleChange("description")}
                                    />
                        </div>  
                        <div className="itemRow">
                        <label className="itemRowLabel">IMAGEURL</label><input type="text" className="itemRowText"
                                    id="imageUrl"
                                    placeholder="Image URL"
                                    value={editProduct.imageUrl}
                                    onChange={handleChange("imageUrl")}
                                    />
                        </div>
                    </div>
                </div>
            </div>
            <button className="submitButton" onClick={handleSubmit}>Edit Product</button>            
        </div>
    )
}

export default EditProduct;