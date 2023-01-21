import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import AlbumItem from "./AlbumItem";
import { getAlbums } from "../../store/actions/users";
import Message from "../../components/Message";
import styles from "./Albums.module.css";

function Albums() {
  const { albumsList, areAlbumsLoading } = useSelector((state) => state);
  const { currentUserId } = useOutletContext();
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getAlbums(userId));
  }, [userId, dispatch]);

  return (
    <>
      {areAlbumsLoading && +userId === +currentUserId ? (
        <Message>Loading...</Message>
      ) : null}
      {!areAlbumsLoading && +userId === +currentUserId ? (
        <ul className={styles.albums}>
          {albumsList.map((album) => (
            <AlbumItem key={album.id} album={album} />
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default Albums;
