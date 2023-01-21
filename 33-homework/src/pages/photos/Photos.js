import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import PhotoItem from "./PhotoItem";
import { getPhotos } from "../../store/actions/users";
import Message from "../../components/Message";
import styles from "./Photos.module.css";

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
      {arePhotosLoading && +albumId === +currentAlbumId ? (
        <Message>Loading...</Message>
      ) : null}
      {!arePhotosLoading && +albumId === +currentAlbumId ? (
        <div className={styles.photos}>
          {photosList.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Photos;
