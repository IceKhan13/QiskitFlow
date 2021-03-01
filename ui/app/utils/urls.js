export default function getBaseUrl() {
  return process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL_PROD
    : process.env.BASE_URL_DEV;
}
