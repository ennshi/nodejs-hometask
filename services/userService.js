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
    create(data) {
        const user = UserRepository.create(data);
        if(!user) {
            return null;
        }
        return user;
    }
    update(id, data) {
        return UserRepository.update(id, data);
    }
    delete(id) {
        const user = UserRepository.delete(id);
        if(!user.length) {
            return null;
        }
        return user[0];
    }

}

module.exports = new UserService();
