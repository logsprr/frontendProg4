export const ListTypesRequest = {
    // Products
    LOAD_ADD_PRODUCT: '@product/add',
    LOAD_UPDATE_PRODUCT: '@product/update',
    LOAD_REMOVE_PRODUCT: '@product/delete',
    LOAD_ALL_PRODUCTS: '@product/get',
    LOAD_ALL_PRODUCTS_SUCCESS: '@product/success/get',
    LOAD_FILTER_PRODUCT: '@products/load',
    LOAD_FILTER_PRODUCT_SUCCESS: '@products/load',
    LOAD_FILTER_PRODUCT_FAILURE: '@products/load',
    LOAD_FAILURE: '@product/failure',
    LOAD_CLEAN: '@product/clean',

    // Sells
    LOAD_ALL_SELLS: '@sell/get',
    LOAD_FAILURE_SELL: '@get/failure',

    // User
    LOAD_USER: '@user/get',
    LOAD_FAILURE_USER: '@user/failure',
    CLEAR_USER: '@user/clear',

};