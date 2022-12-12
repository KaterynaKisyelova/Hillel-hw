"use strict";

const ALBUM_CLASS_NAME = "album";

const albumsContainer = document.querySelector(".albums-list");
const photosContainer = document.querySelector(".photos");

albumsContainer.addEventListener("click", onAlbumsContainerClick);

AlbumsApi.getAllAlbums()
  .then((res) => {
    renderPhotos(res[0].id);
    const albums = res.map((item) => generateAlbum(item)).join("");
    addContent(albumsContainer, albums);
  })
  .catch((err) => showError(err));

function onAlbumsContainerClick(e) {
  const album = isAlbum(e.target);
  
  if (!album) {
    return;
  }

  const id = e.target.dataset.id;

  renderPhotos(id);
}

function renderPhotos(id) {
  AlbumsApi.getAlbumPhotos(id)
    .then((res) => {
      const photos = res.map((item) => generatePhoto(item)).join("");
      addContent(photosContainer, photos);
    })
    .catch((err) => showError(err));
}

function isAlbum(target) {
  return target.classList.contains(ALBUM_CLASS_NAME);
}

function generateAlbum({ id, title }) {
  return `<li class='album' data-id=${id}>${title}</li>`;
}

function generatePhoto({ thumbnailUrl }) {
  return `<img src=${thumbnailUrl}></img>`;
}

function addContent(container, content) {
  container.innerHTML = content;
}

function showError(err) {
  console.log(err.message);
}
