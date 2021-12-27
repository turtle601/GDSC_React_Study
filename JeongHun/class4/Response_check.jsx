// hooks 버전
const React = require('react');
const { useState } = React;

const Response_check = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  const timeout = React.useRef(null);
  const startTime = React.useRef(null);
  const endTime = React.useRef(null);

  const onClickScreen = () => {
    if(state === 'waiting') {
       setState('ready');
       setMessage('초록색이 되면 클릭하세요.');

        timeout.current = setTimeout(()=> {
          setState('now');
          setMessage('지금 클릭');

          startTime.current = new Date(); //시작시각
        }, Math.floor(Math.random() *1000)+2000); //2~3초 랜덤
    }
    else if(state == 'ready') {
      clearTimeout(timeout.current); //setTimout 메소드 초기화

      setState('waiting');
      setMessage('성급하시군요! 초록색이 된 후에 클릭하세요.');
    }

    else if(state == 'now') {
      endTime.current = new Date(); //끝시각
      setState('waiting');
      setMessage('클랙해서 시작하세요.'); 
      setResult((prevResult)=>{
          return [...prevResult, endTime.current  - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  return (
    <>
      <div id = "screen" className = {state} onClick = {onClickScreen}>
        {message}
      </div>
      {/* 삼항 연산자를 이용해 배열에 값이 들어있지 않으면 null로 표기하는데 jsx에서는 태그가 없음을 null로도 표기함.
      배열의 길이가 있다면 배열의 모든 요소를 다 더해 길이로 나누어 평균을 구한다.  */}
      {result.length === 0 ? null :<><div>평균 시간 : {result.reduce((a, c)=> a + c) / result.length} ms</div> <button onClick = {onReset}>리셋</button></>}
    </> 
  );

} 

module.exports = Response_check;


 //클래스 버전 
const React = require('react');
const { Component } = React;

class Response_check extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요. ',
    result: [],
  }

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
      const { state, message, result } = this.state;
      if(state === 'waiting') {
         this.setState( {
           state:'ready',
           message: '초록색이 되면 클릭하세요',
         });
          this.timeout = setTimeout(()=> {
            this.setState({
              state: 'now',
              message: '지금 클릭',
            });
            this.startTime = new Date(); //시작시각
          }, Math.floor(Math.random() *1000)+2000); //2~3초 랜덤
      }
      else if(state == 'ready') {
        clearTimeout(this.timeout); //setTimout 메소드 초기화
        this.setState({
          state: 'waiting',
          message: '성급하시군요! 초록색이 된 후에 클릭하세요.',
          result:[],
        });
      }

      else if(state == 'now') {
        this.endTime = new Date(); //끝시각
        this.setState((prevState)=>{
          return {
            state: 'waiting',
            message:'클릭해서 시작하세요',
            result: [...prevState.result, this.endTime  - this.startTime],
          };
        });
      }
  };

  onReset = () => {
    this.setState({
    result: [],
    })
  }
  //삼항 연산자를 이용해 배열에 값이 들어있지 않으면 null로 표기하는데 jsx에서는 태그가 없음을 null로도 표기함.
  //배열의 길이가 있다면 배열의 모든 요소를 다 더해 길이로 나누어 평균을 구한다.
  render() {
      return (
        <>
          <div id = "screen" className = {this.state.state} onClick = {this.onClickScreen}>
            {this.state.message}
          </div>
          {this.state.result.length === 0 ? null :<><div>평균 시간 : {this.state.result.reduce((a, c)=> a + c) / this.state.result.length} ms</div> <button onClick = {this.onReset}>리셋</button></>}
        </> 
      );
  }
}

module.exports = Response_check;
