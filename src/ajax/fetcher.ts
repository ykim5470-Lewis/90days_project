import fetch from "isomorphic-fetch";

async function _isoFetcher(url: RequestInfo, data: RequestInit) {
  try {
    const res = await fetch(url, data);
    const json = await res.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export default _isoFetcher;
