import { DatabaseOperations } from "../utils/database.mjs";
import { buildResponse, validateData, colorLog } from "../utils/helpers.mjs";

const tableName = 'coverages';
const idField = 'coverage_id';
const keyField = 'coverage_id';

const model= { 
    title : 'string',
    description : 'string',
    files: 'string',
}




export async function getCoverage({id , schema}) { 
    try{
        const database= new DatabaseOperations( tableName,schema);
        const data  = {
            where : {
                [keyField]: id
            }
        }
        const response = await database.read(data);
        return buildResponse(200,response,'get');
    }catch ( err ) {
        colorLog( ` GET COVERAGE ERROR:  ${ JSON.stringify( err ) }`, 'red', 'reset' );
        return buildResponse( 500, err, 'get' );
    }

}


export async function postCoverage({data, schema}) { 
    try {
        const database = new DatabaseOperations( tableName, schema );
        const newRegister = validateData( data, model );
        if ( Object.keys( newRegister ).length === 0 )
            return buildResponse( 400, { message : 'Missing required fields or not valid' }, 'post' );

        const response = await database.create( newRegister, keyField );
        return buildResponse( 200, response, 'post', keyField, data );
    } catch ( error ) {
        colorLog( ` COVERAGES SERVICES ERROR:  ${ JSON.stringify( error ) }`, 'red', 'reset' );
        return buildResponse( 500, error, 'post' );
    }
}

export async function putCoverage({id, data, schema}) { 
    try{
        const database = new DatabaseOperations(tableName, schema);
        const update = validateData(data , model , 'put');

        if(Object.keys( update ).length === 0)
            return buildResponse(400, {message : 'Missing fields to update'}, 'put');

        if(!id)
            return buildResponse(400, {message : 'Missing the record id to update'}, 'put');

        const where = {
            [keyField] : id
        };
        const response = await database.update(update, where);
        return buildResponse(200, response, 'put');

    }catch( error ) {
        colorLog( ` PUT COVERAGE ERROR:  ${ JSON.stringify( error ) }`, 'red', 'reset' );
        return buildResponse( 500, error, 'put' );
    }

}

export async function deleteCoverage({id, schema}) { 
    try { 
        const database = new DatabaseOperations(tableName, schema);

        if(!id)
            return buildResponse(400, {message : 'Missing the record id to delete'}, 'delete');

        await database.delete(id, keyField);
        return buildResponse(200, {message : 'Record deleted'}, 'delete');
    } catch( error ) { 
        colorLog( ` DELETE COVERAGE ERROR:  ${ JSON.stringify( error ) }`, 'red', 'reset' );
        return buildResponse( 500, error, 'delete' );
    }

}