import { call, put, takeEvery } from 'redux-saga/effects'
import * as constants from './constants';

const apiUrl = constants.PRODUCT_URL;

function fetchAllProduct() {
   return fetch(apiUrl + 'view', {
      method: 'GET',
  }).then(response => response.json())
    .catch((error) => {throw error})
}

function* fetchProduct() {
    try {
       const product = yield call(fetchAllProduct);
       yield put({type: constants.PRODUCT_SUCCESS, retailProduct: product});
    } catch (e) {
       yield put({type: constants.PRODUCT_FAIL, message: e.message});
    }
 }
 
 function* productSaga() {
    yield takeEvery(constants.PRODUCT_REQUEST, fetchProduct);
 }
 
 export default productSaga;