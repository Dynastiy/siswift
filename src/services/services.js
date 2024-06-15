import product from './product';
import customer from './customer';
import vendor from './vendor'
import response from './response'
import config from './config'
import auth from './auth'

export const services = {
  product,
  customer,
  vendor,
  response,
  config,
  auth
};

// Optionally, if you want to access all services via a single object
export default services;