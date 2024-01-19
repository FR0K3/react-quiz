import PropTypes from 'prop-types'

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
    if (answer === null) return null;

    if (index < numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}
            >
                Next
            </button>
        )

    if (index == numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "finish" })}
            >
                Next
            </button>
        )
}

NextButton.propTypes = {
    dispatch: PropTypes.func,
    answer: PropTypes.number,
    index: PropTypes.number,
    numQuestions: PropTypes.number
}

export default NextButton