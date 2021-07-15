import { API } from "../config";

export function createNewBlog(data, token) {
  return fetch(`${API}/blog/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
