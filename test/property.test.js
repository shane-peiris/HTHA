//Package Import
import request from 'supertest'

//Module Import
import app from '../app.js'

//Test Cases for POST /property Route
describe("POST /property", () => {

    //Expected test result with all required fileds passed correct data
    describe("with all required fields for a property with correct data", () => {

        //Should respond with a json object with status field `success` 
        test("Should respond with a json object with status field `success`", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "1",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "3030",
                state: "VIC",
                salePrice: "100,000.00",
                description: "2 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.body.status).toEqual("success");
        })

        //Should respond with a json object containing an id and Successfully saved to Data Store    
        test("Should respond with a json object containing an id (Successfully saved to Data Store)", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "2",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "3030",
                state: "VIC",
                salePrice: "150,000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.body.data.result.id).toBeDefined();
        })

        //Should respond with a json object with the message field `Property Record Created Successfully`
        test("Should respond with a json object with the message field `Property Record Created Successfully`", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "3030",
                state: "VIC",
                salePrice: "200,000.00",
                description: "3 BEDROOM 2 BATHROOM 2 GARAGE"
            })
            expect(response.body.message).toEqual("Property Record Created Successfully");
        })

        //Should specify json in the content type
        test("Should specify json in the content type", async () => {
            const response = await request(app).post("/property").send({
                streetNumber: "18",
                street: "ROSEWATER STREET",
                suburb: "MANOR LAKES",
                postcode: "3024",
                state: "VIC",
                salePrice: "150,000.00",
                description: "4 BEDROOM 2 BATHROOM 2 GARAGE"
            })
            expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        })

        //Should respond with a 200 status code
        test("Should respond with a 200 status code", async () => {
            const response = await request(app).post("/property").send({
                streetNumber: "29",
                street: "BOURKE STREET",
                suburb: "MELBOURNE",
                postcode: "3000",
                state: "VIC",
                salePrice: "350,000.00",
                description: "2 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.statusCode).toBe(200);
        })

    })

    //Expected test result with all required fileds passed with incorrect data
    describe("with all required fields for a property with incorrect data", () => {
        //Should respond with a json object with status field `error`
        test("Should respond with a json object with status field `error`", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "303",
                state: "VICR",
                salePrice: "150A000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.body.status).toEqual("error");
        })

        //Should respond with a json object with the list of errors
        test("Should respond with a json object with the list of errors", async () => {
            const response = await request(app).post("/property").send({
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "303",
                state: "VICR",
                salePrice: "150A000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.body.error).toBeDefined();
        })

        //Should respond with a json object with the message field `Invalid submission`
        test("Should respond with a json object with the message field `Invalid submission`", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "303",
                state: "NSW",
                salePrice: "150,000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.body.message).toEqual("Invalid submission");
        })

        //Should specify json in the content type
        test("Should specify json in the content type", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "3030",
                state: "ACTR",
                salePrice: "150A000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        })

        //Should respond with a 400 status code
        test("Should respond with a 400 status code", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "303",
                state: "VICR",
                salePrice: "150A000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.statusCode).toBe(400);
        })
    })

    //Expected test result without required fileds
    describe("without required fields", () => {
        //Should respond with a json object with status field `error`
        test("Should respond with a json object with status field `error`", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                postcode: "3030",
                salePrice: "150,000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.body.status).toEqual("error");
        })

        //Should respond with a json object with the list of errors
        test("Should respond with a json object with the list of errors", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                salePrice: "150,000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.body.error).toBeDefined();
        })

        //Should respond with a json object with the message field `Invalid submission`
        test("Should respond with a json object with the message field `Invalid submission`", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "3030",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.body.message).toEqual("Invalid submission");
        })

        //Should specify json in the content type
        test("Should specify json in the content type", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                suburb: "WERRIBEE",
                postcode: "3030",
                salePrice: "150,000.00"
            })
            expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        })

        //Should respond with a 400 status code
        test("Should respond with a 400 status code", async () => {
            const response = await request(app).post("/property").send({
                unitType: "UNIT",
                unitNumber: "3",
                streetNumber: "65",
                street: "MARKET ROAD",
                postcode: "3030",
                salePrice: "150,000.00",
                description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
            })
            expect(response.statusCode).toBe(400);
        })
    })

    //Expected test result without any fileds
    describe("without any fields", () => {
        //Should respond with a json object with status field `error`
        test("Should respond with a json object with status field `error`", async () => {
            const response = await request(app).post("/property").send({})
            expect(response.body.status).toEqual("error");
        })

        //Should respond with a json object with the list of errors
        test("Should respond with a json object with the list of errors", async () => {
            const response = await request(app).post("/property").send({})
            expect(response.body.error).toBeDefined();
        })

        //Should respond with a json object with the message field `Invalid submission`
        test("Should respond with a json object with the message field `Invalid submission`", async () => {
            const response = await request(app).post("/property").send({})
            expect(response.body.message).toEqual("Invalid submission");
        })

        //Should specify json in the content type
        test("Should specify json in the content type", async () => {
            const response = await request(app).post("/property").send({})
            expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        })

        //Should respond with a 400 status code
        test("Should respond with a 400 status code", async () => {
            const response = await request(app).post("/property").send({})
            expect(response.statusCode).toBe(400);
        })
    })

})

//Test Cases for GET /property Route
describe("GET /property", () => {

    //Expected test result without filters
    describe("without filters passed", () => {

        //Should get a list of all available properties
        test("Should get a list of all available properties", async () => {
            const response = await request(app).get("/property").send()
            expect(response.body.status).toEqual("success");
        })

        //Should specify json in the content type
        test("Should specify json in the content type", async () => {
            const response = await request(app).get("/property").send()
            expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        })

        //Should respond with a 200 status code
        test("Should respond with a 200 status code", async () => {
            const response = await request(app).get("/property").send()
            expect(response.statusCode).toBe(200);
        })

    });

    //Expected test result with correct filters passed
    describe("with filters passed", () => {

        //Should get a list of all available properties for Werribee
        test("Should get a list of all available properties for Werribee", async () => {
            const response = await request(app).get("/property").send({
                filter: '{"suburb":"Werribee"}'
            })
            expect(response.body.status).toEqual("success");
        })

        //Should get a list of all available properties for Werribee and must be equal to 3
        test("Should get a list of all available properties for Werribee and must be equal to 3", async () => {
            const response = await request(app).get("/property").send({
                filter: '{"suburb":"Werribee"}'
            })
            expect(Object.values(response.body.data.result).length).toEqual(3);
        })

        //Should get id 1 marketStats as 'Below suburb average'; id 2 marketStats as 'Equal to suburb average'; id 3 marketStats as 'Above suburb average'; 
        test("Should get id 1 marketStats as 'Below suburb average'; id 2 marketStats as 'Equal to suburb average'; id 3 marketStats as 'Above suburb average'; ", async () => {
            const response = await request(app).get("/property").send({
                filter: '{"suburb":"Werribee"}'
            })

            let correctResults = 0;

            if (response.body.data.result[0].marketStats === "Below suburb average")
                correctResults++

            if (response.body.data.result[1].marketStats === "Equal to suburb average")
                correctResults++

            if (response.body.data.result[2].marketStats === "Above suburb average")
                correctResults++

            expect(correctResults).toEqual(3);
        })

        //Should specify json in the content type
        test("Should specify json in the content type", async () => {
            const response = await request(app).get("/property").send({
                filter: '{"suburb":"Werribee"}'
            })
            expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        })

        //Should respond with a 200 status code
        test("Should respond with a 200 status code", async () => {
            const response = await request(app).get("/property").send({
                filter: '{"suburb":"Werribee"}'
            })
            expect(response.statusCode).toBe(200);
        })

    });

    //Expected test result with bad filters passed
    describe("with bad filters passed", () => {

        //Should respond with a json object with status field `error`
        test("Should respond with a json object with status field `error`", async () => {
            const response = await request(app).get("/property").send({
                filter: '{"town":"Werribee"}'
            })
            expect(response.body.status).toEqual("error");
        })

        //Should respond with a json object with the list of errors
        test("Should respond with a json object with the list of errors", async () => {
            const response = await request(app).post("/property").send({
                filter: '{"town":"Werribee"}'
            })
            expect(response.body.error).toBeDefined();
        })

        //Should specify json in the content type
        test("Should specify json in the content type", async () => {
            const response = await request(app).get("/property").send({
                filter: '{"town":"Werribee"}'
            })
            expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        })

        //Should respond with a 400 status code
        test("Should respond with a 400 status code", async () => {
            const response = await request(app).get("/property").send({
                filter: '{"town":"Werribee"}'
            })
            expect(response.statusCode).toBe(400);
        })

    });
})