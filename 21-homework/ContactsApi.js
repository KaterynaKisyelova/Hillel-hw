class Contacts {
  static URL = "https://62054479161670001741b708.mockapi.io/api/contacts/";

  static makeRequest(id = "", method = "GET", contact) {
    return fetch(`${Contacts.URL}${id}`, {
      method,
      headers: { "Content-type": "application/json" },
      body: contact ? JSON.stringify(contact) : undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("An error occurred.", { cause: res });
    });
  }

  static get() {
    return Contacts.makeRequest().catch(() => {
      throw new Error("Contacts are not found.");
    });
  }

  static create(contact) {
    return Contacts.makeRequest("", "POST", contact).catch(() => {
      throw new Error("Creating contact has failed.");
    });
  }

  static update(id, contact) {
    return Contacts.makeRequest(id, "PUT", contact).catch(() => {
      throw new Error("Updating contact has failed.");
    });
  }

  static delete(id) {
    return Contacts.makeRequest(id, "DELETE").catch(() => {
      throw new Error("Failed to delete the contact.");
    });
  }
}
