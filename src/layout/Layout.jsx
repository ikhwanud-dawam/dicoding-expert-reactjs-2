import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Layout() {
  return (
    <div>
      <Loading />
      <Outlet />

      <ScrollRestoration />
    </div>
  );
}
