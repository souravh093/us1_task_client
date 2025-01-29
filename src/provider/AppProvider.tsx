"use client";

import { store } from '@/redux/store'
import React from 'react'
import {Provider as ReduxProvider} from "react-redux"

const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
    </div>
  )
}

export default AppProvider