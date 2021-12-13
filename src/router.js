import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import CreditCard from './components/CreditCard.vue'
import About             from './components/About.vue'
import Store             from './components/Store.vue'
import Product           from './components/Product.vue'

const routes = [{
  path: '/',
  name: 'root',
  component: App
},
{
  path: '/user/logIn',
  name: "logIn",
  component: LogIn
},
{
  path: '/user/signUp',
  name: "signUp",
  component: SignUp
},
{
  path: '/user/home',
  name: "home",
  component: Home
},
{
  path: '/user/profile',
  name: "profile",
  component: Profile
},
{
  path: '/user/creditCard',
  name: "creditCard",
  component: CreditCard
},
{
  path: '/about',
  name: "about",
  component: About
},
{
  path: '/user/store',
  name: "store",
  component: Store
},
{
  path: '/user/product',
  name: "product",
  component: Product
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
