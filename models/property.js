//Package Import
import Moment from 'moment';
import MomentRange from 'moment-range';
import Store from 'data-store';
import Os from 'os';
import Path from 'path';

//Module Import
import isEmpty from "../utils/isEmpty.js";

//Configure Store Name
const storeName = 'properties'

//Configure Store Path
const store = new Store({
    path: Path.join(process.cwd(), `../config/${storeName}.json`)
});

//Clear Storag at Initizilation
store.clear();

const { extendMoment } = MomentRange;
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

export default Property;