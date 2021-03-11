import api from './api';

class SellerService {
  constructor() {

  }

  save(data) {
    return api.post('/products', data);
  }

  getAll(id) {
    return api.get(`/sells?sellerId=${id}`);
  }
}

export default SellerService;
