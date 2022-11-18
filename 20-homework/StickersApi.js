class StickersApi {
  static URL = "https://636c0ce8ad62451f9fc28b97.mockapi.io/stickers/";

  static makeRequest(id = "", method = "GET", content) {
    return fetch(`${StickersApi.URL}${id}`, {
      method,
      headers: { "Content-type": "application/json" },
      body: content ? JSON.stringify(content) : undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("An error occurred.", { cause: res });
    });
  }

  static get() {
    return StickersApi.makeRequest().catch((err) => {
      throw new Error("Stickers are not found.");
    });
  }

  static add(sticker) {
    return StickersApi.makeRequest("", "POST", sticker).catch((err) => {
      throw new Error("Adding new sticker failed.");
    });
  }

  static update(id, description) {
    return StickersApi.makeRequest(id, "PUT", description).catch((err) => {
      throw new Error("Updating the sticker failed.");
    });
  }

  static delete(id) {
    return StickersApi.makeRequest(id, "DELETE").catch((err) => {
      throw new Error("Failed to delete the sticker.");
    });
  }
}
