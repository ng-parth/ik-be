import ImageKit from "imagekit";

export default function getIkSignature(request, response) {
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

