import PropTypes from 'prop-types'

const StartScreen = ({ numQuestions, dispatch }) => {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numQuestions} questions to test how much you know about React</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >
                Start
            </button>
        </div>
    )
}

StartScreen.propTypes = {
    numQuestions: PropTypes.number,
    dispatch: PropTypes.func
}

export default StartScreen