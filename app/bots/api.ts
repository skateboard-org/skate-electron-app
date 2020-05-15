import serverConstants from '../constants/server.json';

const url =
  process.env.NODE_ENV === 'production'
    ? serverConstants.prodApiUrl
    : serverConstants.devApiUrl;

export default url;
