const protocol  = "https";
const number = "127.0.0.1";
const str = "localhost";
const ip = str;
const port = "7276";
const apiURL = protocol+"://"+ip+":"+port+"/api";
export const environment = {
    baseUrl : protocol+"://"+ip+":"+port,
    ApiUrl : apiURL ,
    brandsApiUrl : apiURL+"/brands",
    categoriesApiUrl : apiURL+"/categories",
    colorsApiUrl : apiURL+"/colors",
    detailsApiUrl : apiURL+"/details",
    imagesApiUrl : apiURL+"/images",
    productsApiUrl : apiURL+"/products",
    producttagsApiUrl : apiURL+"/producttags",
    savedcolorsApiUrl : apiURL+"/savedcolors",
    tagsApiUrl : apiURL+"/tags",
    usersApiUrl : apiURL+"/users",
    warranyApiUrl : apiURL+"/warrany",
};
