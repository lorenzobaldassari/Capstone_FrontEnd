import { useLocation } from "react-router-dom";

const CustomFooter = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/paginaLogin" && (
          <div className="position-fixed bottom-0  text-center w-100 text-white bg-primary py-1 z-index-1000">
            <p className="mb-0">baldassari Lorenzo</p>
            <p className="mb-0">
              <a
                className="text-decoration-none text-white"
                href="https://github.com/lorenzobaldassari"
              >
                https://github.com/lorenzobaldassari
              </a>
            </p>
            <p className="mb-0">
              <a
                className="text-decoration-none text-white"
                href="https://www.linkedin.com/in/lorenzo-baldassari-webdev/"
              >
                https://www.linkedin.com/in/lorenzo-baldassari-webdev/
              </a>
            </p>
          </div>
        )}
    </div>
  );
};

export default CustomFooter;
