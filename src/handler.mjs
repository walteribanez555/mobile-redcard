
import { ping } from "./utils/ping.mjs";
import { buildResponse, parseJsonToObject } from './utils/helpers.mjs';
import {  getServices, postServices, putServices , deleteServices } from './controllers/services.controller.mjs';
import { getLinks, postLinks, putLinks, deleteLinks } from './controllers/links.controller.mjs';
import { getCoverages, postCoverages, putCoverages, deleteCoverages } from "./controllers/coverages.controller.mjs";
import { deleteDiscounts, getDiscounts, postDiscounts, putDiscounts } from "./controllers/discounts.controller.mjs";


export const handler = async (event) => {
    console.log( 'Main Fecha-Hora: ', new Date() );
    console.log( 'EVENT: ' , event );
    const { method, path } = event?.requestContext?.http ? event.requestContext.http : {};
    // const authorization = event?.headers?.authorization ? event.headers.authorization : false;
    // const schema = event.headers.schema || 'assist_trip';
    const { id, init, end, nro_identificacion, quantity } = typeof( event.queryStringParameters ) === 'object' && Object.keys( event.queryStringParameters ).length > 0 ? event.queryStringParameters : false;
    const data = typeof( event.body ) === 'string' && Object.keys( parseJsonToObject( event.body ) ).length > 0 ? parseJsonToObject( event.body ) : {};
    console.log( 'DATA: ' , data );
    console.log( 'ID: ' , id );
    console.log( 'METHOD: ' , method.toLowerCase() );
    console.log( 'PATH: ' , path );
    // Your Lambda function code

    const endpoints = {
        '/' : ping,
        '/services' : {
            'get' : getServices,
            'post' : postServices,
            'put' : putServices,
            'delete' : deleteServices
        },
        '/links' : {
            'get' : getLinks,
            'post' : postLinks,
            'put' : putLinks,
            'delete' : deleteLinks
        },
        '/coverages' : {
            'get' : getCoverages,
            'post' : postCoverages,
            'put' : putCoverages,
            'delete' : deleteCoverages
        },
        '/discounts' : {
            'get' : getDiscounts,
            'post' : postDiscounts,
            'put' : putDiscounts,
            'delete': deleteDiscounts,
        },
        'others' : buildResponse,
    }

    if(path === '/'){
        return endpoints[path]()
    }

    // if(!authorization)
    //     return endpoints.others(401, {message : '401 Access denied'}, 'other');

    try {
        // const verified = jwt.verify( authorization, process.env.SECRET )
        // console.log( 'VERIFIED: ', verified );
        if ( endpoints.hasOwnProperty( path ) )
            return await endpoints[ path ][ method.toLowerCase() ]( { id, init, end, nro_identificacion, quantity, data} );

        return endpoints.others( 404, { message : '404 Not Found' }, 'other' );

    } catch ( error ) {
        console.log( 'ERROR VERIFIED: ', error );
        return endpoints.others( 400, { message : error }, 'other' );
    }
    


};