// category/[title]/page.js
"use client";

import React from 'react';

import DataComponent from '../../components/DataComponent';
import CategoryDetail from '@/app/components/CategoryDetail';



const CategoryDetailPage = () => {
  // Your component logic here
  return (
    <div>
      {/* Your JSX here */}
      <h1>Category Detail Page</h1>
      <DataComponent />
      <CategoryDetail />
    </div>
  );
};

export default CategoryDetailPage;
