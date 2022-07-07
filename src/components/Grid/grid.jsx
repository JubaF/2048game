import Tile from "../Tile/tile";
import {useEffect, useState} from "react";

import '../../index.css';

function Grid() {
    const [size, setSize] = useState(4)
    const totalColumns = 'auto '.repeat(size);
    const [isInitialized, setIsInitialized] = useState(false)
    const [tileList, setTileList] = useState([])
    //Get and Set Game Score

    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('pending');

    //Size of Tile
    const [windowSize, setWindowSize] = useState(getWindowSize());

    console.log('size: ' + size);
    console.log('isInitialize: ' + isInitialized);
    // console.log('Value of tileList: ' + tileList);
    console.log('score: ' + score);
    console.log('gameState: ' + gameState);

    const onInputSize = (event) => {
        event.preventDefault();
        if (gameState !== 'on')
            setSize(event.target.value);
    }


    const addTile = (tempList) => {
        let rdNumber = Math.floor((Math.random() * 100) + 1) % 2 === 0 ? 2 : 4;
        let listTileEqual0 = [];
        tempList.forEach((tile, i) => {
            if (tile.value === 0) listTileEqual0.push(i)
        });
        if (tempList.length > 0) {
            const randomIndex = listTileEqual0[Math.floor(Math.random() * listTileEqual0.length)]
            tempList[randomIndex].value = rdNumber;
        } else {
            setGameState('off');
        }
        return tempList;

    };
    // Total Tile to use
    const handleInitialize = ()=>{
        if (!isInitialized) {
            let tempList = [...tileList];
            let totalNumberHigherZero = 0;
            for (let i = 0; i < size * size; i++) {
                let rdNumber = totalNumberHigherZero === size ? 0 : Math.floor((Math.random() * 100) + 1) % 2 === 0 ? 0 : 2;
                if (rdNumber !== 0) {
                    totalNumberHigherZero += 1;
                }
                tempList.push({value: rdNumber})
            }
            setTileList(tempList);
            setIsInitialized(true);
        }
    }

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        document.addEventListener('keydown', handleKey, true,);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const sizeTile = windowSize.innerWidth * 0.4 / size;
    const borderGap = '20px';

    const onNewGame = () => {
        console.log(size);
        setTileList([]);
        setIsInitialized(false);
        setGameState('on');
    }

    //Update Grid

    const handleKey =  (e) => {
        console.log('This is the game state in UpdateGrid ' + gameState);
        if (e.key === 'ArrowUp' && gameState === 'on') {
            console.log('up');
             updateGrid('up');
        } else if (e.key === 'ArrowDown' && gameState === 'on') {
            console.log('down');
             updateGrid('down');
        } else if (e.key === 'ArrowRight' && gameState === 'on') {
            console.log('right');
             updateGrid('right');
        } else if (e.key === 'ArrowLeft' && gameState === 'on') {
            console.log('left');
             updateGrid('left');
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));


    const updateGrid =  (key) => {
        let tempList = [...tileList];
        let newPoints = 0;
        console.log('This is the game state  in updateGrid' + gameState);
        if (key === 'down') {
            for (let i = tileList.length - 1; i >= 0; i--) {
                // console.log(i);
                if (i - size >= 0) {
                    let didTileIncrease = false;
                    for (let j = 1; j < size; j++) {
                        if (i - (size * j) >= 0) {
                            let tempTile = tileList[i - (size * j)];
                            // console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i - size; k > (i - (j * size)); k = k - size) {
                                // console.log('this is k: ' + k);
                                if (tempList[k].value > 0) {
                                    // console.log('false');
                                    canSwap = false;
                                    break;
                                }
                            }

                            console.log('lol');
                            if (tempList[i].value === 0 && tempTile.value > 0 && canSwap) {
                                tempList[i].value += tempTile.value;
                                tempTile.value = 0;
                                //Increase Score ...
                            }
                            // Check if it's same value + has not been swapped already
                            else if (tempList[i].value !== 0 && tempList[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                let pointAdded = tempTile.value
                                console.log('Points Added Down: ' + pointAdded);
                                tempTile.value = 0;
                                didTileIncrease = true;

                            }
                        }
                    }
                }
            }
        } else if (key === 'up') {
            for (let i = 0; i < tempList.length; i++) {
                // console.log(i);
                if (i + size < tempList.length) {
                    let didTileIncrease = false;
                    for (let j = 1; j < size; j++) {
                        if (i + (size * j) < tempList.length) {
                            let tempTile = tileList[i + (size * j)];
                            // console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i + size; k < (i + (j * size)); k = k + size) {
                                // console.log('this is k: ' + k);
                                if (tempList[k].value > 0) {
                                    // console.log('false');
                                    canSwap = false;
                                    break;
                                }
                            }
                            if (tempList[i].value === 0 && tempTile.value > 0 && canSwap) {
                                tempList[i].value += tempTile.value;
                                tempTile.value = 0;
                                //Increase Score ...
                            }
                            // Check if it's same value + has not been swapped already
                            else if (tempList[i].value !== 0 && tempList[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                let pointAdded = tempTile.value
                                // console.log('Can swap? ' + canSwap);
                                console.log('Points Added Up: ' + pointAdded);
                                tempTile.value = 0;
                                didTileIncrease = true;

                            }
                        }
                    }
                }
            }
        } else if (key === 'left') {
            for (let i = 0; i < tempList.length; i++) {
                // console.log(i);
                if ((i + 1) % size !== 0) {
                    let didTileIncrease = false;
                    for (let j = 1; j < size; j++) {
                        //check if next Tile is a border the left
                        if ((i + j) % size !== 0 && (i + j) <= (size * size)) {
                            let tempTile = tileList[i + j];
                            // console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i + 1; k < (i + j); k++) {
                                // console.log('this is k: ' + k);
                                if (tempList[k].value > 0) {
                                    // console.log('false');
                                    canSwap = false;
                                    break;
                                }
                            }
                            if (tempList[i].value === 0 && tempTile.value > 0 && canSwap) {
                                tempList[i].value += tempTile.value;
                                tempTile.value = 0;
                                //Increase Score ...
                            }
                            // Check if it's same value + has not been swapped already
                            else if (tempList[i].value !== 0 && tempList[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                tempTile.value = 0;
                                didTileIncrease = true;

                            }
                        }
                    }
                }
            }
        } else if (key === 'right') {
            console.log('This is the tile list');
            console.log(...tileList);
            for (let i = tileList.length - 1; i >= 0; i--) {
                // console.log(i);
                //Check if it's a border on the left
                if (i % size !== 0) {
                    let didTileIncrease = false;
                    // console.log('i = ' + i);
                    for (let j = 1; j < size; j++) {
                        // console.log('j = ' + j);
                        // Check if tempTile is aborder on the left
                        if ((i - j + 1) % size !== 0 && (i - j) >= 0) {
                            let tempTile = tileList[i - j];
                            // console.log('this is the current Tile value');
                            // console.log(tempTile)
                            // console.log('i = ' + i);
                            // console.log('j = ' + j);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i - 1; k > (i - j); k--) {
                                // console.log('this is k: ' + k);
                                if (tempList[k].value > 0) {
                                    // console.log('false');
                                    canSwap = false;
                                    break;
                                }
                            }
                            if (tempList[i].value === 0 && tempTile.value > 0 && canSwap) {
                                tempList[i].value += tempTile.value;
                                tempTile.value = 0;
                                //Increase Score ...
                            }
                            // Check if it's same value + has not been swapped already
                            else if (tempList[i].value !== 0 && tempList[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                tempList[i - j].value = 0;
                                didTileIncrease = true;

                            }
                            // console.log(tempList);
                        }
                    }
                }
            }
        }
        // setTileList(tempList);
        tempList = addTile(tempList);
        // console.log(tempList);
        // await delay(5000);
        // console.log(score);
        // console.log('End Initital score: ' + score);
        // console.log('End NewPoints score: ' + newPoints);
        let newScore = score + newPoints;
        // console.log('End New score: ' + newScore);
        setScore(newScore);
        // console.log('End Current score: ' + score);
        setTileList(tempList);
    };

    // const helperGrid = (tempList,index)=>{
    //     if (index + size < tempList.length) {
    //         if (tempList[index].value === tempList[index+size].value) {
    //             tempList[index].value = tempList[index].value * 2 + helperGrid(tempList,(index+size));
    //             tempList[index+size].value = 0;
    //             //Increase Score ...
    //         } else if (tempList[index].value === 0) {
    //             tempList[index].value = tempTile.value;
    //             tempTile.value = 0;
    //         }
    //     }else{
    //         return 0;
    //     }
    // }

    // console.log(tileList);
    // console.log(windowSize.innerWidth);
    // console.log("This is your score: " + score);
    // console.log("This is the game State: " + gameState);

    let gridColor = gameState === 'off' ? 'rgba(0,0,0,0.4)' : '#BBAC9F'
    return <>
        {isInitialized?null:handleInitialize()}
        <div className={'containerInput'}><h2>
            Entrez le nombre de case souhaité par lignes/colonnes
        </h2>
            <input className={'inputStyle'} onChange={(event) => {
                onInputSize(event)
            }}/>
        </div>

        <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            margin: '3% 0',
            width: '50%'
        }}>
            <h2>Current Score: {score}</h2>
            <button className={'primary_button'} onClick={() => {
                onNewGame()
            }}> {gameState === 'pending' ? 'Start Game' : 'Start New Game'}</button>
        </div>
        {gameState === 'pending' ? null :
            <div
                style={{
                    display: 'grid',
                    // margin: "30% 30%",
                    backgroundColor: gridColor,
                    gridTemplateColumns: totalColumns,
                    gridTemplateRows: totalColumns,
                    border: borderGap + " solid #BBAC9F",
                    columnGap: borderGap,
                    rowGap: borderGap
                }}>
                {/*<div*/}
                {/*    style={{*/}
                {/*        position:"absolute",*/}
                {/*        top:'0',*/}
                {/*        left:'0',*/}
                {/*        width: '100%',*/}
                {/*        height: '100%',*/}
                {/*        zIndex: '10',*/}
                {/*        backgroundColor: 'orange',*/}
                {/*        boxSizing: 'content-box',*/}
                {/*    }}*/}
                {/*/>*/}
                {gameState === 'on' ? null : <h3 className={'gameOver'}>GAME OVER</h3>}
                {tileList.map((tile, i) => <Tile key={i} size={sizeTile} value={tile.value}/>)
                }
            </div>
        }
    </>;
}

export default Grid;