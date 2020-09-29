/**
 *  APIs to GET, SAVE, DELETE Authors
 */

import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getAuthorById(id) {
  return fetch(`baseUrl ${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then((authors) => {
        if (authors.length !== 1) throw new Error("Author not found: " + id);
        return authors[0]; // should only find one author for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveAuthor(author) {
  return fetch(baseUrl + (author.id || ""), {
    method: author.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAuthor(authorId) {
  return fetch(baseUrl + authorId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
