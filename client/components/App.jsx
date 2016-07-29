'use strict';
import {observer} from 'mobx-react';
import AppStore from '../stores/AppStore';
import AppBody from './AppBody';

// <-- That's store based magic, for now just think about it as making the following component watch when our state store changes
module.exports = observer(() => {
    return (
        <main>
            <header>
                The Doomsday Watcher
            </header>
            <AppBody {...AppStore.state} />
        </main>
    )
}) ;
