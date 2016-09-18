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
import {observable, computed, action,toJS, autorun} from 'mobx';
import Immutable from 'immutable'



class AppStore {
    // state goes here

    constructor(){
        this.neoLoading = true;
        this.fetchNeo()
        autorun(()=>{this.filteredNeos.rdata})

    }
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


    // Neo Table properties
    @observable neoLoading = true;
    @observable neoSortColumn = 'CAD';
    @observable neoLinks =[];
    @observable neoCount = 0;
    @observable neoData = [];
    @observable neoDates =[]
    @observable selectedDays =[]


    // actions
    @action('fetching neos') fetchNeo =() =>{
        // new to mobx I suppose the ajax/fetch should be in a middleware folder/file
        let request = new Request('api/incoming', {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        window.fetch(request)
            .then(res => res.json())
            .then(action(json=>{
                this.neoData = json.near_earth_objects
                this.neoDates = Object.keys(json.near_earth_objects).sort(function(a,b){
                    let dateA = new Date(a)
                    let dateB = new Date(b)
                    return dateB - dateA
                })
                this.neoLoading = false;
            }))
            .catch(function(error) {
                console.log(error);
            });

    }

    @action('changing date range') selectedNumberOfDays =(e) =>{
            //do stuff
            this.selectedDays = e.target.value

    }


    @action('changing column ') sortByColumnClick =(column) =>{
        this.neoSortColumn = column;
        this.filteredNeos.rdata

    }

    // event handlers
    sortByClick = (e,column) => {
        e.preventDefault
        this.sortByColumnClick(column)
    }

    // computes
    @computed get neoDays(){
        let dates = Immutable.fromJS(toJS(this.neoDates)),
            rdates =[]
        dates.forEach((dateKey,index)=>{
            let day = this.totalDays  - index
            rdates.push(day)

        })


        return rdates
    }

    @computed get totalDays(){
        let dates = toJS(this.neoDates)
        return dates.length
    }

    /* Flattened the data to br displayed so this can be reduced by other @computed.
    *  Made my own array here was having issues Mobx/Immutable (sort,filter,reduce) ?
    * */
    @computed get filteredNeos(){
        let neos = Immutable.Map(toJS(this.neoData)),
            rdata= [];
            /// loop the loop there has to be a better way ?
        neos.map(function(neoDate){
            neoDate.forEach((neo)=>{
                // close_approach_data is an array so I reduce to get the closest approach
                let CAD = neo.close_approach_data.reduce((a,b)=>{
                 return a.epoch_date_close_approach > b.epoch_date_close_approach ? a : b
                 })

                rdata = rdata.concat({neo_reference_id:neo.neo_reference_id,
                    name:neo.name,
                    nasa_jpl_url:neo.nasa_jpl_url,
                    size_meters:neo.estimated_diameter.meters.estimated_diameter_max,
                    close_approach_date:CAD.close_approach_date,
                    epoch_date_close_approach:CAD.epoch_date_close_approach,
                    relative_velocity_kph:CAD.relative_velocity.kilometers_per_hour,
                    relative_velocity_mph:CAD.relative_velocity.miles_per_hour,
                    miss_distance_km:CAD.miss_distance.kilometers

                })
            })

        })

        // sort switch on neoSortColumn observable , need to add cases...

         switch (this.neoSortColumn){
             case 'NAME':
                 rdata= rdata.sort((a,b)=>{
                     return a.name.localeCompare(b.name)
                 })
                 break;
             default:
                 rdata = rdata.sort((a,b)=>{
                     return b.epoch_date_close_approach - a.epoch_date_close_approach
                 })
         }
         // need a date range filters
        return rdata

    };

    // need to computes for aggregates that can reduce this.filteredNeos



}

let store = new AppStore();
module.exports = store;

