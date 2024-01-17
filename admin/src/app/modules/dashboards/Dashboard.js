import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_metronic/layout";
import { StatisticsWidget } from "./statisticsWidget";

export function Dashboard() {
  const appName = process.env.REACT_APP_NAME;
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      demo: objectPath.get(uiService.config, "demo"),
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.demo === appName}
      <StatisticsWidget />
    </>
  );
}
