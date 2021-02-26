import { Text } from "@chakra-ui/react";

export default function Timer(props) {
    return (
        <Text fontSize="10vw">{formatTime(props.time)}</Text>
    )
}

function formatTime(time) {
    if (!time) time = 0;
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    seconds = time % 60;
    time = Math.floor(time / 60);
    minutes = time % 60;
    hours = Math.floor(time / 60);
    
    return `${hours > 0 ? (hours > 9 ? hours : "0" + hours) : "00"}:${minutes > 0 ? (minutes > 9 ? minutes : "0" + minutes) : "00"}:${seconds > 0 ? (seconds > 9 ? seconds : "0" + seconds) : "00"}`
}