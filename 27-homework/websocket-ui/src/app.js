import WebSocketApi from "./WebSocketApi";
import formHtml from "./chatForm.html";
import contentHtml from "./chatContent.html";
import "./style.css";

const URL = "ws://localhost:8081";

const chatContainer = document.querySelector("#root-chat");

initChat(chatContainer, formHtml, contentHtml);

const chatForm = document.querySelector("#chat-form");
const chatContent = document.querySelector(".content");
const nameInput = document.querySelector(".name-input");
const messageInput = document.querySelector(".message-input");
const webSocket = new WebSocketApi(URL, {
  onMessage(message) {
    onWebSocketMessage(message);
  },
});

chatForm.addEventListener("submit", onChatFormSubmit);

function initChat(container, form, content) {
  container.insertAdjacentHTML("beforeend", form);
  container.insertAdjacentHTML("beforeend", content);
}

function onChatFormSubmit(e) {
  const name = nameInput.value;
  const message = messageInput.value;
  const messageObj = generateMessageObj(name, message);

  e.preventDefault();

  if (!isMassageValid(messageObj)) {
    return;
  }

  webSocket.send(messageObj);
  chatForm.reset();
}

function onWebSocketMessage({ name, message }) {
  console.log(name, message);
  const messageItem = generateMessage(name, message);
  chatContent.insertAdjacentHTML("beforeend", messageItem);
}

function generateMessageObj(name, message) {
  return { name, message };
}

function isMassageValid(massage) {
  return massage.name.trim() && massage.message.trim();
}

function generateMessage(name, message) {
  return `<li>
            <span>${name}</span>
            <p>${message}</p>
          </li>`;
}
