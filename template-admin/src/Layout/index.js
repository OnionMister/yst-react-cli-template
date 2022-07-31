import React, { } from 'react';
import {
    Route, Routes, Navigate,
} from 'react-router-dom';
import { flattenRoutes } from 'utils';
import routes from 'routes';

const flattenRouteList = flattenRoutes(routes);

const DefaultLayout = () => {
    return (
        <>
            <Routes>
                {flattenRouteList.map((route, index) => {
                    console.log('route: ', route);
                    if (route.redirect) {
                        return (
                            <Route
                                path="/"
                                key={index}
                                element={
                                    <Navigate
                                        key={index}
                                        from={route.from}
                                        to={route.to}
                                    />
                                }
                            />
                        );
                    }
                    return (
                        <Route
                            {...route}
                            element={<route.element />}
                            key={index}
                        />
                    );
                })}
            </Routes>
        </>
    );
};

export default DefaultLayout;
