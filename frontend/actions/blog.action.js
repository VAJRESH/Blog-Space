import { API } from "../config";

export function createNewBlog(data, token) {
  return fetch(`${API}/blog/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function updateBlog(data, slug, token) {
  return fetch(`${API}/blog/update/${slug}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function updateView(slug) {
  return fetch(`${API}/blog/updateView/${slug}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function updateLikesOfBlog(slug, token) {
  return fetch(`${API}/blog/updateLike/${slug}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function getAllBlogs(skip = 0, limit = 5) {
  return fetch(`${API}/blog/list?skip=${skip}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function getSingleBlog(slug) {
  return fetch(`${API}/blog/single/${slug}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function getUserBlogs(userId) {
  return fetch(`${API}/blog/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function getBlogsByTag(tag) {
  return fetch(`${API}/blog/list/${tag}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function getBlogsByQuery(searchString) {
  return fetch(`${API}/blog/?=${searchString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function deleteBlog(slug, token) {
  return fetch(`${API}/blog/delete/${slug}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
