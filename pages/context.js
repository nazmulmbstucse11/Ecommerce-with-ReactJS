import React, { createContext, useReducer, useEffect } from "react";
import {reducer} from "../reducer/reducer"

export const cartcontext = createContext();

export default function Context({ children }) {

  const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalItem: 0,
    formData:[],
    orderItems: []
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() =>{
    const data = window.localStorage.getItem('My-Next-Data');
    const stateData = JSON.parse(data);

    if(stateData !== null){
      dispatch({ 
        type: "INIT_STORED", 
        value: stateData,
     });
    }
 },[])

  useEffect(() =>{
     window.localStorage.setItem('My-Next-Data', JSON.stringify(state));
  },[state])

  const addItem = (id) => {
    return dispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  };

  const increment = (id) => {
    return dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  const decrement = (id) => {
    return dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  const removeItem = (id) => {
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const setTotal = () => {
    return dispatch({ type: "GET_TOTAL" });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cartItems]);

  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };

  const setOrder = () => {
    return dispatch({ type: "SET_ORDER" });
  };

  const setFormData = (id) => {
    return dispatch({ 
      type: "SET_FORM_DATA",
      payload: id,
     });
  };

  return (
    <cartcontext.Provider
      value={{ ...state, addItem, increment, decrement, removeItem, setTotal, clearCart, setFormData, setOrder }}>
      {children}
    </cartcontext.Provider>
  );
}
