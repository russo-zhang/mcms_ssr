const devBaseURL = "http://127.0.0.1:3013";
const proBaseURL = "http://43.138.141.165:3001";
export const baseURL = process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;
