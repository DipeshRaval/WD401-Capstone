import React, { Suspense } from "react";

const VotersDetail = React.lazy(() => import("./VotersDetail"));

import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { VotersDetailProvider } from "../../context/voters/context";

const VotersDetailsContainer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <VotersDetailProvider>
      <ErrorBoundary>
        <Suspense
          fallback={<div className="suspense-loading">{t("loading")}</div>}
        >
          <VotersDetail />
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </VotersDetailProvider>
  );
};

export default VotersDetailsContainer;
