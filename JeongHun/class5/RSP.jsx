/*
const React = require('react');
const { useState, useRef, useEffect } = React;
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

const RSP = ()=> {
  const [result, setResult] = useState(''); 
  const [imgCord, setImgCord] = useState(rspCords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  useEffect(()=>{ // componentDidMount, componentDidUpdate 역할
     console.log('실행')
     interval.current = setInterval(changeHand, 100);
     return () => { //componentWillummount 역할 
      console.log('종료')
       clearInterval(interval.current);
     }
  }, [imgCord]);

  const changeHand = () => {
    console.log('heelo')
  }

  const onClickBtn = (choice) => {
    console.log(event.target.id);
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCord)];
    const diff = myScore - cpuScore;
    if(diff==0) {
      setResult('비겼습니다.');
    }
    else if([-1, 2].includes(diff)) {
      setResult('이겼습니다.');
      setScore((preScore)=>{
         preScore + 1
      });
    }
    else {
      setResult('졌습니다.');
      setScore((preScore)=>{
         preScore - 1
      });
    }
    setTimeout(()=>{
      interval.current = setInterval(changeHand, 100);
    },2000);
  }

  return (
    <>
      <div id = "computer" style ={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord} 0` }}></div>
      <div>
        <button id ='rock' className = 'btn' onClick={(event) => onClickBtn('바위')}>바위</button>
        <button id ='scissor' className = 'btn' onClick={(event) => onClickBtn('가위')}>가위</button>
        <button id ='paper' className = 'btn' onClick={(event)=> onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>

  );
}
module.exports = RSP;
*/


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
    const {result, score, imgCord} = this.state;
      if(imgCord === rspCords.바위) {
        this.setState({
          imgCord: rspCords.가위,
        });
      } 
      else if(imgCord === rspCords.가위)  {
        this.setState({
          imgCord: rspCords.보,
        });
      }
      else if(imgCord === rspCords.보) {
        this.setState({
          imgCord: rspCords.바위,
        });
      }
  }
  //처음 1번만 랜더링이 성공하면 호출됨-> 비동기 요청을 주로함
  componentDidMount() {
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
