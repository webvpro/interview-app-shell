'use strict';
/*
    Here we've set up a state store for you so all of your time isn't wasted on the endless wasteland of blog posts
    related to why one flux implementation is better than another. In fact, we're not even really using a 100% flux
    type setup here. There's some minor magic going on here, the important thing to know is that we're using a mobx
    based store to implement some reactive programming into our data structure. Feel free to move the observables
    around in this store and control how they're populated into the app if you have a deeper understanding of mobx
    otherwise just add additional properties on to the state object below and it'll already be spread onto the top
    level of the app in a semi flux fashion. Modify pieces of your magical state with functions like someAction below.
 */
import {observable} from 'mobx';

class AppState {
    @observable state = {
        // props go here
        randomKey: 'Hello WOrld'
    };

    someAction = () => {
        // modify a prop?
        this.state.randomKey = 'Hello Squirrel';
    }
}

let store = new AppState();
module.exports = store;
