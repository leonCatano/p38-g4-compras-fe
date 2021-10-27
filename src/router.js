import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Transaction from './components/Transaction.vue'
import TransactionUpdate from './components/TransactionUpdate.vue'
import About             from './components/About.vue'

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
  path: '/user/transaction',
  name: "transaction",
  component: Transaction
},
{
  path: '/user/transactionupdate',
  name: "transactionupdate",
  component: TransactionUpdate
},
{
  path: '/about',
  name: "about",
  component: About
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router