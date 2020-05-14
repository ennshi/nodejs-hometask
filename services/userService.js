const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
    getAll() {
        const users = UserRepository.getAll();
        if(!users) {
            return null;
        }
        return users;
    }


}

module.exports = new UserService();
