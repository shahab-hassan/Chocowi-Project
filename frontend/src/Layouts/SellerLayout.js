import React from 'react'
import { Outlet } from 'react-router-dom'

import SellerHeader from "../Components/seller/SellerHeader"
import BuyerFooter from "../Components/buyer/BuyerFooter"

function Layout() {
    return (
        <div>
            <SellerHeader />
            <Outlet />
            <BuyerFooter />
        </div>
    )
}

export default Layout