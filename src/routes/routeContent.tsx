import { FunctionComponent, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from '.';
import { Spin } from 'antd';

interface RouteContentProps {}

const RouteContent: FunctionComponent<RouteContentProps> = () => {
  const suspenseFallback = (
    <div
      style={{
        width: '100%',
        minWidth: 126,
        height: 'calc(100% - 50px)',
        textAlign: 'center',
        marginTop: 50
      }}
    >
      <Spin size="large" />
    </div>
  );

  return (
    <Routes>
      {routes.map((route: any, key) =>
        route.component ? (
          <Route
            key={key}
            path={route.path}
            element={
              <Suspense fallback={suspenseFallback}>
                <route.component />
              </Suspense>
            }
          />
        ) : (
          <Route
            key={key}
            path={route.path}
            element={<Navigate to={route.redirect + window.location.search} />}
          />
        )
      )}
    </Routes>
  );
};

export default RouteContent;
