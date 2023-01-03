class TodosApi {
  static URL = "https://62054479161670001741b708.mockapi.io/api/todo/";

  static makeRequest(id = "", method = "GET", content) {
    return fetch(`${TodosApi.URL}${id}`, {
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
    return TodosApi.makeRequest().catch(() => {
      throw new Error("Failed to get todos.");
    });
  }

  static create(todo) {
    return TodosApi.makeRequest("", "POST", todo).catch(() => {
      throw new Error("Failed to create a todo.");
    });
  }

  static update(id, changes) {
    return TodosApi.makeRequest(id, "PUT", changes).catch(() => {
      throw new Error("Failed to update the todo.");
    });
  }

  static delete(id) {
    return TodosApi.makeRequest(id, "DELETE").catch(() => {
      throw new Error("Failed to delete the todo.");
    });
  }
}

export default TodosApi;
