class AlbumsApi {
  static URL = "https://jsonplaceholder.typicode.com";

  static makeRequest(id = "") {
    return fetch(
      `${AlbumsApi.URL}${id ? `/photos?albumId=${id}` : "/albums"}`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("An error occurred.", { cause: res });
    });
  }

  static getAllAlbums() {
    return AlbumsApi.makeRequest().catch((err) => {
      throw new Error("Albums are not found.");
    });
  }

  static getAlbumPhotos(id) {
    return AlbumsApi.makeRequest(id).catch((err) => {
      throw new Error("Photos are not found.");
    });
  }
}
