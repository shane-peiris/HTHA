//Calculate Average Sale Price for a given data set 
const calculateAverageSalePrice = (data) => {

    let totalSalePrice = 0

    //Iterate data set to calculate total Sale Price for all properties
    Object.values(data).forEach((property, index) => {
        try {
            totalSalePrice = totalSalePrice + parseFloat(property.salePrice)
        } catch (err) {}
    });

    //Calculate average sale price and return value
    return Object.values(data).length !=0 ? totalSalePrice / Object.values(data).length : 0;
}

export default {
    calculateAverageSalePrice: calculateAverageSalePrice,
}