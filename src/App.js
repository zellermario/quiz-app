import React from 'react';
import {connect} from 'react-redux';
import Game from './components/Game';
import QuestionManager from './components/QuestionManager';

class App extends React.Component {

    toQM = _ => {
      this.props.dispatch({
        type: "SWITCH_TO_QM"
      })
      this.props.dispatch({
        type: "FINISH_GAME"
      })
    }

    toGame = _ => {
      this.props.dispatch({
        type: "SWITCH_TO_GAME"
      })
    }

    render() {
      if (this.props.screen === "game") {
        return (
          <div>
            <button onClick={this.toQM}>Switch to Question Manager</button>
            <hr></hr>
            <Game/>
          </div>
        )
      }
      else if (this.props.screen === "qm") {
        return (
          <div>
            <button onClick={this.toGame}>Switch to Game</button>
            <hr></hr>
            <QuestionManager/>
          </div>
        )
      }
      else return (<div></div>)
    }
}

const mapStateToProps = state => ({
  screen: state.screen
})

export default connect(mapStateToProps)(App);
