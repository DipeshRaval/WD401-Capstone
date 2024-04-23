import React, { Suspense } from "react";

const ElectionDetails = React.lazy(() => import("./index"));

import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { ElectionsDetailProvider } from "../../context/electionData/context";

const ElectionDetailsContainer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ElectionsDetailProvider>
      <ErrorBoundary>
        <Suspense
          fallback={<div className="suspense-loading">{t("loading")}</div>}
        >
          <ElectionDetails />
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </ElectionsDetailProvider>
  );
};

export default ElectionDetailsContainer;
