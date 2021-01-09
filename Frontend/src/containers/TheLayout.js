import React, { useState, useEffect } from 'react'
import AxiosClient from 'src/api/AxiosClient';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'


const TheLayout = () => {
  const [user, setUser] = useState(null);
  const FetchLoginUser = async (mounted) => {
    await AxiosClient.get("/Employees/1").then(res => {
      // console.log('Get data successfully: ', res);
      // console.log("Data Header:", Object.keys(res));
      if (mounted) {
        setUser(res);
      }
    }).catch(err => {
      console.log('Failed to Get data: ', err);
    });
  }

  // useEffect(()=>{
  //   let mounted = true;
  //   FetchLoginUser(mounted)
  //   return () => mounted = false;
  // },[]);

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader user={null}/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
