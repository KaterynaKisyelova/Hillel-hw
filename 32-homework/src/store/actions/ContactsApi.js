class ContactsApi {
  static URL = "https://62054479161670001741b708.mockapi.io/api/contacts/";

  static get() {
    return fetch(ContactsApi.URL).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Contacts are not found.");
    });
  }

  static create(contact) {
    return fetch(ContactsApi.URL, {
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
    return fetch(`${ContactsApi.URL}${id}`, {
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
    return fetch(`${ContactsApi.URL}${id}`, { method: "DELETE" }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to delete the contact.");
      }
    );
  }
}

export default ContactsApi;
