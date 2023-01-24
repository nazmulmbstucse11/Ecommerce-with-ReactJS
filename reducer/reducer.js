export const reducer = (state, action) => {

  if (action.type === "INIT_STORED"){
    return action.value;
  }

  if (action.type === "ADD_ITEM") {
    const itemIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload.id)

    if (itemIndex >= 0) {
      state.cartItems[itemIndex].quantity += 1;
    }

    else {
      const tempProduct = { ...action.payload, quantity: 1 };
      state.cartItems.push(tempProduct);
    }
  }

  if (action.type === "INCREMENT") {
    const updatedCart = state.cartItems.map((curElem) => {
      if (curElem.id === action.payload) {
        return { ...curElem, quantity: curElem.quantity + 1 };
      }
      return curElem;
    });

    return { ...state, cartItems: updatedCart };
  }

  if (action.type === "DECREMENT") {
    const updatedCart = state.cartItems.map((curElem) => {
      if (curElem.id === action.payload) {
        return { ...curElem, quantity: curElem.quantity - 1 };
      }
      return curElem;
    })
      .filter((curElem) => curElem.quantity !== 0);
    return { ...state, cartItems: updatedCart };
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      cartItems: state.cartItems.filter((curElem) => {
        return curElem.id !== action.payload;
      }),
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, cartItems: [] };
  }

  if (action.type === "SET_ORDER") {
    const tmpData = state.cartItems;
    return { ...state, orderItems: tmpData, cartItems: []};
  }

  if (action.type === "SET_FORM_DATA") {
    return { ...state, formData: action.payload};
  }

  if (action.type === "GET_TOTAL") {
    let { totalItem, totalAmount } = state.cartItems.reduce(
      (accum, curVal) => {
        let { price, quantity } = curVal;

        let updatedTotalAmount = price * quantity;
        accum.totalAmount += updatedTotalAmount;

        accum.totalItem += quantity;
        return accum;
      },
      {
        totalItem: 0,
        totalAmount: 0,
      }
    );
    return { ...state, totalItem, totalAmount };
  }
  return state;
};
