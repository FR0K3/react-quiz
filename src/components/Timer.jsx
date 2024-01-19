import { useEffect } from "react"
import PropTypes from 'prop-types'

const Timer = ({ dispatch, seconds }) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    useEffect(() => {
        const idInterval = setInterval(() => {
            dispatch({ type: "tick" })
        }, 1000);

        return () => clearInterval(idInterval);
    }, [dispatch])

    return (
        <div className="timer">{minutes < 10 && "0"}{minutes}:{secs < 10 && "0"}{secs}</div>
    )
}

Timer.propTypes = {
    dispatch: PropTypes.func,
    seconds: PropTypes.any
}

export default Timer