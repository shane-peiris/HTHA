//Package Import
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Store from 'data-store';
import Path from 'path';

//Module Import
import isEmpty from "../utils/isEmpty.js";

//Configure Store Name
const storeName = 'properties'

//Configure Store Path
const store = new Store({
    path: Path.join(process.cwd(), `/config/${storeName}.json`)
});

//Clear Storag at Initizilation
store.clear();

const moment = extendMoment(Moment);

//Property Construct
const Property = function (data) {

    this.id = data.id;
    this.unitType = data.unitType;
    this.unitNumber = data.unitNumber;
    this.streetNumber = data.streetNumber;
    this.street = data.street;
    this.suburb = data.suburb;
    this.postcode = data.postcode;
    this.state = data.state;
    this.salePrice = data.salePrice;
    this.description = data.description;
    this.created = !isEmpty(data.created) ? data.created : moment().format("DD-MM-YYYY HH:mm:ss");
}

//Add Property To Store
Property.add = async (data) => {

    let propertyFromStore = store.get(storeName);
    let propertyList = [];

    if (!isEmpty(propertyFromStore)) {
        if (!Array.isArray(propertyFromStore))
            propertyList.push(propertyFromStore)
        else
            propertyList = propertyFromStore
    }

    data.id = !isEmpty(propertyList) ? Object.values(propertyList).length + 1 : 1
    data.created = moment().format("DD-MM-YYYY HH:mm:ss");

    propertyList.push(data)

    store.set(storeName, propertyList)
    store.save()

    return data;

}

//Get all properties from store
Property.getAll = async () => {

    let propertyFromStore = store.get(storeName);
    let propertyList = [];

    if (!isEmpty(propertyFromStore)) {
        if (!Array.isArray(propertyFromStore))
            propertyList.push(propertyFromStore)
        else
            propertyList = propertyFromStore
    }

    return propertyList;

}

//Filter Properties based on Property Object Filter
Property.searchByObjFilter = async (filter) => {
    
    //Get all properties from store
    let propertyFromStore = store.get(storeName);
    let propertyList = [];

    if (!isEmpty(propertyFromStore)) {
        if (!Array.isArray(propertyFromStore))
            propertyList.push(propertyFromStore)
        else
            propertyList = propertyFromStore
    }

    //Filter Properties by looping through each property
    let filteredResults = propertyList.filter(function (obj) {
        
        let addObjectToResult = false

        //Iterate through each object keys to check for matches for the filter object keys
        const keys = Object.keys(obj);
        keys.forEach((key, index) => {
            try {
                //All key matches will be checked for matching content and if so the object will be added to the result list
                if (!isEmpty(filter[key]) && obj[key].toUpperCase() === (filter[key].toUpperCase())) {
                    addObjectToResult = true
                }
            } catch (err) {}
        });
    
        if (addObjectToResult) {
            return obj;
        }
    });

    return filteredResults;

}

export default Property;