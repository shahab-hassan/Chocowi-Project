import React from 'react'
import { Outlet } from 'react-router-dom'

import BuyerHeader from "../Components/buyer/BuyerHeader"
import BuyerFooter from "../Components/buyer/BuyerFooter"

function Layout() {
    return (
        <div>
            <BuyerHeader />
            <Outlet />
            <BuyerFooter />
        </div>
    )
}

export default Layout