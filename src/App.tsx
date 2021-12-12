import React, {Suspense} from 'react';
import routeList from '@/routes'
import {useRoutes} from "react-router-dom";
import SuspenseFallback from "@/components/SuspenseFallback";

const App: React.FC = () => {
  const element = useRoutes(routeList)

  return (
    <Suspense fallback={<SuspenseFallback/>}>
      <>
        {element}
      </>
    </Suspense>
  );
};

export default App;
