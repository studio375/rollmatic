export function getBackendURL(path = "") {
  const ret = `${process.env.BACKEND_ENDPOINT}${path}`;
  return ret;
}
