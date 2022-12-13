export default class StudentsApi {
  static URL = "https://6391adecac688bbe4c4f165a.mockapi.io/api/students/";

  static makeRequest(id = "", method = "GET", content) {
    return fetch(`${StudentsApi.URL}${id}`, {
      method,
      body: content ? JSON.stringify(content) : undefined,
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("An error occurred", { cause: response });
    });
  }

  static get() {
    return StudentsApi.makeRequest().catch(() => {
      throw new Error("Failed to get marks.");
    });
  }

  static create(student) {
    return StudentsApi.makeRequest("", "POST", student).catch(() => {
      throw new Error("Failed to create a student.");
    });
  }

  static update(id, changes) {
    return StudentsApi.makeRequest(id, "PUT", changes).catch(() => {
      throw new Error("Failed to update the student.");
    });
  }

  static delete(id) {
    return StudentsApi.makeRequest(id, "DELETE").catch(() => {
      throw new Error("Failed to delete the student.");
    });
  }
}
