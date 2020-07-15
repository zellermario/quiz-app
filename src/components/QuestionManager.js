import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";

class QuestionManager extends React.Component {

    handleChange = (event) => {
        this.props.dispatch({
            type: "EDIT_QUESTION",
            editedQuestion: {
                ...this.props.edited,
                [event.target.name]: event.target.value
            }
        })
    }

    addQuestion = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: "ADD_QUESTION",
            newQuestion: {
                ...this.props.edited,
                id: shortid.generate()
            }
        })
    }

    deleteQuestion = (event) => {
        this.props.dispatch({
            type: "DELETE_QUESTION",
            id: event.target.id
        })
    }

    render() {
        return(
            <div>
                <h1>Question Manager</h1>
                {this.props.questions.map((item) => (
                    <div key={item.id}>
                        <span><strong>{item.question}</strong></span>
                        <button id={item.id} style={{marginLeft: "5px"}} onClick={this.deleteQuestion}>Delete question</button><br/>
                        <span>A: {item.ans1}</span><br/>
                        <span>B: {item.ans2}</span><br/>
                        <span>C: {item.ans3}</span><br/>
                        <span>D: {item.ans4}</span><br/><br/>
                    </div>
                ))}
                <h2>Add new question</h2>
                <form onSubmit={this.addQuestion}>
                    <input required placeholder="Question" name="question" onChange={this.handleChange} value={this.props.edited.question}/><br/>
                    <input required type="radio" id="ans1" name="correct" value="1" checked={this.props.edited.correct === "1"} onChange={this.handleChange}/>
                    <input required placeholder="Answer A" name="ans1" onChange={this.handleChange} value={this.props.edited.ans1}/><br/>
                    <input required type="radio" id="ans2" name="correct" value="2" checked={this.props.edited.correct === "2"} onChange={this.handleChange}/>
                    <input required placeholder="Answer B" name="ans2" onChange={this.handleChange} value={this.props.edited.ans2}/><br/>
                    <input required type="radio" id="ans3" name="correct" value="3" checked={this.props.edited.correct === "3"} onChange={this.handleChange}/>
                    <input required placeholder="Answer C" name="ans3" onChange={this.handleChange} value={this.props.edited.ans3}/><br/>
                    <input required type="radio" id="ans4" name="correct" value="4" checked={this.props.edited.correct === "4"} onChange={this.handleChange}/>
                    <input required placeholder="Answer D" name="ans4" onChange={this.handleChange} value={this.props.edited.ans4}/><br/><br/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    edited: state.editedQuestion,
    questions: state.questions
})

export default connect(mapStateToProps)(QuestionManager);