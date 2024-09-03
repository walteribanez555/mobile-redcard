import { DatabaseOperations } from "../utils/database.mjs";
import { buildResponse, validateData, colorLog } from "../utils/helpers.mjs";

const tableName = "discounts";
const idField = "discount_id";
const keyField = "discount_id";

const model = {
  title: "string",
  description: "string",
  amount: "number",
  type: "number",
  imagesUrl: "string",
};

export async function getDiscount({ id, schema }) {
  try {
    const database = new DatabaseOperations(tableName, schema);
    const data = {
      where: {
        [keyField]: id,
      },
    };
    const response = await database.read(data);

    return buildResponse(200, response, "get");
  } catch (err) {
    colorLog(` GET DISCOUNT ERROR:  ${JSON.stringify(error)}`, "red", "reset");
    return buildResponse(500, error, "get");
  }
}

export async function postDiscount({ data, schema }) {
  try {
    const database = new DatabaseOperations(tableName, schema);
    const newRegister = validateData(data, model);
    if (Object.keys(newRegister).length === 0)
      return buildResponse(
        400,
        { message: "Missing required fields or not valid" },
        "post"
      );

    const response = await database.create(newRegister, keyField);
    return buildResponse(200, response, "post", keyField, data);
  } catch (err) {
    colorLog(` POST DISCOUNT ERROR:  ${JSON.stringify(error)}`, "red", "reset");
    return buildResponse(500, error, "post");
  }
}

export async function putDiscount({ id, data, schema }) {
  try {
    const database = new DatabaseOperations(tableName, schema);
    const update = validateData(data, model, 'put');

    if(Object.keys( update ).length === 0)
        return buildResponse(400, {message : 'Missing fields to update'}, 'put');

    if( !id )
        return buildResponse(400, { message : 'Missing the record id to update'});

    const where = {
        [keyField] : id
    };

    const response = await database.update(update, where);
    return buildResponse(200, response, 'put');
  } catch (err) {
    colorLog(` PUT DISCOUNT ERROR:  ${JSON.stringify(error)}`, "red", "reset");
    return buildResponse(500, error, "put");
  }
}

export async function deleteDiscount({ id, schema }) {
  try {
    const database = new DatabaseOperations(tableName, schema);

    if(!id)
        return buildResponse(400, { message : 'Missing the record id to delete'});

    await database.delete(id, keyField);
    return buildResponse(200, {message: 'Record deleted'}, 'delete');


  } catch (err) {
    colorLog(` DELETE DISCOUNT ERROR:  ${JSON.stringify(error)}`, "red", "reset");
    return buildResponse(500, error, "delete");

  }
}
