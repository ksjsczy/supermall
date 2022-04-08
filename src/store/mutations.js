export default {
  addCounter(state, payload) {
    state.cartList[state.cartListIndex[payload.iid]].count += 1
  },
  // updateIndex(state, payload) {
  //   state.cartListIndex[payload.iid] = state.cartList.length
  // },
  addToCart(state, payload) {
    payload.checked = true
    state.cartListIndex[payload.iid] = state.cartList.length
    state.cartList.push(payload)
  }
}
