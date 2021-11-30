import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';
import axios from "axios";


function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}


const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    const [number, setNumber] = useState(1); /*회차*/
    const [winnerNumber, setWinnerNumber] = useState([]); /*해당 회차 당첨번호*/
    const [winnerBonus, setWinnerBonus] = useState([]);


    useEffect(() => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return() => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); /*빈 배열이면 componentDidMount와 동일*/


    const handleChange = (e) => {
        const {value} = e.target;
        setNumber(value);
    };


    function getWinnerNumbers(){
        const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${number}`
        axios
            .get(url)
            .then(({data}) => {
                winnerNumber.push(data.drwtNo1);
                winnerNumber.push(data.drwtNo2);
                winnerNumber.push(data.drwtNo3);
                winnerNumber.push(data.drwtNo4);
                winnerNumber.push(data.drwtNo5);
                winnerNumber.push(data.drwtNo6);
                winnerBonus.push(data.bnusNo);
                }
            )
    }
    
    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        setWinnerNumber([]);
        setWinnerBonus([]);
        timeouts.current = [];
    }, [winNumbers]);


    return (
        <>
            <div id = "title">로또 번호 생성기</div>
            <div id = "결과창">
                {winBalls.map((v) => <Ball key = {v} number = {v} />)}
            </div>
            <div id = "bonus">보너스!   
                {bonus && <Ball number={bonus} onClick={onClickRedo} />}
                {redo && <button onClick={onClickRedo}>한 번 더!</button>}  
            </div>
            <div id = "title2">
                <input className = "input" placeholder = {number} onChange = {handleChange}/>회차 당첨 번호
                <button className = "button" onClick = {getWinnerNumbers}>🔍</button>
            </div>
            <div id ="결과창2">
                {winnerNumber.map((v) => <Ball key = {v} number = {v} />)}
            </div>
            <div id = "bonus2">보너스!   
                {winnerBonus.map((v) => <Ball key = {v} number = {v} />)}
            </div>
        </>
    )

}

export default Lotto;