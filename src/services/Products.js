import api from './api';

class ProductsService {
  constructor() {

  }

  getAll() {
    return api.get('/products');
  }

  save(data) {
    return api.post('/products', data);
  }

  updatePicture(url, id) {
    const data = {
      picture: url,
    };
    return api.put(`/products/${id}`, data);
  }

  getOne(id) {
    return api.get(`/products/${id}`);
  }

  delete(id) {
    return api.delete(`/products/${id}`);
  }
}

export default ProductsService;
