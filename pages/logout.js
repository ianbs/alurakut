import nookies from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MainGrid from "../src/components/MainGrid";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    nookies.destroy(null, "USER_TOKEN");
    router.push({
      pathname: "/login",
    });
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <MainGrid>
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        Redirecionando...
      </div>
    </MainGrid>
  );
}
