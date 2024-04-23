import React, { Suspense } from "react";

const OptionsDetail = React.lazy(() => import("./OptionsDetail"));

import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { OptionsDetailProvider } from "../../context/option/context";

const OptionDetailsContainer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <OptionsDetailProvider>
      <ErrorBoundary>
        <Suspense
          fallback={<div className="suspense-loading">{t("loading")}</div>}
        >
          <OptionsDetail />
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </OptionsDetailProvider>
  );
};

export default OptionDetailsContainer;
