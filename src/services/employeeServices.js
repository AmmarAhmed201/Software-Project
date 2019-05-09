import http from "./httpServices";
import { apiUrl } from "../config.json";

function employeeUrl(mail) {
  return `${apiUrl}/${mail}`;
}

export function getEmployees(jwt) {
  return http.get(apiUrl, { headers: { "x-auth-token": jwt } });
}

export function getEmployee(employeeMail) {
  return http.get(employeeUrl(employeeMail));
}

export function updateEmployee(employee, mail) {
  let emp = {
    name: employee.name,
    email: mail,
    newMail: employee.email,
    password: employee.password,
    rePassword: employee.rePassword,
    phone: employee.phone
  };
  return http
    .put(apiUrl, emp)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function addEmployee(emp) {
  return http
    .post(apiUrl, emp)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function deleteEmployee(employeeMail) {
  return http.delete(apiUrl, { data: { email: employeeMail } });
}
