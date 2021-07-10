# HTHA
HTHA Developer - Coding Exercise

# Getting Started
1. Run **_npm install_** to install project packages and depenencies
2. Create a **_.env_** file in the root of the project with the following information
```
#Define environment Option here from the following DEV, BETA, PROD
ENV=DEV
 
#Define Server Port here
SERVER_PORT=5000

#Define SSL Keys paths here
SSL_KEY=null
SSL_CERT=null
```
3. Run **_npm test_** to run the test cases to see if project is set up all good
```
Expected Results

Test Suites: 1 passed, 1 total
Tests:       32 passed, 32 total
```

4. Run **_npm start_** to run the project

## Available Routes
> /property
```
Method: POST
Description: 

Property Payload
{
  unitType: "UNIT"
  unitNumber: "2"
  streetNumber: "65"
  street: "MARKET ROAD"
  suburb: "WERRIBEE"
  postcode: "3030"
  state: "VIC"
  salePrice: "100,000.00"
  description: "3 BEDROOM 2 BATHROOM 1 GARAGE"
}

Note: Required fields are
- suburb
- postcode (Should be 4 characters and Digits only)
- state (Accept only VIC,NSW,ACT,QLD,ACT,SA,WA,NT,TAS)
- salePrice (Should only be Digits, Dot(.), Comma(,))
- description

Expected Successful Result
{
    "status": "success",
    "message": "Property Record Created Successfully",
    "data": {
        "result": {
            "id": 1,
            "unitType": "UNIT",
            "unitNumber": "2",
            "streetNumber": "65",
            "street": "MARKET ROAD",
            "suburb": "WERRIBEE",
            "postcode": "3030",
            "state": "VIC",
            "salePrice": "100,000.00",
            "description": "3 BEDROOM 2 BATHROOM 1 GARAGE",
            "created": "11-07-2021 00:12:21"
        }
    }
}

Sample Fail Result
{
    "status": "error",
    "message": "Invalid submission",
    "error": {
        "suburb": "is required",
        "postcode": "is required"
    }
}
```
```
Method: GET
Description: 

Expected Successful Result
{
    "status": "success",
    "message": "All Property Details",
    "data": {
        "recordCount": 1,
        "result": [
            {
                "id": 1,
                "unitType": "UNIT",
                "unitNumber": "2",
                "streetNumber": "65",
                "street": "MARKET ROAD",
                "suburb": "WERRIBEE",
                "postcode": "3030",
                "state": "VIC",
                "salePrice": "100,000.00",
                "description": "3 BEDROOM 2 BATHROOM 1 GARAGE",
                "created": "11-07-2021 00:12:21"
            }
        ]
    }
}

```