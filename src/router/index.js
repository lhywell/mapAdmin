import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/views/Map'
import Login from '@/components/Login'

Vue.use(Router)

const routes = [{
    path: '/',
    redirect: {
        name: 'login'
    },
    // name: 'map',
    // component: Map,
    // beforeEnter: (to, from, next) => {
    //     console.log('beforeEnter')
    //     localStorage.getItem('access_token') ? next() : next({ path: '/login' })
    //     next()
    // },
}, {
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/map',
    name: 'map',
    component: Map
}]
export default new Router({
    routes
})
