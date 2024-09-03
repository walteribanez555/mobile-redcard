import { getDiscount, postDiscount, putDiscount, deleteDiscount } from '../models/discounts.model.mjs';


export async function getDiscounts({id}) {
    return getDiscount({id, schema : 'mobile-redcard'});
}

export async function postDiscounts({data}) {
    return postDiscount({data, schema : 'mobile-redcard'});
        
}

export async function putDiscounts({id, data}) {
    return putDiscount({id, data, schema : 'mobile-redcard'});
        
}

export async function deleteDiscounts({id}) {
    return deleteDiscount({id, schema : 'mobile-redcard'});
        
}
