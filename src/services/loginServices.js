import http from "./httpServices";
import { loginUrl } from "../config.json";

export function loginUser(email, password) {
  console.log(email);
  console.log(password);
  return http.post(loginUrl, {
    email,
    password
  });
}
