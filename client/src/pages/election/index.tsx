import React, { Suspense } from "react";
// const MemberList = React.lazy(() => import("./MemberList"));
// import NewMember from "./NewMember";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useTranslation } from "react-i18next";
import NewElection from "./NewElection";
import ElectionList from "./ElectionList";

const Election = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight">
          {t("Elections")}
        </h2>
        <NewElection />
      </div>
      <ErrorBoundary>
        <Suspense
          fallback={<div className="suspense-loading">{t("loading")}</div>}
        >
          <ElectionList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
export default Election;
