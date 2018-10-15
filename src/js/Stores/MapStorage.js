import { observable, action, computed } from "mobx";


class MapStorage {
    @observable array = [];
    @observable index = {};
    @observable indexId = {};

    add(element, x, y) {
        if (this.get(x, y)) return false;
        this.array.push(element);
        this.index[`${x} ${y}`] = element;
        if (element.id) {
            this.indexId[element.id] = element;
        }
    }

    remove(x, y) {
        const element = this.index[x + ' ' + y];
        const index = this.array.indexOf(element);

        if (index > -1) {
            this.array.splice(index, 1);

        }
        delete this.index[x + ' ' + y];
        if (element.id) {
            delete this.indexId[element.id];
        }
    }

    get(x, y) {
        if (this.index[`${x} ${y}`]) {
            return this.index[`${x} ${y}`];
        }
        return false;
    }

    getById(id) {
        if (this.indexId[id]) return this.indexId[id];
        return false;
    }

    move(element, x, y) {
        delete this.index[element.x + ' ' + element.y];
        this.index[`${x} ${y}`] = element;
    }

    map(fun) {
        return this.array.map(fun);
    }

    @computed get all() { return this.array; }
}


export default MapStorage;
