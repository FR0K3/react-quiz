import { useReducer, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Spinner from "./components/Spinner";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import Timer from "./components/Timer";

const SECONDS_PER_QUESTION = 30;

const initialState = {
	questions: [],
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	seconds: null
}

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return {
				...state,
				questions: action.payload,
				status: "ready"
			};

		case "dataFailed":
			return {
				...state,
				status: "error"
			};

		case "start":
			return {
				...state,
				status: "active",
				seconds: state.questions.length * SECONDS_PER_QUESTION
			};

		case "newAnswer":
			return {
				...state,
				answer: action.payload,
				points: action.payload === state.questions[state.index].correctOption ?
					state.points + state.questions[state.index].points : state.points
			};

		case "nextQuestion":
			return {
				...state,
				index: state.index + 1,
				answer: null
			};

		case "finish":
			return {
				...state,
				status: "completed"
			};

		case "restart":
			return {
				...state,
				status: "ready",
				index: 0,
				answer: null,
				points: 0,
				seconds: null
			};

		case "tick":
			return {
				...state,
				seconds: state.seconds - 1,
				status: state.seconds == 0 ? "completed" : state.status
			};

		default:
			throw new Error("Option not found...");
	}
}


function App() {
	const [{ questions, status, index, answer, points, seconds }, dispatch] = useReducer(reducer, initialState);
	const numQuestions = questions.length;
	const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const { data } = await axios.get("http://localhost:8000/questions");

				dispatch({ type: "dataReceived", payload: data });
			} catch (error) {
				dispatch({ type: "dataFailed" });
			}
		}

		fetchQuestions();
	}, [])

	return (
		<div className="app">
			<Header />
			<MainContainer>
				{status === "loading" && (<Spinner />)}
				{status === "error" && (<Error />)}
				{status === "ready" && (
					<StartScreen
						numQuestions={numQuestions}
						dispatch={dispatch}
					/>
				)}
				{status === "active" && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							maxPoints={maxPoints}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<footer>
							<Timer
								dispatch={dispatch}
								seconds={seconds}
							/>
							<NextButton
								dispatch={dispatch}
								answer={answer}
								index={index}
								numQuestions={numQuestions}
							/>
						</footer>
					</>
				)}
				{status === "completed" && (
					<Finish
						points={points}
						maxPoints={maxPoints}
						dispatch={dispatch}
					/>
				)}
			</MainContainer>
		</div>
	)
}

export default App