import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import PhotoItem from "../components/PhotoItem";
import { getPhotos } from "../store/actions/users";

function Photos() {
  const { photosList, arePhotosLoading } = useSelector((state) => state);
  const { currentAlbumId } = useOutletContext();
  const dispatch = useDispatch();
  const { albumId } = useParams();

  useEffect(() => {
    dispatch(getPhotos(albumId));
  }, [albumId, dispatch]);

  return (
    <>
      {arePhotosLoading ? <div>Loading...</div> : null}
      {!arePhotosLoading && +albumId === +currentAlbumId ? (
        <div className="list">
          {photosList.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Photos;
