'use strict';
import {observer} from 'mobx-react'; // <-- That's store based magic, for now just think about it as making the following component watch when our state store changes
// Start work here!
module.exports = observer((props) => {
    return (
        <section>
            <header>
                {props.Store.exampleKeyExtended}
            </header>
            <div>
                <button
                    type="button"
                    onClick={props.Store.modifyExample}>
                    Example Click
                </button>
            </div>
        </section>
    )
});
