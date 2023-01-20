import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import AlbumItem from "../components/AlbumItem";
import { getAlbums } from "../store/actions/users";

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
      {areAlbumsLoading ? <div>Loading...</div> : null}{" "}
      {!areAlbumsLoading && +userId === +currentUserId ? (
        <ul className="list">
          {albumsList.map((album) => (
            <AlbumItem key={album.id} album={album} />
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default Albums;
