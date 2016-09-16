'use strict';
import {observer} from 'mobx-react'; // <-- That's store based magic, for now just think about it as making the following component watch when our state store changes
// Start work here!

module.exports = observer((props) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Distance</th>
                    <th>Speed</th>
                </tr>
                {props.Store.neoData.map(function(neo){
                    <tr>{neo.neo_reference_id}</tr>
                })}
            </table>
        </div>
    )
});
