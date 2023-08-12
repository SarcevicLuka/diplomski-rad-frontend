import { Route, Routes as DomRoutes } from "react-router-dom";
import RouteConfiguration from "./RoutesConfiguration";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Token, isLoggedIn } from "../provider/authUtils";
import { RouteVisibility } from "./RouteVisibility";

const Routes = () => {
  const { token } = useContext(AuthContext);

  const canShowRoute = (token: Token, visibility: RouteVisibility): boolean => {
    let routeVisibile = false;

    switch (visibility) {
      case RouteVisibility.Everyone:
        routeVisibile = true;
        break;
      case RouteVisibility.LoggedIn:
        if (isLoggedIn(token)) routeVisibile = true;
        break;
      default:
        break;
    }

    return routeVisibile;
  };

  return (
    <DomRoutes>
      {RouteConfiguration.map((route) => {
        if (canShowRoute(token, route.visibility))
          return (
            <Route
              element={<route.component />}
              key={route.path}
              path={route.path}
            />
          );
        else return null;
      })}
    </DomRoutes>
  );
};

export default Routes;
