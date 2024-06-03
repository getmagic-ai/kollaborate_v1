"use client";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "AW-984235993",
  dataLayerName: "AW-984235993",
};

function GoogleTagManager() {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return <></>;
}

export default GoogleTagManager;
