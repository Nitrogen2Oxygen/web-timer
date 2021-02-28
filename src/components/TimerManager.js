import { Box, Button } from "@chakra-ui/react";
import Timer from "./Timer";
import { useState, useEffect } from "react";

export default function TimerManager() {
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(false);
    const [notifs, setNotifs] = useState(false);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (time > 0 && timer) {
            if (!paused) {
                // Countdown
                setTimeout(setTime, 1000, time - 1);
            }
        } else if (time > 0 && !timer) {
            // Reset
            setTime(0);
        } else {
            // Alert when timer is done
            if (notifs) new Notification("Timer Done");
            setTimer(false);
        }
    }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log(notifs)
    }, [notifs]);

    useEffect(() => {
        setTime(time - 1);
    }, [paused]);  // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Box textAlign="center">
            <Timer time={time} />
            <Box className="controls">
                <PresetButton seconds={1 * 60} name="1 minute" />
                <PresetButton seconds={5 * 60} name="5 minutes" />
                <PresetButton seconds={10 * 60} name="10 minutes" />
                <PresetButton seconds={30 * 60} name="30 minutes" />
                <PresetButton seconds={60 * 60} name="1 hour" />
            </Box>
            <br />
            <Box className="options">
                <Button onClick={function() {
                    setTimer(false);
                    setTime(0);
                }}>
                    Reset
                </Button>
                <PauseContinueButton />
                <NotificationButton notifs={notifs} />
            </Box>
        </Box>
    )

    // Buttons
    function PresetButton(props) {
        return (
            <Button onClick={function() {
                if (timer) return;
                setTimer(true)
                setTime(props.seconds);
            }}>
                {props.name}
            </Button>
        )
    }

    function PauseContinueButton() {
        if  (!timer) return (
            <Button>
                Pause
            </Button>
        )
        if (!paused) {
            return (
            <Button onClick={function() {
                setPaused(true);
            }}>
                Pause
            </Button>
            )
        } else {
            return (
            <Button onClick={function() {
                setPaused(false);
            }}>
                Continue
            </Button>
            )
        }
    }

    function NotificationButton(props) {
        var enabled = props.notifs;
        if (enabled) {
            return (
                <Button onClick={function() {
                    setNotifs(false);
                }}>Disable Notifications</Button>
                )
        } else {
            return (
    <Button onClick={function() {
                    if (!("Notification" in window)) {
                        alert("This browser does not support desktop notifications!");
                    } else if (Notification.permission === "granted") {
                        setNotifs(true);
                    } else {
                        Notification.requestPermission().then((perm) => {
                            if (perm === "granted") {
                                setNotifs(true);
                              } else {
                                  alert("Permission denied. Cannot use notifications...")
                              }
                        })
                    }
                }}>Enable Notifications</Button>
                ) 
        }
    }   
}