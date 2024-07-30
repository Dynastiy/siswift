import products from './product';
import user from './customer';
import vendor from './vendor'
import response from './response'
import config from './config'
import auth from './auth'
import orders from './order'

export const services = {
  products,
  user,
  vendor,
  response,
  config,
  auth,
  orders
};

// Optionally, if you want to access all services via a single object
export default services;