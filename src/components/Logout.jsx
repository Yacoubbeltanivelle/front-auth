import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("auth");

      navigate("/connexion");
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
