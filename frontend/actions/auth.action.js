import { API } from "../config";

// export function isNameAvailable(name) {
//   return fetch(`${API}/auth/${name}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .catch((err) => console.log(err));
// }

export function register(user) {
  return fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function login(user) {
  return fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

// export function update(user, token) {
//   return fetch(`${API}/auth/update`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: user,
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .catch((err) => console.log(err));
// }

export function setCookie(key, value) {
  document.cookie = `${key}=${value}; path=/; max-age=31536000`;
}

export function getCookie(key) {
  const cookies = document.cookie;
  const allCookies = cookies
    .split(";")
    .map((items) => items.split("=").map((item) => item.trim()));

  let value;
  allCookies.some((item) => {
    if (item[0] === key.trim()) {
      return (value = item[1]);
    }
    return false;
  });

  return value;
}

export function deleteCookie(key) {
  return (document.cookie = `${key}=; expires=${new Date()}; path=/`);
}

export function setLocalStorage(key, value) {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function isAuth() {
  if (process.browser) {
    const cookieCheck = getCookie("token");
    if (cookieCheck) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      }
      return false;
    }
  }
}

export function authenticateUser(data) {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
}

export function logout() {
  deleteCookie("token");
  localStorage.clear();

  return fetch(`${API}/auth/logout`, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteUser(token) {
  deleteCookie("token");
  localStorage.clear();

  return fetch(`${API}/auth/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
