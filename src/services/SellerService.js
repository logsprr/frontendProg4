import api from './api';

class SellerService {
  constructor() {

  }

  save(data) {
    return api.post('/sells', data);
  }

  getAll(id) {
    return api.get(`/sells?sellerId=${id}`);
  }
}

export default SellerService;
