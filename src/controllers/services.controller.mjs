import { getService, postService, putService, deleteService } from '../models/services.model.mjs';


export async function getServices({id}) { 

    return getService({id, schema : 'mobile-redcard'});
}

export async function postServices({data}) { 

    return postService({data, schema : 'mobile-redcard'});
}

export async function putServices({id, data}) { 

    return putService({id, data, schema : 'mobile-redcard'});
}

export async function deleteServices({id}) { 

    return deleteService({id, schema : 'mobile-redcard'});

}

