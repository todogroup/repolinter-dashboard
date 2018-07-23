import 'whatwg-fetch';
/**
 * Convenience function for sending/receiving JSON for API calls.
 *
 * Write more that will cover use cases
 */
export async function reqJSON(
  url: string,
  obj?: any,
  method?: string
): Promise<any> {
  const body = obj !== undefined ? obj : undefined;
  const meth = method == undefined ? 'GET' : method;
  const res = await fetch(process.env.REACT_APP_ENDPOINT + url, {
    method: meth,
    body,
  });
  // happy? return
  if (res.ok) {
    return res.json();
  }

  // error handling
  let error: Error & { code?: number; response?: any };
  try {
    // assume it's json first; try to get the message out of it
    const json = await res.json();
    error = new Error(json.error);
  } catch (ex) {
    // otherwise just use the HTTP status code
    error = new Error(res.statusText);
  }

  // package it up nicely and throw
  error.code = res.status;
  error.response = res;
  throw error;
}

export async function postJSON(url: string, obj?: any): Promise<any> {
  return reqJSON(url, obj, 'POST');
}
