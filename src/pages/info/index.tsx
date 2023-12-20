import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AuthGuard from "@/Components/authentication/AuthGuard";
import { useRouter } from "next/router";
import PublicContainer from "@/Components/PublicContainer";
import UserInfo from "../../Components/UserInfo/Profile"
const Index = () => {
  //  hooks
  const router = useRouter();
  const { page } = router.query;
  return (
    <div>
      <CssBaseline />
      <PublicContainer>
        <AuthGuard>{page && <UserInfo page={page} />}</AuthGuard>
      </PublicContainer>
    </div>
  );
};

export default Index;
