//Package Imports
import express from "express"
import Joi from '@hapi/joi'

//Module Imports
import validate from '../utils/validations.js'
import rs from '../utils/response.js'
import isEmpty from "../utils/isEmpty.js"

//Data Modeal Imports
import Property from "../models/property.js"
import PropertyMethods from "../services/property.js"

//Intialize a sub router with Express Router
const router = express.Router()

//GET Method Route to retrieve all Properties. Return data will include recordCount and results in array.
router.get("/", async (req, res) => {

    let propertyResults = []

    //Check for any filter parameters
    if (!isEmpty(req.body)) {
        const validateSchema = Joi.object({
            filter: Joi.string().allow(""),
        });

        const error = validate(validateSchema, req.body)

        if (error) return res.status(400).send(rs.error("Only `filter` field can be accepted as a parameter", error))

        try {
            const filterObj = !isEmpty(req.body.filter) ? JSON.parse(req.body.filter) : {}

            //Validation of data in the filter object
            const validateFilterSchema = Joi.object({
                unitType: Joi.string().allow(""),
                unitNumber: Joi.string().allow(""),
                streetNumber: Joi.string().allow(""),
                street: Joi.string().allow(""),
                suburb: Joi.string(),
                postcode: Joi.string().pattern(/^[0-9]+$/).length(4),
                state: Joi.string().valid('VIC', 'NSW', 'SA', 'TAS', 'NT', 'WA', 'ACT', 'QLD'),
                salePrice: Joi.string().pattern(/^[0-9,.]+$/),
                description: Joi.string(),
            });

            const filterError = validate(validateFilterSchema, filterObj)

            if (filterError) return res.status(400).send(rs.error("Filter Object contains invalid search parameters", filterError));

            //Get list of properties based on filter object
            propertyResults = await Property.searchByObjFilter(filterObj);

            try {
                if (!isEmpty(filterObj.suburb)) {
                    let avgSalePrice = PropertyMethods.calculateAverageSalePrice(propertyResults)
                    
                    propertyResults = propertyResults.filter(function (property) {
                        try {
                            property.marketStats = null;

                            if (parseFloat(property.salePrice) > avgSalePrice) {
                                property.marketStats = "Above suburb average"
                            }
                            else if (parseFloat(property.salePrice) < avgSalePrice) {
                                property.marketStats = "Below suburb average"
                            }
                            else {
                                property.marketStats = "Equal to suburb average"
                            }

                            return property;

                        } catch (err) {
                            console.log(err)
                        }
                    });
                }

                
            } catch (err) {
                console.log(err)
            }
            

        }
        catch (err) {
            return res.status(400).send(rs.error("Filter Object is not in correct format", err));
        }

    }
    else {
        //Get all properties as there are no filters
        propertyResults = await Property.getAll();
    }

    //Return results from all Properties
    return res.status(200).send(rs.success("All Property Details",
        {
            recordCount: Object.values(propertyResults).length,
            result: propertyResults
        }));
});

//POST Method Route to add property. Return data will include a result of submitted property
router.post("/", async (req, res) => {

    //Validation of data sent via request using Joi
    const validateSchema = Joi.object({
        unitType: Joi.string().allow(""),
        unitNumber: Joi.string().allow(""),
        streetNumber: Joi.string().allow(""),
        street: Joi.string().allow(""),
        suburb: Joi.string().required(),
        postcode: Joi.string().pattern(/^[0-9]+$/).length(4).required(),
        state: Joi.string().valid('VIC', 'NSW', 'SA', 'TAS', 'NT', 'WA', 'ACT', 'QLD').required(),
        salePrice: Joi.string().pattern(/^[0-9,.]+$/).required(),
        description: Joi.string().required(),
    });

    const error = validate(validateSchema, req.body)

    if (error) return res.status(400).send(rs.error("Invalid submission", error));

    //Create Property object using the Property Model defined
    let newProperty = new Property(req.body);

    //Save Property Object
    let savedProperty = await Property.add(newProperty);

    //If Property Saved Successfully return property with success message else error
    if (!isEmpty(savedProperty)) {
        return res.status(200).send(rs.success("Property Record Created Successfully",
            {
                result: savedProperty
            }));
    }
    else {
        return res.status(400).send(rs.error("Error Creating Property Record", null));
    }
});

export default router;