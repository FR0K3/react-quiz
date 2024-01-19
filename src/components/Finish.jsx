import PropTypes from 'prop-types'
import ConfettiExplosion from 'react-confetti-explosion';

const Finish = ({ points, maxPoints, dispatch }) => {
    const percentage = (points / maxPoints) * 100;

    return (
        <>
            {percentage > 70 && (
                <div className="confetti">
                    <ConfettiExplosion width={1600} />
                </div>
            )}
            <p className="result">
                Your score is <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
            </p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>Restart</button>
        </>
    )
}

Finish.propTypes = {
    points: PropTypes.number,
    maxPoints: PropTypes.number,
    dispatch: PropTypes.func
}

export default Finish