import React, { Component } from 'react';
import { Route, Redirect } from 'umi';
import Cookie from '@/utils/cookie';
export default (props: any) => {
  console.info('token',Cookie.get('token'))
  const isLogin = Cookie.get('token');
  return (
    isLogin ? props.children : <Redirect to="/login" />
  );
};
