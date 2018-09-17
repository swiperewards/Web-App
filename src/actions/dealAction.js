import { hostURL, addNewDealAPI, getDealsFilterAPI, deleteDealAPI, getDealDetailsAPI, updateDealAPI } from '../app.config';
import {normalizedPhone} from '../utilities/validation'
import moment from 'moment'

var axios = require('axios');

//Function to add new deal to processing system
export function addNewDeal(values, merchantId, token) {

    var setting = {
        method: 'post',
        url: hostURL + addNewDealAPI,
        data: {
            "platform": "web", 
	        "requestData":{
                "merchantId": merchantId, 
		        "startDate": values.fromDate === undefined ? undefined : (values.fromDate).replace(normalizedPhone,''),
		        "endDate": values.toDate === undefined ? undefined : (values.toDate).replace(normalizedPhone,''),
		        "cashBonus": values.cashBonus,
                "location": values.location,
                "status": values.status,
                "shortDescription": "Deal New",
                "longDescription": "New Deal",
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
        }
    }

    var response = axios(setting).then(
        response => response.data
    )
        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'ADD_DEAL',
        payload: response
    }
}

//Function to fetch list of all Deals based on various filter option.
export function getDealsListWithFilter(name, inactive, statePrefix, fromDate, toDate, token) {

    var setting = {
        method: 'post',
        url: hostURL + getDealsFilterAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "merchantName" : name === undefined ? "" : name,
                "status" : inactive === undefined ? "" : inactive,
                "location": statePrefix === undefined ? "" : statePrefix,
                "fromDate" : fromDate === undefined ? "" : fromDate,
                "toDate" : toDate === undefined ? "" : toDate,
                "pageNumber" : "0",
		        "pageSize" : "0"
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
        }
    }

    var response = axios(setting).then(
        response => response.data
    )
        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'GET_DEALS',
        payload: response
    }
}

//Function to delete deal for selected Id
export function deleteDeal(dealId,token) {

    var setting = {
        method: 'post',
        url: hostURL + deleteDealAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "id" : dealId,
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
        }
    }

    var response = axios(setting).then(
        response => response.data
    )
        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'DELETE_DEAL',
        payload: response
    }
}

//Function to get deal details
export function getDealDetails(dealId,token) {

    var setting = {
        method: 'post',
        url: hostURL + getDealDetailsAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "id" : dealId,
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
        }
    }

    var response = axios(setting).then(
        response => 
        {
            var responseDetails = response.data.responseData
            var output ={
                "message": response.data.message,
                "status":response.data.status,
                "responseData":{
                    "merchantId": responseDetails.merchantId,
                    "id": responseDetails.id,
                    "entityName": responseDetails.entityName,
                    "shortDescription": responseDetails.shortDescription,
                    "longDescription": responseDetails.longDescription,
                    "startDate": (responseDetails.startDate !== null ) ? moment(responseDetails.startDate).format('YYYY-MM-DD') : undefined ,
                    "endDate": (responseDetails.endDate !== null ) ? moment(responseDetails.endDate).format('YYYY-MM-DD') : undefined ,
                    "status": (responseDetails.status).toString(),
                    "location":responseDetails.location, 
                    "cashBonus":(responseDetails.cashBonus).toString(),   
                }
            }

            return output;
        }
        )

        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'GET_DEAL_DETAILS',
        payload: response
    }
}


//Function to update deal details
export function updateDeal(values,token) {

    var setting = {
        method: 'post',
        url: hostURL + updateDealAPI,
        data: {
            "platform": 'Web',
	        "requestData":{
                "id":values.id,
                "shortDescription": "",
                "longDescription": "",
                "startDate": values.startDate === undefined ? undefined : (values.startDate).replace(normalizedPhone,''),
		        "endDate": values.endDate === undefined ? undefined : (values.endDate).replace(normalizedPhone,''),
                "cashBonus": values.cashBonus,
                "location": values.location,
                "status" : values.status,
            }
	    },
        headers: {
            'content-type': 'application/json',
            'auth' : token
        }
    }

    var response = axios(setting).then(
        response => response.data
    )
        .catch(response => response = {
            success: 500,
            message: "Your submission could not be completed. Please Try Again!",
            data: ""
        }
        );

    return {
        type: 'UPDATE_DEAL',
        payload: response
    }
}