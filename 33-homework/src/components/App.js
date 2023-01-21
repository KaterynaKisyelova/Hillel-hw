import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getUsers } from "../store/actions/users";
import { useDispatch } from "react-redux";
import Users from "../pages/users/Users";
import Albums from "../pages/albums/Albums";
import Photos from "../pages/photos/Photos";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />}>
            <Route path="/users/:userId" element={<Albums />}>
              <Route path="/users/:userId/:albumId" element={<Photos />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
