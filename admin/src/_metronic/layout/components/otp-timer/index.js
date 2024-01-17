import React, { useEffect, useState } from 'react';

export const OtpTimer = (props) => {

    const {
        seconds,
        onResend
    } = props;

    const [timerSeconds, setTimerSeconds] = useState(seconds || 60);

    useEffect(() => {
        if (timerSeconds > 0) {
            setTimeout(() => setTimerSeconds(timerSeconds - 1), 1000);
        }
    }, [timerSeconds]);

    const onBtnClick = () => {
        setTimerSeconds(seconds || 60);
        typeof onResend === "function" && onResend();
    }

    return (
        <p className="fn_s_16 color_blk f-w-400 mt-2 mb-10">
            <span className="opacity50">
                Didn't received code? &nbsp;
                  </span>
            <button disabled={timerSeconds} className="fn_s_16 color_blue f-w-400 btn-link" onClick={onBtnClick} >
                Resend Code {
                    timerSeconds ? (
                        "(" + (timerSeconds < 10 ? "0" : "") + timerSeconds + ")"
                    ) : null
                }
            </button>
        </p>
    )
}