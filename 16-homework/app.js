"use strict";

const GITHUB_USER_INFO = [
  "avatar_url",
  "public_repos",
  "followers",
  "following",
];

const githubForm = document.querySelector(".github-form");
const githubContent = document.querySelector(".github-content");
let userTemplate = document.querySelector("#github-user-template").innerHTML;

githubForm.addEventListener("submit", onGithubFormSubmit);

function onGithubFormSubmit(e) {
  e.preventDefault();
  clearContent(githubContent);
  const login = e.target.elements[0].value;
  fetch(`https://api.github.com/users/${login}`)
    .then((response) => checkResponse(response))
    .then((receivedUser) =>
      createGithubUser(receivedUser, userTemplate, GITHUB_USER_INFO)
    )
    .then((user) => addGithubUser(user))
    .catch((error) => console.error(error));
  clearForm(e.target);
}

function clearContent(container) {
  container.textContent = null;
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Github user is not found");
}

function createGithubUser(user, template, info) {
  let newTemplate = template;

  for (const infoPiece of info) {
    newTemplate = newTemplate.replace(`{{${infoPiece}}}`, user[infoPiece]);
  }

  return newTemplate;
}

function addGithubUser(user) {
  githubContent.insertAdjacentHTML("afterbegin", user);
}

function clearForm(form) {
  form.reset();
}
