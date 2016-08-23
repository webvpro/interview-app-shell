'use strict';
/*
    Here we've set up a state store for you so all of your time isn't wasted on the endless wasteland of blog posts
    related to why one flux implementation is better than another. In fact, we're not even really using a 100% flux
    type setup here. There's some minor magic going on here, the important thing to know is that we're using a mobx
    based store to implement some reactive programming into our data structure.

    Add new observable properties on to our store object and modify them via store methods like below with exampleKey
    and modifyExample. For more complex views of your observable objects, use a computed property like exampleKeyExtended
    below. Computed properties allow you to observe modified representations of other objects
 */
import {observable, computed} from 'mobx';

class AppStore {
    // state goes here
    @observable exampleTitle = 'The Doomsday Watcher';
    @observable exampleKey = 'Hello';
    @observable secondExampleKey = 'World';
    @computed get exampleKeyExtended() {
        return `${this.exampleKey} ${this.secondExampleKey}`;
    };

    modifyExample = () => {
        this.secondExampleKey = this.secondExampleKey === 'World' ?
            'Squirrel' :
            'World';
    }
}

let store = new AppStore();
module.exports = store;
