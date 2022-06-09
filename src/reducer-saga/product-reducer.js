import * as constants from './constants';

const initialState = {
    // Product initial state
    products: [],
    productError: null,
    isLoadProduct: true,
    loading: false,
}

const retailProducts = (state = initialState, action) => {
    switch (action.type) {
        case constants.PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                isLoadProduct: true,
            };
        case constants.PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoadProduct: true,
                products: action.retailProduct
            };
        case constants.PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                isLoadProduct: true,
                productError: action.message
            };
        default:
            return state        
    }
};

export default retailProducts;