import { DatabaseOperations } from "../utils/database.mjs";
import { buildResponse, validateData, colorLog } from "../utils/helpers.mjs";


const tableName = 'discounts';
const idField = 'discount_id';
const keyField = 'discount_id';

const model ={
    title : 'string',
    description : 'string',
    amount : 'number',
    type : 'number',
    imagesUrl : 'string',
}



export async function getDiscount({id, schema}){

    try{

    }catch( err ) {
        
    }
}


export async function postDiscount({data, schema}){

    try{

    }catch(err){

    }
}


export async function putDiscount({id, data ,schema}){
    try{

    }catch( err ){

    }

}

export async function deleteDiscount({id, schema}){ 
    try{

    }catch(err) { 
         
    }
}
