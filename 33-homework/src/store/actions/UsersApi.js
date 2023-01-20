class UsersApi {
  static USERS_URL = "https://jsonplaceholder.typicode.com/users";
  static ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums/";
  static PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos";

  static makeRequest(url) {
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("An error occurred.");
    });
  }

  static fetchUsers() {
    return UsersApi.makeRequest(UsersApi.USERS_URL).catch(() => {
      throw new Error("Users are not found.");
    });
  }

  static fetchAlbums(id) {
    return UsersApi.makeRequest(`${UsersApi.ALBUMS_URL}?userId=${id}`).catch(
      () => {
        throw new Error("Albums are not found.");
      }
    );
  }

  static fetchPhotos(id) {
    return UsersApi.makeRequest(`${UsersApi.PHOTOS_URL}?albumId=${id}`).catch(
      () => {
        throw new Error("Photos are not found.");
      }
    );
  }
}

export default UsersApi;
