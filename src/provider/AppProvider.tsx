"use client";

import { store } from '@/redux/store'
import React from 'react'
import { Toaster } from 'react-hot-toast';
import {Provider as ReduxProvider} from "react-redux"

const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <ReduxProvider store={store}>
          {children}
          <Toaster />
        </ReduxProvider>
    </div>
  )
}

export default AppProvider