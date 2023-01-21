import React from "react";

function PhotoItem({ photo }) {
  return <img src={photo.thumbnailUrl} alt="albums item" />;
}
export default PhotoItem;
