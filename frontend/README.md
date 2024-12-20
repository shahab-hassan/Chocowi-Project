# First Increment (Frontend)

**Date:** 13-Sep-2024

### Components/Pages Added:

#### Buyer Components

1. `BuyerFooter.js`
   - Location: `Components/buyer/`
   - Manages the footer section for buyer-related pages.

2. `BuyerHeader.js`
   - Location: `Components/buyer/`
   - Contains the header design and functionality for the buyer's view.

3. `SignInPage.js`
   - Location: `Pages/buyer/`
   - Handles the buyer's sign-in functionality.

4. `SignUpPage.js`
   - Location: `Pages/buyer/`
   - Handles the buyer's sign-up process.

---

### CSS Files Added

5. `common.css`
   - Custom styles for the buyer components: `SignInPage.js`, and `SignUpPage.js`.

6. `buyer.css`
   - Custom styles for the buyer components: `BuyerFooter.js`, `BuyerHeader.js`, `SignInPage.js`, and `SignUpPage.js`.

7. `utils.css`
   - **primaryBtn**: Styles for primary buttons.
   - **inputField**: Styles for input fields.
   - **label**: Styles for form labels.

---

### Utility Components

8. `Dropdown.js`
   - Location: `Components/buyer`
   - Reusable dropdown component for buyer forms.

9. `MultiSelect.js`
   - Location: `Components/buyer`
   - Multi-select input component for buyer selections.

---

### Images

10. `pngs/` and `svgs/` folders
    - Includes necessary PNG and SVG files for use in the buyer components.

---

### Routing

11. `App.js`
    - Routes for the newly created pages (`SignInPage`, `SignUpPage`, etc.) have been added to `App.js`.

---

# Second Increment (Frontend)

**Date:** 05-Oct-2024

### Components/Pages Added:

#### Buyer Pages

1. `Home.js`
   - Location: `Pages/buyer/`
   - Manages the home page layout and content for the buyer's view.

2. `Categories.js`
   - Location: `Pages/buyer/`
   - Displays a list of product categories for buyers to browse through.

3. `Blogs.js`
   - Location: `Pages/buyer/`
   - Displays blog posts related to buyer interests.

4. `Products.js`
   - Location: `Pages/buyer/`
   - Shows a list of available products for buyers.

5. `Deals.js`
   - Location: `Pages/buyer/`
   - Displays ongoing deals and discounts for buyers.

6. `ProductDetail.js`
   - Location: `Pages/buyer/`
   - Provides detailed information about a specific product.

7. `VendorDetail.js`
   - Location: `Pages/buyer/`
   - Displays vendor information and details about the seller.

8. `TradeLeadPage.js`
   - Location: `Pages/buyer/`
   - Handles trade leads and buyer inquiries for specific products.

---

### Components Added in `src/Components/buyer`

9. `ArticleCard.js`
   - Component for displaying individual blog articles on the `Blogs.js` page.

10. `BreadCrumb.js`
    - Navigational component to show the current page's location in a multi-level structure.

11. `CategoryRow.js`
    - Displays product categories in rows on the `Categories.js` page.

12. `ProductCard.js`
    - Displays individual product information on the `Products.js` page.

13. `ReviewDisplay.js`
    - Component to display user reviews for products in `ProductDetail.js`.

14. `VendorCard.js`
    - Displays vendor information in a card format, used in `VendorDetail.js`.

---

### Utility Components Added in `src/Components/utils`

15. `ScrollToTop.js`
    - Utility component to ensure that the page scrolls to the top when a new page is loaded.

16. `SearchBar.js`
    - Search bar component for searching products or blog articles across the buyer's pages.

---

### Contexts Added

17. `LoginContext.js`
    - Location: `src/Contexts/`
    - Manages buyer login and authentication state across pages.

---

# Third Increment (Frontend)

**Date:** 10-Nov-2024

### Buyer Components Added in `src/Components/buyer`

1. `NotificationDrawer.js`
   - Manages notifications and alerts for buyers, accessible from any page.

2. `ProfileDrawer.js`
   - Provides a slide-out drawer with quick access to buyer profile information.

3. `ReviewHistoryContainer.js`
   - Displays the buyer's review history for products they've purchased.

4. `ReviewPopup.js`
   - Pop-up component allowing buyers to leave a review for purchased products.

---

### Seller Components Added in `src/Components/seller`

1. `ActiveOrders.js`
   - Displays the list of active orders on the seller's dashboard.

2. `ImageUpload.js`
   - Provides functionality for sellers to upload product images.

3. `SellerHeader.js`
   - Custom header component for the seller's view, managing navigation and notifications.

4. `VariableModal.js`
   - Pop-up modal allowing sellers to manage product variations, such as size and color.

---

### Buyer Pages Added in `src/Pages/buyer`

1. `BookmarkSellers.js`
   - Displays a list of sellers bookmarked by the buyer for quick access.

2. `ChatPage.js`
   - Messaging page for buyers to communicate with sellers regarding products.

3. `Checkout.js`
   - Manages the buyer's checkout process, including payment and order confirmation.

4. `MyReviewsPage.js`
   - Allows buyers to view and manage all their submitted reviews.

5. `OfferView.js`
   - Displays special offers and deals available to buyers.

6. `OrderDetailPage.js`
   - Provides detailed information about a specific order placed by the buyer.

7. `OrdersPage.js`
   - Shows a list of all orders placed by the buyer.

8. `OrderTrackingPage.js`
   - Allows buyers to track the shipment status of their orders.

9. `ProfilePage.js`
   - Displays and allows editing of buyer profile information.

10. `SettingsPage.js`
   - Manages buyer account settings, such as notifications, privacy, and preferences.

---

### Seller Pages Added in `src/Pages/seller`

1. `BecomeSeller.js`
   - Allows users to register as sellers, including terms and profile setup.

2. `CreateProductPage.js`
   - Provides a form for sellers to create new product listings.

3. `PackagesPage.js`
   - Displays package options for sellers, with details on pricing and features.

4. `SellerDashboard.js`
   - Main dashboard for sellers, displaying key metrics and quick links to other pages.

5. `SellerPostings.js`
   - Lists all products posted by the seller with options for editing or deleting.

6. `SellerTradeLead.js`
   - Manages trade leads for sellers, enabling responses to buyer inquiries.

---

### CSS Files Updated

- Each new page and component has dedicated styles defined in `buyer.css` and `seller.css` to ensure a consistent user interface across buyer and seller views.





# Fourth Increment (Frontend)

**Date:** 29-Nov-2024

### Buyer Components Updated in `src/Components/buyer`

* `ProductDetail.js`  
   - **Improvement:** Added functionality to display variable postings (e.g., size, color, etc.), enhancing user experience.

---

### Contexts Added in `src/Contexts/`

* `CartContext.js`  
   - Manages the buyer's shopping cart state, allowing items to be added, removed, and updated across pages.

* `BookmarkProvider.js`  
   - Handles the state for bookmarked products and sellers, enabling users to quickly access their saved items.

---

### Utility Components Added in `src/Components/utils`

* `emptyContainer.js`  
   - A reusable component to display placeholder content for empty states, such as no items in the cart or no bookmarked products.

* `showToast.js`  
   - Utility to display toast notifications for actions like successful purchases or errors, improving user feedback.

---

### Seller Components Updated in `src/Components/seller`

* `SellerPostings.js`  
   - **Improvement:** Enhanced with better management of product variables and options (e.g., size, stock status).

---

### Buyer Pages Updated in `src/Pages/buyer`

* `OrderTrackingPage.js`  
   - **Improvement:** Added dynamic updates for shipment tracking, including detailed status descriptions.






---

# Fifth Increment

**Date:** 20-Dec-2024

### Overview
-- Backend Setup
-- Fully Functional user registration
-- Fully Functional login process
-- Password Reset Done
-- Signin with Google and Facebook Implemented