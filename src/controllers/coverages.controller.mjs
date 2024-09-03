import {
  getCoverage,
  postCoverage,
  putCoverage,
  deleteCoverage,
} from "../models/coverages.model.mjs";

export async function getCoverages({ id }) {

  return getCoverage({ id, schema: "mobile-redcard" });
}

export async function postCoverages({ data }) {
  return postCoverage({ data, schema: "mobile-redcard" });
}

export async function putCoverages({ id, data }) {
  return putCoverage({ id, data, schema: "mobile-redcard" });
}

export async function deleteCoverages({ id }) {
  return deleteCoverage({ id, schema: "mobile-redcard" });
}
