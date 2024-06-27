/** get env of login variable */
export const getEnvURI = () => {
  const url = process.env.NEXT_PUBLIC_ZITADEL_AUTH;
  const callbackUri = process.env.NEXT_PUBLIC_CALLBACK_URI;
  const userName = process.env.NEXT_PUBLIC_ZITADEL_USER_NAME;
  const zitadelURI = `${url}/oauth/v2/authorize?client_id=${userName}&redirect_uri=${callbackUri}&response_type=code&scope=openid%20email%20profile&code_challenge=9az09PjcfuENS7oDK7jUd2xAWRb-B3N7Sr3kDoWECOY&code_challenge_method=S256`;
  return zitadelURI;
};

export const getTokenInLocal = () => {
  const token = localStorage.getItem('access-token');
  return token
}