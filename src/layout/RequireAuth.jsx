import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { asyncPreloadProcess } from '../states/isPreload/action';
import Loading from '../components/Loading';

export default function RequireAuth() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const signOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) return null;

  if (!authUser) return <Navigate to="/login" />;

  return (
    <>
      <Loading />
      <Header />
      <Outlet />
      <Navigation signOut={signOut} />
    </>
  );
}
