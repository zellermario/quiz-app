import React from "react";
import { connect } from "react-redux";

class Game extends React.Component {

    startGame = (event) => {
        event.preventDefault();
        if (!this.props.playerName || !(this.props.questions.length > 0)) 
            return;
        this.props.dispatch({
            type: "START_GAME",
        });
    }

    nameChanged = (event) => {
        this.props.dispatch({
            type: "UPDATE_NAME",
            newName: event.target.value
        })
    }

    changeAnswer = (event) => {
        this.props.dispatch({
            type: "CHANGE_ANSWER",
            selected: event.target.value
        })
    }

    submitAnswer = (event) => {
        event.preventDefault();
        if (this.props.playedQuestion.correct === this.props.selectedAnswer) {
            this.props.dispatch({
                type: "CORRECT_ANSWER"
            })
        }
        else {
            this.props.dispatch({
                type: "INCORRECT_ANSWER"
            })
        }
    }

    nextQuestion = _ => {
        this.props.dispatch({
            type: "NEXT_QUESTION"
        })
    }

    finishGame = _ => {
        this.props.dispatch({
            type: "FINISH_GAME"
        })
    }

    render() {
        return (
            <div>
                <h1>Game</h1>
                { !this.props.gameStarted &&
                    <form onSubmit={this.startGame}>
                        <input required placeholder="enter player name..." value={this.props.playerName} onChange={this.nameChanged}/>
                        <input type="submit" value="Start"/>
                    </form>
                }
                { this.props.gameStarted &&
                    <div>
                        <span><strong>Player: {this.props.playerName}</strong></span><br/>
                        <span><strong>Score: {this.props.score}</strong></span><br/><br/>
                        {this.props.noMoreQuestions ? 
                        <div>
                            <span>No more questions.</span><br/><br/>
                            <button onClick={this.finishGame}>Finish game</button>
                        </div> :
                        <form onSubmit={this.submitAnswer}>
                            <span style={{fontSize: "20px"}}><strong>{this.props.playedQuestion.question}</strong></span><br/>
                            <input type="radio" id="ans1" name="answer" value="1" checked={this.props.selectedAnswer === "1"} onChange={this.changeAnswer}/>
                            <label htmlFor="ans1">{this.props.playedQuestion.ans1}</label><br/>
                            <input type="radio" id="ans2" name="answer" value="2" checked={this.props.selectedAnswer === "2"} onChange={this.changeAnswer}/>
                            <label htmlFor="ans2">{this.props.playedQuestion.ans2}</label><br/>
                            <input type="radio" id="ans3" name="answer" value="3" checked={this.props.selectedAnswer === "3"} onChange={this.changeAnswer}/>
                            <label htmlFor="ans3">{this.props.playedQuestion.ans3}</label><br/>
                            <input type="radio" id="ans4" name="answer" value="4" checked={this.props.selectedAnswer === "4"} onChange={this.changeAnswer}/>
                            <label htmlFor="ans4">{this.props.playedQuestion.ans4}</label><br/><br/>
                            { this.props.showCorrect ? <div><span style={{color: "green"}}>Correct answer.</span><br/><br/></div> : null }
                            { this.props.showIncorrect ? <div><span style={{color: "red"}}>Incorrect answer.</span><br/><br/></div> : null }
                            { this.props.showNext ? <button onClick={this.nextQuestion}>Next question</button> : <input type="submit" value="Check"/> }
                        </form>}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    noMoreQuestions: state.noMoreQuestions,
    selectedAnswer: state.selectedAnswer,
    playedQuestion: state.playedQuestion,
    gameStarted: state.gameStarted,
    playerName: state.playerName,
    questions: state.questions,
    showNext: state.showNext,
    showIncorrect: state.showIncorrect,
    showCorrect: state.showCorrect,
    score: state.score,
})

export default connect(mapStateToProps)(Game);