const devBaseURL = "http://127.0.0.1:3013";
// const devBaseURL = "http://api.resoudaquan.cn";
const proBaseURL = "https://www.resoudaquan.cn";
export const baseURL = process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;
