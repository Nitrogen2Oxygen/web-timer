import { Box, Button } from "@chakra-ui/react";
import Timer from "./Timer";
import { useState, useEffect } from "react";

export default function TimerManager() {
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(false)

    useEffect(() => {
        if (time > 0 && timer) {
            // Countdown
            setTimeout(setTime, 1000, time - 1);
        } else if (time > 0 && !timer) {
            // Reset
            setTime(0);
        } else {
            // Alert when timer is done
            setTimer(false);
        }
    }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log(timer)
    }, [timer]);


    return (
        <Box textAlign="center">
            <Timer time={time} />
            <Button onClick={function() {
                if (timer) return;
                setTimer(true)
                setTime(60);
            }}>Test</Button>
            <Button onClick={function() {
                setTimer(false);
                setTime(0);
            }}>Reset</Button>
        </Box>
    )
}