import { AvailableRoutes } from "../routes/AvailableRoutes";

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <p>404: Page not found</p>
      <p>
        You are accessing a url that does not exist or are not authorized to
        access this page
      </p>
      <a href={AvailableRoutes.Home}>Go home</a>
    </div>
  );
};

export default NotFoundPage;
