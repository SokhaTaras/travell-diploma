export const OAUTH_TOKEN_PATH:string="/oauth/token";
export const BASIC = 'Basic bXktY2xpZW50Om15LXNlY3JldA==';
export const CONTENT_TYPE = 'Content-Type';
export const AUTHORIZATION = 'Authorization';
export const ACCEPT = 'Accept';
export const ENCTYPE = 'enctype';
export const APP_JSON = 'application/json';
export const APP_FORM = 'application/x-www-form-urlencoded';
export const FORM_DATA_MULTIPART = 'form-data/multipart';
// export const BEARER = ;
export const GRANT_TYPE = 'grant_type';
export function BEARER(token:string):string {
  return 'Bearer '+token;
}
