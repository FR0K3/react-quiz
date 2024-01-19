import PropTypes from 'prop-types'

const Progress = ({ index, numQuestions, points, maxPoints, answer }) => {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p>
                Question <strong>{index}</strong> / {numQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {maxPoints}
            </p>
        </header>
    )
}

Progress.propTypes = {
    index: PropTypes.number,
    numQuestions: PropTypes.number,
    points: PropTypes.number,
    maxPoints: PropTypes.number,
    answer: PropTypes.number
}

export default Progress