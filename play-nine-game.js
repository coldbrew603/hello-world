const Stars = (props) => {  
	return(
  	<div className="col-5">
			{_.range(props.numberOfStars).map(i =>
				<i key={1} class="fab fa-apple"></i>
		)}
    </div>
  );
}

const Button = (props) => {
	let button;
  switch(props.answerIsCorrect){
  	case true:
      button = 
        <button className="btn btn-success">
        	<i className="fa fa-check"></i>
        </button>
  		break;
    case false:
      button = 
        <button className="btn btn-danger">
        	<i className="fa fa-times"></i>
        </button>
  		break;
    default:
    	button = 
        <button className="btn"
        		onClick={props.checkAnswer}>
       	 =
        </button>
  		break;
  }
	return(
  	<div className="col-2">
			{button}
    </div>
  );
}

const Answer = (props) => {
	return(
  	<div className="col-5">
    	{props.selectedNumbers.map((number, i) =>
      	<span key={1} onClick={() => props.unselectNumber(number)}>
        	{number}
        </span>
      )}
    </div>
  );
}
const Numbers = (props) => {
	const numberClassName = (number) => {
  	if (props.selectedNumbers.indexOf(number) >= 0){
    	return 'selected';
    }
  }
	return(
  	<div className="card text-center">
    	<div>
				{Numbers.list.map((number, i) =>
        	<span key={i} className={numberClassName(number)}
          	onClick={() => props.selectNumber(number)}>
          {number}
          </span>
        )}
    	</div>
    </div>
  );
};

Numbers.list = _.range(1,10);

class Game extends React.Component {
	state = {
  	selectedNumbers: [],
		randomNumberOfStars: 1  + Math.floor(Math.random()*9),
		answerIsCorrect: null,
  };
	
  selectNumber = (clickedNumber) => {
  	if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

	unselectNumber =  (clickedNumber) => {
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers
      						.filter(number => number !==clickedNumber)
    }))
  }

	checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.randomNumberOfStars ===
      	prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    
    }));
  };

	render() {
  	const { 
    selectedNumbers, 
    randomNumberOfStars, 
    answerIsCorrect,
    } = this.state;
  	return (
    	<div className="container">
      	<h3>Play Nine</h3>
        	<hr />
        	<div className="row">
            <Stars numberOfStars={randomNumberOfStars}/>
            <Button selectedNumbers={selectedNumbers}
            				checkAnswer={this.checkAnswer}
                    answerIsCorrect={answerIsCorrect}/>
            <Answer selectedNumbers={selectedNumbers}
            				unselectNumber={this.unselectNumber}/>
        	</div>
          <br />
          <Numbers selectedNumbers={selectedNumbers}
          				 selectNumber={this.selectNumber} />
      </div>
    );
  }
}


class App extends React.Component {
	render() {
  	return (
    	<div>
      	<Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
