import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routeNameMap = {
  '/': 'Home',
  '/categories': 'Categories',
  '/products': 'Products',
  '/deals': 'Deals',
  '/productDetail': 'Product Detail',
  '/vendorDetail': 'Vendor Detail',
  '/blogs': 'Blogs',
};

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  if (pathnames.length === 0) return null;

  return (
    <div className="breadcrumb">
      <Link to="/"><p>Home</p></Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        const routeName = routeNameMap[`/${name}`] || routeNameMap[routeTo] || name;

        return isLast ? (
          <p key={routeTo}> / {routeName}</p>
        ) : (
          <p key={routeTo}>
            {' '} / <Link to={routeTo}>{routeName}</Link>
          </p>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
