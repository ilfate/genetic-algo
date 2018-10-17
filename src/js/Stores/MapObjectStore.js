import { observable, action } from "mobx";



class MapObjectStore {
    @observable id = '';
    @observable x;
    @observable y;
    @observable type;

    static get FOOD() { return 'food' }
    static get STONE() { return 'stone' }

}


export default MapObjectStore;
