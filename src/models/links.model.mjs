

// CREATE TABLE links (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255),
//     subtitle VARCHAR(255),
//     link VARCHAR(255),
//     status INT
// );'

import { DatabaseOperations } from "../utils/database.mjs";
import { buildResponse, validateData, colorLog } from "../utils/helpers.mjs";


const tableName = 'links';
const idField = 'link_id';
const keyField = 'link_id';

const model = { 
    title: 'string',
    subtitle: 'string',
    url: 'string',
    status: 'number'
}


export async function getLink({id, schema}) {
    try {
        const database = new DatabaseOperations( tableName, schema );
        const data = { 
            where : {
                [ keyField ] : id
            } 
        };
        const response = await database.read( data );
        return buildResponse( 200, response, 'get' );
    } catch ( error ) {
        colorLog( ` GET LINKS ERROR:  ${ JSON.stringify( error ) }`, 'red', 'reset' );
        return buildResponse( 500, error, 'get' );
    }
}

export async function postLink({data, schema}) {
    try {
        const database = new DatabaseOperations( tableName, schema );
        const newRegister = validateData( data, model );
        if ( Object.keys( newRegister ).length === 0 )
            return buildResponse( 400, { message : 'Missing required fields or not valid' }, 'post' );

        const response = await database.create( newRegister, keyField );
        return buildResponse( 200, response, 'post', keyField, data );
    } catch ( error ) {
        colorLog( ` POST LINKS ERROR:  ${ JSON.stringify( error ) }`, 'red', 'reset' );
        return buildResponse( 500, error, 'post' );
    }
}


export async function putLink({id, data, schema}) {
    try {
        const database = new DatabaseOperations( tableName, schema );
        const update = validateData( data, model, 'put' );

        if ( Object.keys( update ).length === 0 )
            return buildResponse( 400, { message : 'Missing fields to update' }, 'put' );

        if ( !id )
            return buildResponse( 400, { message : 'Missing the record id to update' }, 'put' );

        const where = {
            [ keyField ] : id
        };
        const response = await database.update( update, where );
        return buildResponse( 200, response, 'put' );
    } catch( error ) { 
        colorLog( ` PUT LINKS ERROR:  ${ JSON.stringify( error ) }`, 'red', 'reset' );
        return buildResponse( 500, error, 'put' );
    }
}


export async function deleteLink({id ,schema}) {
    try {
        const database = new DatabaseOperations( tableName, schema );
        if ( !id )
            return buildResponse( 400, { message : 'Missing the record id to delete' }, 'delete' );

        await database.delete( id, keyField );
        return buildResponse( 200, { message : 'Register deleted!' }, 'delete' );

    } catch( error ) { 
        colorLog( ` DELETE LINKS ERROR:  ${ JSON.stringify( error ) }`, 'red', 'reset' );
        return buildResponse( 500, error, 'delete' );
    }
}