import api from './api';

class UserService {
  constructor() {

  }

  login(data) {
    return api.post('/login', data);
  }

  save(data) {
    return api.post('/users', data);
  }

  getOne(id) {
    return api.get(`/users/${id}`);
  }

  delete(id) {
    return api.delete(`/users/${id}`);
  }
}

export default UserService;
