import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export const ReactTimeAgoC = (props) => {
  return (
    <>
      <ReactTimeAgo date={props.date} locale="en-US" />
    </>
  );
};
