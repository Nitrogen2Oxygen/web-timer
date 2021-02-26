import { Box, Button } from "@chakra-ui/react";
import Timer from "./Timer";
import { useState, useEffect } from "react";

export default function TimerManager() {
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(false);
    const [notifs, setNotifs] = useState(false);

    useEffect(() => {
        if (time > 0 && timer) {
            // Countdown
            setTimeout(setTime, 1000, time - 1);
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


    return (
        <Box textAlign="center">
            <Timer time={time} />
            <Button onClick={function() {
                if (timer) return;
                setTimer(true)
                setTime(10);
            }}>Test</Button>
            <Button onClick={function() {
                setTimer(false);
                setTime(0);
            }}>Reset</Button>
            <NotificationButton notifs={notifs} />
        </Box>
    )

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