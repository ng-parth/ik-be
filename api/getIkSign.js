import ImageKit from "imagekit";

const allowCors = fn => async (req, res) => {
  const origin = req.headers?.origin;
  console.log('Origin: ', origin);
  if (!(
      origin.indexOf('localhost') > -1 || 
      origin.indexOf('vercel') > -1 || 
      origin.indexOf('heroku') > -1 || 
      origin.indexOf('ome-extension') > -1
    )
  ) {
    res.status(401).end();
    return;
  }
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', origin);
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

function getIkSignature(request, response) {
  const {IMK_URL, IMK_PBL_KEY, IMK_PVT_KEY} = process.env;
  console.log('url: ', IMK_URL);
  console.log('pvtKey: ', IMK_PBL_KEY);
  console.log('pblKey: ', IMK_PVT_KEY);

  const imagekit = new ImageKit({
    publicKey : IMK_PBL_KEY,
    privateKey : IMK_PVT_KEY,
    urlEndpoint : IMK_URL,
  });
  const authenticationParameters = imagekit.getAuthenticationParameters();
  console.log(authenticationParameters);
  response.status(200).json(authenticationParameters);
}

export default allowCors(getIkSignature);
