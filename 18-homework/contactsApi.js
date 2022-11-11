class Contacts {
  static URL = "https://636c0ce8ad62451f9fc28b97.mockapi.io/contacts/";

  static get() {
    return fetch(Contacts.URL).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Contacts are not found.");
    });
  }

  static create(contact) {
    return fetch(Contacts.URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(contact),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Creating contact has failed.");
    });
  }

  static update(id, contact) {
    return fetch(`${Contacts.URL}${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(contact),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Updating contact has failed.");
    });
  }

  static delete(id) {
    return fetch(`${Contacts.URL}${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Failed to delete the contact.");
    });
  }
}
