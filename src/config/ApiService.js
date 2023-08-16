import { API_BASE_URL } from "./api-config";
import { Buffer } from "buffer";
import base64 from "base-64";

export async function call(api, method, request) {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  let headers = new Headers({
    "Content-Type": "application/json",
  });

  if (accessToken && accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }
  return await fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        console.log("status 200 ok");

        return response.json();
      } else if (response.status === 400) {
        alert("login 실패");
        window.location.href = "/";
      } else if (response.status === 401) {
        alert("가입 승인 대기 중입니다");
        window.location.href = "/";
      } else {
        Promise.reject(response);
        throw Error(response);
      }
    })
    .catch((error) => {
      console.error("HTTP Error");
      console.error(error);
    });
}

export async function signup(userDTO) {
  console.log(userDTO);
  return await call("/api/v1/members", "POST", userDTO);
}

export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  localStorage.setItem("USER_NAME", null);
  localStorage.setItem("USER_ROLE", null);
  window.location.href = "/";
}

export async function orderList() {
  const email = localStorage.getItem("USER_ID");
  const data = await call("/order?email=" + email, "GET");
  return data;
}

export async function order(orderDTO) {
  return await call("/order/", "POST", orderDTO);
}

export async function orderDetail(orderId = "") {
  if (orderId) {
    return await call("/order/" + orderId);
  }
  return null;
}

export async function signin(userDTO) {
  return await call("/api/v1/accounts/token", "POST", userDTO).then(
    (response) => {
      if (response.response.accessToken) {
        localStorage.setItem("ACCESS_TOKEN", response.response.accessToken);
        var base64Payload = response.response.accessToken.split(".")[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
        let token = response.response.accessToken;
        let payload = token.substring(
          token.indexOf(".") + 1,
          token.lastIndexOf(".")
        );
        let dec = JSON.parse(base64.decode(payload));
        localStorage.setItem("USER_ROLE", dec["auth"]);
        localStorage.setItem("USER_NAME", dec["sub"]);
        window.location.href = "/";
      }
    }
  );
}
