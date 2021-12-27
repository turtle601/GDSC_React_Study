const React = require('react');
const {useState, useRef, useEffect} = React;

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};


const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    console.log('다시 실행');
    interval.current = setInterval(changeHand, 100);
    return () => { // componentWillUnmount 역할
      console.log('종료');
      clearInterval(interval.current);
    }
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult('비겼습니다!');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다!');
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult('졌습니다!');
        setScore((prevScore) => prevScore - 1);
      }
      setTimeout(() => {
        interval.current = setInterval(changeHand, 100);
      }, 1000);
    }
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

module.exports = RSP;


/*
//클래스 버전
const React = require('react');
const { Component } = React;

const rspCords = {
  바위 : '0',
  가위: '-142px',
  보: '-284px',
};
const scores = {
  가위: '1',
  바위: '0',
  보: '-1',
};

const computerChoice=(imgCord)=>{
  return Object.entries(rspCords).find(function(v){
    return v[1] === imgCord;
  })[0];
};
class RSP extends Component {
  state = {
    result: '',
    score: 0,
    imgCord : '0',
  };

  interval;

  changeHand = () => {
    //const {result, score, imgCord} = this.state;
      if(imgCord === rspCords.바위) {
        console.log('zz')
        this.setState({
          imgCord: rspCords.가위,
        });
      } 
      else if(imgCord === rspCords.가위)  {
        console.log('zz')
        this.setState({
          imgCord: rspCords.보,
        });
      }
      else if(imgCord === rspCords.보) {
        console.log('zz')
        this.setState({
          imgCord: rspCords.바위,
        });
      }
  }
  
  //처음 1번만 랜더링이 성공하면 호출됨-> 비동기 요청을 주로함
  componentDidMount() {
    const {result, score, imgCord} = this.state;//=>클로저 문제 야기 
    this.interval = setInterval(this.changeHand, 100);
  }

  //리 랜더링될 때 호출되는 메소드이다.
  componentDidUpdate() {

  }
  //컴포넌트가 제거되기 직전에 호출된다.  -> 비동기 요청 정리를 주로함
  comopnentWillUnmount() {
    clearInterval(this.interval);
  }
  
  onClickBtn = (choice)=> {
    setTimeout(()=>{
      console.log('씨1발');
      console.log('문정훈'+this.state.result)
    },500);
    const {result, score, imgCord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCord)];
    const diff = myScore - cpuScore;
    if(diff==0) {
      this.setState({
        result:'비겼습니다.',
      })
    }
    else if([-1, 2].includes(diff)) {
      this.setState((preState)=> {
        return {
          result:'이겼습니다.',
          score: preState.score + 1,
        };
      });
    }
    else {
      this.setState((preState) => {
        return {
          result:'졌습니다.',
          score: preState.score - 1,
        }
      });
    }
    setTimeout((event)=>{
      this.interval = setInterval(this.changeHand, 100);
    },2000);
  };


  
  render() {
    const { result, score, imgCord } = this.state;
  	return (
    <>
      <div id = "background">
        <div id = "computer" style ={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord} 0` }}></div>
        <div id ="buttonDIV">
          <button id ='rock' className = 'btn' onClick={(event) => this.onClickBtn('바위')}>바위</button>
          <button id ='scissor' className = 'btn' onClick={(event) => this.onClickBtn('가위')}>가위</button>
          <button id ='paper' className = 'btn' onClick={(event)=>this.onClickBtn('보')}>보</button>
        </div>
        <div id ="score">{result} 현재 {score}점</div>
      </div>
      
    </>
    );
  };
}

module.exports = RSP;
*/