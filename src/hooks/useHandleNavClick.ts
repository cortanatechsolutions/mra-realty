import { useLocation, useNavigate } from "react-router-dom";

export const useHandleNavClick = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (href: string) => {
    const targetId = href.startsWith("#") ? href.substring(1) : null;

    if (location.pathname !== "/" && targetId) {
      navigate(`/${href}`);
    } else if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };
};
