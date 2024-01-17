import React from 'react'
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHistory } from "react-router-dom";

export function StatisticsWidget1({ className, color, svgIcon, iconColor, title, description, redirectUrl }) {
    const history = useHistory();
    const clickEvent = () => {
        history.push(redirectUrl);
    }

    return (
        <>
            {/* begin::Body */}
            <div className={`card bg-${color} hoverable ${className}`} style={{ cursor: "pointer" }} onClick={() => clickEvent()}>
                <div className='card-body'>
                    <SVG src={toAbsoluteUrl(svgIcon)} className={`${iconColor} svg-icon-3x ms-n1`} />
                    <div className={`text-inverse-${color} fw-bolder fs-2 mb-2 mt-5`}>{title}</div>
                    <div className={`fw-bold text-inverse-${color} fs-7`}>{description}</div>
                </div>
                {/* end::Body */}
            </div>
        </>
    );
}