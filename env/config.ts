const devBaseURL = "http://192.168.88.130:8888";
const proBaseURL = "https://www.foobargame.com/api";
export const baseURL = process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;
