// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BuyerLayout from "./Layouts/BuyerLayout";
import SellerLayout from "./Layouts/SellerLayout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from "./Pages/buyer/Home";
import SignInPage from './Pages/buyer/SignInPage';
import SignUpPage from './Pages/buyer/SignUpPage';
import CompleteSignUp from './Pages/buyer/CompleteSignUp';
import { LoginProvider } from './Contexts/LoginContext';
import ScrollToTop from './Components/utils/ScrollToTop';
import Products from './Pages/buyer/Products';
import Categories from './Pages/buyer/Categories';
import Deals from './Pages/buyer/Deals';
import ProductDetail from './Pages/buyer/ProductDetail';
import VendorDetail from './Pages/buyer/VendorDetail';
import BlogPage from './Pages/buyer/Blogs';
import TradeLeadsPage from './Pages/buyer/TradeLeadPage';
import TradeLeadForm from './Pages/buyer/TradeLeadForm';
import OrdersPage from './Pages/buyer/OrdersPage'
import OrderDetailsPage from './Pages/buyer/OrderDetailsPage'
import SettingsPage from './Pages/buyer/SettingsPage'
import CheckoutPage from './Pages/buyer/CheckoutPage';
import BookmarkSellers from './Pages/buyer/BookmarkSellers';
import ChatComponent from './Pages/buyer/ChatPage';
import MyReviews from './Pages/buyer/MyReviewsPage';
import OrderTrackingPage from './Pages/buyer/OrderTrackingPage';
import ProfilePage from './Pages/buyer/ProfilePage';
import BecomeSeller from './Pages/seller/BecomeSeller';
import { ArticleDetailPage } from './Pages/buyer/ArticleDetailPage';
import SellerDashboard from './Pages/seller/SellerDashboard';
import SellerPostings from './Pages/seller/SellerPostings';
import CreateProductPage from './Pages/seller/CreateProductPage';
import PackagesPage from './Pages/seller/PackagesPage';
import SellerTradeLead from './Pages/seller/SellerTradeLead';
import AnalyticsPage from './Pages/seller/AnalyticsPage';
import SellerProfile from './Pages/seller/SellerProfile';
import { CartProvider } from './Contexts/CartContext';
import { BookmarkProvider } from './Contexts/BookmarkProvider';
import ResetPasswordRequest from "./Pages/buyer/ResetPasswordRequest"
import ResetPassword from "./Pages/buyer/ResetPassword"

function App() {
    return (
        <LoginProvider>
            <CartProvider>
                <BookmarkProvider>
                    <ScrollToTop />
                    <Routes>
                        <Route element={<BuyerLayout />}>
                            <Route path='/' element={<Home />} />
                            <Route path='/categories' element={<Categories />} />
                            <Route path='/products' element={<Products />} />
                            <Route path='/deals' element={<Deals />} />
                            <Route path='/productDetail' element={<ProductDetail />} />
                            <Route path='/postYourRequirements' element={<TradeLeadsPage />} />
                            <Route path='/tradeLeadForm' element={<TradeLeadForm />} />
                            <Route path='/vendorDetail' element={<VendorDetail />} />
                            <Route path='/blogs' element={<BlogPage />} />
                            <Route path='/articleDetail/*' element={<ArticleDetailPage />} />
                            <Route path='/orders' element={<OrdersPage />} />
                            <Route path='/orderDetailPage' element={<OrderDetailsPage />} />
                            <Route path='/settingsPage' element={<SettingsPage />} />
                            <Route path='/checkoutPage' element={<CheckoutPage />} />
                            <Route path='/bookmarkSellers' element={<BookmarkSellers />} />
                            <Route path='/chatPage' element={<ChatComponent />} />
                            <Route path='/myReviews' element={<MyReviews />} />
                            <Route path='/orderTrackingPage' element={<OrderTrackingPage />} />
                            <Route path='/profilePage' element={<ProfilePage />} />
                        </Route>
                        <Route path='/signin' element={<SignInPage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                        <Route path='/completeProfile' element={<CompleteSignUp />} />
                        <Route path='/becomeSeller' element={<BecomeSeller />} />
                        <Route path='/resetPasswordRequest' element={<ResetPasswordRequest />} />
                        <Route path='/resetPassword/:token' element={<ResetPassword />} />
                    </Routes>

                    <Routes>
                        <Route element={<SellerLayout />}>
                            <Route path='/sellerDashboard' element={<SellerDashboard />} />
                            <Route path='/postings' element={<SellerPostings />} />
                            <Route path="/createProduct/:id" element={<CreateProductPage />} />
                            <Route path='/packages' element={<PackagesPage />} />
                            <Route path='/tradeLead' element={<SellerTradeLead />} />
                            <Route path='/yourOrders' element={<OrdersPage />} />
                            <Route path='/sellerOrderDetailPage' element={<OrderDetailsPage />} />
                            <Route path='/sellerOrderTrackingPage' element={<OrderTrackingPage />} />
                            <Route path='/sellerChatPage' element={<ChatComponent />} />
                            <Route path='/analytics' element={<AnalyticsPage />} />
                            <Route path='/sellerProfile' element={<SellerProfile />} />
                        </Route>
                    </Routes>

                    <ToastContainer position="bottom-left" />
                </BookmarkProvider>
            </CartProvider>
        </LoginProvider>
    );
}

export default App;
