import React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';  
import OrderListAll from './OrderListAll';

function Index() {

  const userRole = localStorage.getItem("USER_ROLE");
 
  return (
      <React.Fragment> 
        <AppAppBar />
        {
          userRole === "seller" ?
          <OrderListAll />
          :
          <>
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductHowItWorks />
            <ProductCTA />
            <ProductSmokingHero />
          </>
        }
    </React.Fragment> 
  );
}

export default withRoot(Index);
