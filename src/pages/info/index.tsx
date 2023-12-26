import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AuthGuard from "@/Components/authentication/AuthGuard";
import { useRouter } from "next/router";
import PublicContainer from "@/Components/PublicContainer";
import UserInfo from "../../Components/UserInfo/Profile";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
const Index = () => {
  //  hooks
  const router = useRouter();
  const { locale } = useRouter();
  const { page }: any = router.query;

  
  const [languagedirection, setLanguagedirection] = useState<string>("ltr");
  useEffect(() => {
    locale === "en" ? setLanguagedirection("ltr") : setLanguagedirection("rtl");
  }, [locale]);


  return (
    <RTL direction={languagedirection}>
      <CssBaseline />
      <PublicContainer>
        <AuthGuard>{page && <UserInfo page={page} />}</AuthGuard>
      </PublicContainer>
    </RTL>
  );
};

export default Index;
