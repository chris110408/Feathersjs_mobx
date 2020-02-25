import request from "umi-request";

export async function requestSignUp(payload) {
  console.log(payload);
  return request("http://localhost:3030/users", {
    method: "POST",
    data: payload
  });
}
