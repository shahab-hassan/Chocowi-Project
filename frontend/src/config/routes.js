// src/config/routes.js
export const routes = {
    home: {
      path: '/',
      breadcrumb: 'Home'
    },
    categories: {
      path: '/categories',
      breadcrumb: 'Categories',
      parent: 'home'
    },
    products: {
      path: '/products',
      breadcrumb: 'Products',
      parent: 'home'
    },
    productDetail: {
      path: '/products/:productId',
      breadcrumb: 'Product Detail',
      parent: 'products'
    },
    deals: {
      path: '/deals',
      breadcrumb: 'Deals',
      parent: 'home'
    },
    vendorDetail: {
      path: '/vendors/:vendorId',
      breadcrumb: 'Vendor Detail',
      parent: 'home'
    },
    blogs: {
      path: '/blogs',
      breadcrumb: 'Blogs',
      parent: 'home'
    }
  };
  
  export const getRouteByPath = (path) => {
    return Object.values(routes).find(route => {
      // Convert route path pattern to regex
      const pattern = route.path.replace(/:\w+/g, '[^/]+');
      return new RegExp(`^${pattern}$`).test(path);
    });
  };