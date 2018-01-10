import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_PURCHASES = 'GET_PURCHASES'
const DELETE_ORDER = 'DELETE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const ADD_ORDER = 'ADD_ORDER'

/**
 * INITIAL STATE
 */
const defaultPurchases = []

/**
 * ACTION CREATORS
 */

 const getPurchases = (purchases) => ({type: GET_PURCHASES, purchases})
 const deletePurchase = (id) => ({type: DELETE_ORDER, id})
 const updateOrder = (changes) => ({type: UPDATE_ORDER, changes})
 const addOrder = (purchase) => ({type: ADD_ORDER, purchase})

/**
 * THUNK CREATORS
 */

  export const GetPurchasesAll = () =>
  dispatch =>
    axios.get(`/purchases/`)
      .then(res => {
        dispatch(getPurchases(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

 export const GetUnorderedPurchasesUser = (userId) =>
   dispatch =>
     axios.get(`/purchases/user/cart/${userId}`)
       .then(res => {
         dispatch(getPurchases(res))
       })
       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

 export const GetOldPurchasesUser = (userId) =>
   dispatch =>
     axios.get(`/purchases/user/history/${userId}`)
       .then(res => {
         dispatch(getPurchases(res))
       })
       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const UpdatePurchase = (id, changes) =>
  dispatch =>
    axios.put(`/purchases/${id}`, changes)
      .then(updated => {
        dispatch(updateOrder(updated))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const AddPurchase = (purchaseInfo) =>
  dispatch =>
    axios.post(`/purchases/`, purchaseInfo)
      .then(res => {
        dispatch(addPurchase(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const DeletePurchase = (id) =>
  dispatch =>
    axios.delete(`/purchases/${id}`)
      .then(res => {
        dispatch(deletePurchase(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))


/**
 * REDUCER
 */
export default function (state = defaultPurchases, action) {
  switch (action.type) {
    case GET_PURCHASES:
      return action.purchases
    case DELETE_PURCHASE:
      return state.filter(v => v.id !== action.id)
    case UPDATE_PURCHASE:
      return state.map(v => {
        return (v.id === action.id) ? Object.assign({}, v, action.changes) : v
      })
    case ADD_PURCHASE:
      return state.concat(action.purchase)
    default:
      return state
  }
}