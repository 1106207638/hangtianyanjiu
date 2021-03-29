import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        changeShow:false,
        isZoom:true,
        password:'',
        isSmall : true
    },
    mutations: {
        increment (state,value) {
            state.changeShow = value
            state.isHeader = !state.isHeader
        },
        toggleZoom (state,value) {
            state.isZoom = true
        },
        toggleZoom1 (state,value) {
            state.isZoom = false
        },
        editPassword(state,value) {
            state.password = value
        },
        small(state,value) {
            state.isSmall = true
        },
        big(state,value) {
            state.isSmall = false
        }
    },
    actions:{
        editPW(context,value) {
            context.commit('editPassword',value)
        },
        init(context,value) {
            context.commit('increment',value)
        },
        toggle(context,value) {
            context.commit('toggleZoom',value)
        },
        toggleSmall(context,value) {
            context.commit('small',value)
        },
        toggleBig(context,value) {
            context.commit('big',value)
        },
    }
})
export default  store