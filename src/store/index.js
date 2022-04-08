import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const state = {
  cartList: [],
  cartListIndex: {},
}
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})

//3.导出以供挂载
export default store
