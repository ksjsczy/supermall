import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"

export default {
  // addCart(context, payload) {}
  addCart({ state, commit }, payload) {
    return new Promise((resolve) => {
      if (state.cartListIndex[payload.iid] == undefined) {
        // commit('updateIndex', payload)
        commit(ADD_TO_CART, payload)
        resolve('成功添加新的商品')
      } else {
        commit(ADD_COUNTER, payload)
        resolve('当前商品数量+1')
      }
    })
  },
}
