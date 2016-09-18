'use strict';
import {observer} from 'mobx-react';
import NeoRow from './NeoRow'
import mobx from 'mobx'
module.exports = observer((props) => {

    let tableBorders = {border:'1px solid black'}
    //let dates = props.Store.neoDays

    let displayNeos = ()=>{
        if (props.Store.neoLoading){
            return (<tr><td colSpan="4">....Wait a minute going to space....</td></tr>)
        }else{
            console.log(props.Store.neoDays)

            return(
                props.Store.filteredNeos.map((neo) =>
                    <NeoRow {...neo} key={neo.neo_reference_id}/>
                )
            )
        }
    }

    let dayOptions = () =>{
        if (! props.Store.neoLoading) {
            return (
                props.Store.neoDays.map((day,index) =>

                      <option key={`day-${index}`} value={day}>{day}</option>
                    )
                )
        }
    }


    return (
        <div>
            <select name="selected_range" onChange=''>
            {dayOptions()}
            </select>
            <table width='100%'>
                <tr>
                    <th style={tableBorders}><a href="#" onClick={props.Store.sortByClick.bind(this,'NAME')}>Name</a></th>
                    <th style={tableBorders}><a href="#" onClick={props.Store.sortByClick.bind(this,'CAD')}>CAD</a></th>
                    <th style={tableBorders}>AV</th>
                    <th style={tableBorders}>MD</th>
                </tr>
                {displayNeos() }
            </table>
        </div>
    )
});
