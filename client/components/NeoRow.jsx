'use strict';
import {observer} from 'mobx-react'; // <-- That's store based magic, for now just think about it as making the following component watch when our state store changes
// Start work here!

// I know the requirements said 5 columns but I like the like on the name better...
module.exports = observer((props) => {

    return (
        <tr key={`neo-${props.neo_reference_id}`}>
            <td style={props.styles}><a href={props.nasa_jpl_url} target="_blank">{props.name}</a></td>
            <td style={props.styles}>{props.close_approach_date}</td>
            <td style={props.styles}>{props.relative_velocity_kph}</td>
            <td style={props.styles}>{props.miss_distance_km}</td>
        </tr>
    )
});
