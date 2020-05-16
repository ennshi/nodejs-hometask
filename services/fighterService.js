const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    search(search) {
        const fighter = FighterRepository.getOne(search);
        if(!fighter) {
            return null;
        }
        return fighter;
    }
    getAll() {
        const fighters = FighterRepository.getAll();
        if(!fighters) {
            return null;
        }
        return fighters;
    }
    create(data) {
        const fighter = FighterRepository.create(data);
        if(!fighter) {
            return null;
        }
        return fighter;
    }
    update(id, data) {
        return FighterRepository.update(id, data);
    }
    delete(id) {
        const fighter = FighterRepository.delete(id);
        if(!fighter.length) {
            return null;
        }
        return fighter[0];
    }
}

module.exports = new FighterService();
