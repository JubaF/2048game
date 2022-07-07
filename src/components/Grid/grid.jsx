import Tile from "../Tile/tile";
import {useState} from "react";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import keyboard from '../../keyboard.png'; // with import
import '../../index.css';

function Grid() {
    const [size, setSize] = useState(4)
    const [inputSize, setInputSize] = useState(4)
    // const totalColumns = 'auto '.repeat(size);
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
        setInputSize(parseInt(event.target.value))
        if (gameState !== 'on')
            setSize(parseInt(event.target.value)
            );
    }


    const addTile = (tempList) => {
        let rdNumber = Math.floor((Math.random() * 100) + 1) % 2 === 0 ? 2 : 4;
        let listTileEqual0 = [];
        tempList.forEach((tile, i) => {
            if (tile.value === 0) listTileEqual0.push(i)
        });
        if (tempList.length > 0 && listTileEqual0.length !== 0) {
            const randomIndex = listTileEqual0[Math.floor(Math.random() * listTileEqual0.length)]
            tempList[randomIndex].value = rdNumber;
        }
        return tempList;

    };
    // Total Tile to use
    const handleInitialize = () => {
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

    // const sizeTile = windowSize.innerWidth * 0.4 / size;
    const borderGap = '20px';

    const onNewGame = () => {
        console.log(size);
        setTileList([]);
        setSize(inputSize);
        setIsInitialized(false);
        setGameState('on');
        setScore(0);
        // this.buttonDOM.blur();
    }

    //Update Grid

    const handleKey = (e) => {
        console.log('This is the game state in UpdateGrid ' + gameState);
        console.log(e.key);
        // console.log("number of movement possible up "+ checkIfGameOver('up',[...tileList]));
        // console.log("number of movement possible down "+ checkIfGameOver('down',[...tileList]));
        // console.log("number of movement possible left "+ checkIfGameOver('left',[...tileList]));
        // console.log("number of movement possible right "+ checkIfGameOver('right',[...tileList]));
        // if (checkIfGameOver('up',[...tileList]) === 0 && checkIfGameOver('down',[...tileList]) === 0 && checkIfGameOver('left',[...tileList]) === 0 && checkIfGameOver('right',[...tileList]) === 0) {
        //     setGameState('off');
        // }
        if (e.key === 'w') {
            console.log('up');
            updateGrid('up');
        } else if (e.key === 's') {
            console.log('down');
            updateGrid('down');
        } else if (e.key === 'd') {
            console.log('right');
            updateGrid('right');
        } else if (e.key === 'a' && gameState === 'on') {
            console.log('left');
            updateGrid('left');
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));


    const updateGrid = (key) => {
        let tempList = [...tileList];
        console.log("This si the temp list: " + tempList);
        let newPoints = 0;
        console.log('This is the game state  in updateGrid' + gameState);
        // let totalSwap = 0;

        if (key === 'down') {
            for (let i = tempList.length - 1; i >= 0; i--) {
                // console.log(i);
                if (i - size >= 0) {
                    let didTileIncrease = false;
                    for (let j = 1; j < size; j++) {
                        if (i - (size * j) >= 0) {
                            let tempTile = tempList[i - (size * j)];
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
                                // totalSwap += 1;
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
                            let tempTile = tempList[i + (size * j)];
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
                                // totalSwap += 1;
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
                            let tempTile = tempList[i + j];
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
                                // totalSwap += 1;
                                didTileIncrease = true;

                            }
                        }
                    }
                }
            }
        } else if (key === 'right') {
            // console.log('This is the tile list');
            // console.log(...tileList);
            for (let i = tempList.length - 1; i >= 0; i--) {
                // console.log(i);
                //Check if it's a border on the left
                if (i % size !== 0) {
                    let didTileIncrease = false;
                    // console.log('i = ' + i);
                    for (let j = 1; j < size; j++) {
                        // console.log('j = ' + j);
                        // Check if tempTile is aborder on the left
                        if ((i - j + 1) % size !== 0 && (i - j) >= 0) {
                            let tempTile = tempList[i - j];
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
                                // totalSwap += 1;
                                didTileIncrease = true;

                            }
                            // console.log(tempList);
                        }
                    }
                }
            }
        }
        tempList = addTile(tempList);
        setScore(prevScore => prevScore + newPoints);
        setTileList(tempList);
        // if (checkIfGameOver('up',tempList2) === 0 && checkIfGameOver('down',tempList2) === 0 && checkIfGameOver('left',tempList2) === 0 && checkIfGameOver('right',tempList2) === 0) {
        //     setGameState('off');
        // }
    };

    const checkIfGameOver = (key, listOfTile) => {
        let tempList3 = [...listOfTile];
        let totalSwap = 0;
        console.log("This si the temp list: " + tempList3);
        let newPoints = 0;
        console.log('This is the game state  in updateGrid' + gameState);
        // let totalSwap = 0;

        if (key === 'down') {
            for (let i = tempList3.length - 1; i >= 0; i--) {
                // console.log(i);
                if (i - size >= 0) {
                    let didTileIncrease = false;
                    for (let j = 1; j < size; j++) {
                        if (i - (size * j) >= 0) {
                            let tempTile = tempList3[i - (size * j)];
                            // console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i - size; k > (i - (j * size)); k = k - size) {
                                // console.log('this is k: ' + k);
                                if (tempList3[k].value > 0) {
                                    // console.log('false');
                                    canSwap = false;
                                    break;
                                }
                            }

                            console.log('lol');
                            if (tempList3[i].value === 0 && tempTile.value > 0 && canSwap) {
                                tempList3[i].value += tempTile.value;
                                tempTile.value = 0;
                                totalSwap += 1;
                                //Increase Score ...
                            }
                            // Check if it's same value + has not been swapped already
                            else if (tempList3[i].value !== 0 && tempList3[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList3[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                let pointAdded = tempTile.value
                                console.log('Points Added Down: ' + pointAdded);
                                tempTile.value = 0;
                                totalSwap += 1;
                                didTileIncrease = true;

                            }
                        }
                    }
                }
            }
        } else if (key === 'up') {
            for (let i = 0; i < tempList3.length; i++) {
                // console.log(i);
                if (i + size < tempList3.length) {
                    let didTileIncrease = false;
                    for (let j = 1; j < size; j++) {
                        if (i + (size * j) < tempList3.length) {
                            let tempTile = tempList3[i + (size * j)];
                            // console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i + size; k < (i + (j * size)); k = k + size) {
                                // console.log('this is k: ' + k);
                                if (tempList3[k].value > 0) {
                                    // console.log('false');
                                    canSwap = false;
                                    break;
                                }
                            }
                            if (tempList3[i].value === 0 && tempTile.value > 0 && canSwap) {
                                tempList3[i].value += tempTile.value;
                                tempTile.value = 0;
                                totalSwap += 1;
                                //Increase Score ...
                            }
                            // Check if it's same value + has not been swapped already
                            else if (tempList3[i].value !== 0 && tempList3[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList3[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                let pointAdded = tempTile.value
                                // console.log('Can swap? ' + canSwap);
                                console.log('Points Added Up: ' + pointAdded);
                                tempTile.value = 0;
                                totalSwap += 1;
                                didTileIncrease = true;

                            }
                        }
                    }
                }
            }
        } else if (key === 'left') {
            for (let i = 0; i < tempList3.length; i++) {
                // console.log(i);
                if ((i + 1) % size !== 0) {
                    let didTileIncrease = false;
                    for (let j = 1; j < size; j++) {
                        //check if next Tile is a border the left
                        if ((i + j) % size !== 0 && (i + j) <= (size * size)) {
                            let tempTile = tempList3[i + j];
                            // console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i + 1; k < (i + j); k++) {
                                // console.log('this is k: ' + k);
                                if (tempList3[k].value > 0) {
                                    // console.log('false');
                                    canSwap = false;
                                    break;
                                }
                            }
                            if (tempList3[i].value === 0 && tempTile.value > 0 && canSwap) {
                                tempList3[i].value += tempTile.value;
                                tempTile.value = 0;
                                totalSwap += 1;
                                //Increase Score ...
                            }
                            // Check if it's same value + has not been swapped already
                            else if (tempList3[i].value !== 0 && tempList3[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList3[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                tempTile.value = 0;
                                totalSwap += 1;
                                didTileIncrease = true;

                            }
                        }
                    }
                }
            }
        } else if (key === 'right') {
            // console.log('This is the tile list');
            // console.log(...tileList);
            for (let i = tempList3.length - 1; i >= 0; i--) {
                // console.log(i);
                //Check if it's a border on the left
                if (i % size !== 0) {
                    let didTileIncrease = false;
                    // console.log('i = ' + i);
                    for (let j = 1; j < size; j++) {
                        // console.log('j = ' + j);
                        // Check if tempTile is aborder on the left
                        if ((i - j + 1) % size !== 0 && (i - j) >= 0) {
                            let tempTile = tempList3[i - j];
                            // console.log('this is the current Tile value');
                            // console.log(tempTile)
                            // console.log('i = ' + i);
                            // console.log('j = ' + j);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i - 1; k > (i - j); k--) {
                                // console.log('this is k: ' + k);
                                if (tempList3[k].value > 0) {
                                    // console.log('false');
                                    canSwap = false;
                                    break;
                                }
                            }
                            if (tempList3[i].value === 0 && tempTile.value > 0 && canSwap) {
                                tempList3[i].value += tempTile.value;
                                tempTile.value = 0;
                                totalSwap += 1;
                                //Increase Score ...
                            }
                            // Check if it's same value + has not been swapped already
                            else if (tempList3[i].value !== 0 && tempList3[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList3[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                tempList3[i - j].value = 0;
                                totalSwap += 1;
                                didTileIncrease = true;

                            }
                            // console.log(tempList);
                        }
                    }
                }
            }
        }
        return totalSwap;
    };


    let gridColor = gameState === 'off' ? 'rgba(0,0,0,0.4)' : '#BBAC9F'
    return <>
        {isInitialized ? null : handleInitialize()}
        <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: "center",
            width: '50%'
        }}>
            <h2 style={{
                color: "deepskyblue",

            }
            }>
                Pour jouer au jeu, utiliser les touches <br/> (W, A, S, D)
            </h2>
            <img style={{

                width: "20%"
            }
            } src={keyboard} alt={'wasd'}/>
        </div>
        <div className={'containerInput'}><h2>
            Entrez le nombre de cases souhaitées par ligne (Défaut 4)
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
            <h2>Points Actuelles: {score}</h2>
            <button className={'primary_button'} onClick={(e) => {
                e.currentTarget.blur()
                onNewGame()
            }}> {gameState === 'pending' ? 'Jouer' : 'Nouvelle partie'}</button>
        </div>
        {gameState === 'pending' ? null :
            <div
                style={{
                    display: 'grid',
                    // margin: "30% 30%",
                    backgroundColor: gridColor,
                    gridTemplateColumns: 'auto '.repeat(size),
                    gridTemplateRows: 'auto '.repeat(size),
                    border: borderGap + " solid #BBAC9F",
                    columnGap: borderGap,
                    rowGap: borderGap
                }}>
                {gameState === 'on' ? null : <h3 className={'Jeux Terminé'}>GAME OVER</h3>}
                {tileList.map((tile, i) => <Tile key={i} size={windowSize.innerWidth * 0.4 / size} value={tile.value}/>)
                }
                <KeyboardEventHandler
                    handleKeys={["w", 'a', 's', 'd']}
                    onKeyEvent={(key, e) => handleKey(e)}/>
            </div>
        }
    </>;
}

export default Grid;