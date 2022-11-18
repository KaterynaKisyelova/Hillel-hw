"use strict";

const TEXTAREA_SELECTOR = ".textarea";
const DELETE_BTN_SELECTOR = ".delete-btn";
const DATA_ID_ATTR = "data-id";
const STICKER_SELECTOR = ".sticker";
const STICKERS_CONTAINER_SELECTOR = ".root-stickers";
const ADD_STICKER_BTN_SELECTOR = ".add-sticker-btn";

const $stickersContainer = $(STICKERS_CONTAINER_SELECTOR);
const $addStickerBtn = $(ADD_STICKER_BTN_SELECTOR);
let stickersList = [];

$addStickerBtn.on("click", onAddStickerBtnClick);
$stickersContainer
  .on("focusout", TEXTAREA_SELECTOR, onTextareaFocusout)
  .on("click", DELETE_BTN_SELECTOR, onDeleteBtnClick);

getStickers();

function getStickers() {
  StickersApi.get()
    .then((res) => (stickersList = [...res]))
    .then(addStickers)
    .catch((err) => console.log(err.message));
}

function addStickers(stickers) {
  $stickersContainer.html(
    stickers.map((sticker) => generateSticker(sticker.id, sticker.description))
  );
}

function generateSticker(id, description) {
  return `<div class="sticker" ${id ? `data-id=${id}` : ""}>
            <button class="delete-btn">X</button>
            <textarea class="textarea">${
              description ? description : ""
            }</textarea>
          </div>`;
}

function onAddStickerBtnClick() {
  const newSticker = generateSticker();
  $stickersContainer.append(newSticker);
}

function onTextareaFocusout() {
  const id = findStickerId($(this));
  const description = $(this).val();

  if (!id && isDescription(description)) {
    return;
  }

  if (id) {
    updateStickers(id, description);
    return;
  }

  addNewSticker(description);
}

function updateStickers(id, description) {
  StickersApi.update(id, { description })
    .then((res) => {
      return stickersList.map((sticker) =>
        sticker.id === res.id ? res : sticker
      );
    })
    .then((res) => {
      addStickers(res);
    })
    .catch((err) => console.log(err.message));
}

function addNewSticker(description) {
  StickersApi.add({ description })
    .then((res) => {
      stickersList.push(res);
      return stickersList;
    })
    .then(addStickers)
    .catch((err) => console.log(err.message));
}

function onDeleteBtnClick() {
  const $sticker = findSticker($(this));
  const id = findStickerId($(this));

  if (!id) {
    return;
  }

  deleteSticker(id, $sticker);
}

function deleteSticker(id, sticker) {
  StickersApi.delete(id)
    .then((res) => {
      const newStickersList = stickersList.filter(
        (sticker) => sticker.id !== res.id
      );
      getStickers(newStickersList);
    })
    .catch((err) => console.log(err.message));
  sticker.remove();
}

function findSticker(target) {
  return target.closest(STICKER_SELECTOR);
}

function findStickerId(sticker) {
  return findSticker(sticker).attr(DATA_ID_ATTR);
}

function isDescription(text) {
  return text.trim() === "";
}
