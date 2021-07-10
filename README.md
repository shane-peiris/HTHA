[![Node.js CI](https://github.com/shane-peiris/HTHA/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/shane-peiris/HTHA/actions/workflows/node.js.yml)



# HTHA
HTHA Developer - Coding Exercise

## Getting Started

### Project Prerequisites
1. Run **_npm install_** to install project packages and depenencies
  ```sh
  npm install
  ```
3. Create a **_.env_** file in the root of the project with the following information
```
#Define environment Option here from the following DEV, BETA, PROD
ENV=DEV
 
#Define Server Port here
SERVER_PORT=5000

#Define SSL Keys paths here
SSL_KEY=null
SSL_CERT=null
```

### Test Project
3. Run **_npm test_** to run the test cases to see if project is set up all good
  ```sh
  npm test
  ```
  *Expected Results
  ```
  Test Suites: 1 passed, 1 total
  Tests:       32 passed, 32 total
  ```

### Run Project
4. Run **_npm start_** to run the project
  ```sh
  npm start
  ```

## Available Routes
> POST /property
```
Description: Creat a new Property

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

> GET /property
```
Description: Get all a list of all Properties or search properties using a filter

Expected Successful Result without a filter
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

Sample filter payload
{
  filter: "{"suburb":"WERRIBEE"}",
}

Note: 'marketStats' property added to result property object which indicates whether the property is above, below or equal to the average sale price of the result set

Expected Successful Result with a filter
{
    "status": "success",
    "message": "All Property Details",
    "data": {
        "recordCount": 3,
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
                "created": "10-07-2021 17:57:59",
                "marketStats": "Below suburb average"
            },
            {
                "id": 2,
                "unitType": "UNIT",
                "unitNumber": "3",
                "streetNumber": "65",
                "street": "MARKET ROAD",
                "suburb": "WERRIBEE",
                "postcode": "3030",
                "state": "VIC",
                "salePrice": "200,000.00",
                "description": "3 BEDROOM 2 BATHROOM 1 GARAGE",
                "created": "10-07-2021 17:58:07",
                "marketStats": "Equal to suburb average"
            },
            {
                "id": 3,
                "unitType": "UNIT",
                "unitNumber": "4",
                "streetNumber": "65",
                "street": "MARKET ROAD",
                "suburb": "WERRIBEE",
                "postcode": "3030",
                "state": "VIC",
                "salePrice": "300,000.00",
                "description": "3 BEDROOM 2 BATHROOM 1 GARAGE",
                "created": "10-07-2021 17:58:15",
                "marketStats": "Above suburb average"
            }
        ]
    }
}

```
