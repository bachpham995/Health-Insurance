import React, { useState, useEffect } from 'react'
import AxiosClient from 'src/api/AxiosClient';
import Common from 'src/services/Common';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'


const TheLayout = ({ user }) => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar user={user} />
      <div className="c-wrapper">
        <TheHeader user={user} />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
