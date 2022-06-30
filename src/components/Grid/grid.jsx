import Tile from "../Tile/tile";
import {useEffect, useState} from "react";

function Grid(props) {
    const size = props.size
    let totalColumns = 'auto '.repeat(size);
    let [isInitialized, setIsInitialized] = useState(false)
    let [tileList, setTileList] = useState([])
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
    //Size of Tile
    const [windowSize, setWindowSize] = useState(getWindowSize());

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        document.addEventListener('keydown', handleKey, true);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const sizeTile = windowSize.innerWidth * 0.4 / size;
    const borderGap = '20px';

    //Get and Set Game Score

    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('on');

    // const updateScore = (newPoints) => {
    //     console.log("This is the newPoints :" + newPoints);
    //     let newScore = score + newPoints;
    //     setScore(newScore);
    //
    // };

    //Update Grid

    const handleKey = async (e) => {
        if (e.key === 'ArrowUp') {
            console.log('up');
            await updateGrid('up');
        } else if (e.key === 'ArrowDown') {
            console.log('down');
            await updateGrid('down');
        } else if (e.key === 'ArrowRight') {
            console.log('right');
            await updateGrid('right');
        } else if (e.key === 'ArrowLeft') {
            console.log('left');
            await updateGrid('left');
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    // const updateGrid = async (key) => {
    //     let tempList = [...tileList];
    //     if (key === 'up') {
    //         for (let i = tileList.length - 1; i >= 0; i--) {
    //             // console.log(i);
    //             if (i - size >= 0) {
    //                 let tempTile = tileList[i - size];
    //                 console.log(tempTile);
    //                 if (tempList[i].value === tempTile.value) {
    //                     tempList[i].value = 0;
    //                     tempTile.value = tempTile.value * 2;
    //                     //Increase Score ...
    //                 } else if (tempTile.value === 0) {
    //                     tempTile.value = tempList[i].value;
    //                     tempList[i].value = 0;
    //                 }
    //             }
    //         }
    //     } else if (key === 'down') {
    //         for (let i = 0; i < tempList.length; i++) {
    //             // console.log(i);
    //             if (i + size < tempList.length) {
    //                 let tempTile = tileList[i + size];
    //                 console.log(tempTile);
    //                 if (tempList[i].value === tempTile.value) {
    //                     tempList[i].value = 0;
    //                     tempTile.value = tempTile.value * 2;
    //                     //Increase Score ...
    //                 } else if (tempTile.value === 0) {
    //                     tempTile.value = tempList[i].value;
    //                     tempList[i].value = 0;
    //                 }
    //             }
    //         }
    //     } else if (key === 'right') {
    //         for (let i = 0; i < tempList.length; i++) {
    //             // console.log(i);
    //             if ((i + 1) % size !== 0) {
    //                 let tempTile = tileList[i + 1];
    //                 console.log(tempTile);
    //                 if (tempList[i].value === tempTile.value) {
    //                     tempList[i].value = 0;
    //                     tempTile.value = tempTile.value * 2;
    //                     //Increase Score ...
    //                 } else if (tempTile.value === 0) {
    //                     tempTile.value = tempList[i].value;
    //                     tempList[i].value = 0;
    //                 }
    //             }
    //         }
    //     } else if (key === 'left') {
    //         for (let i = tileList.length - 1; i >= 0; i--) {
    //             // console.log(i);
    //             if (i % size !== 0) {
    //                 let tempTile = tileList[i - 1];
    //                 console.log(tempTile);
    //                 if (tempList[i].value === tempTile.value) {
    //                     tempList[i].value = 0;
    //                     tempTile.value = tempTile.value * 2;
    //                     //Increase Score ...
    //                 } else if (tempTile.value === 0) {
    //                     tempTile.value = tempList[i].value;
    //                     tempList[i].value = 0;
    //                 }
    //             }
    //         }
    //     }
    //     setTileList(tempList);
    //     tempList = addTile(tempList);
    //     // console.log(tempList);
    //     await delay(5000);
    //     setTileList(tempList);
    // };

    const updateGrid = async (key) => {
        let tempList = [...tileList];
        let newPoints = 0;

        if (key === 'down') {
            for (let i = tileList.length - 1; i >= 0; i--) {
                // console.log(i);
                if (i - size >= 0) {
                    let didTileIncrease = false;
                    for (let j = 1; j < size; j++) {
                        if (i - (size * j) >= 0) {
                            let tempTile = tileList[i - (size * j)];
                            console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i - size; k > (i - (j * size)); k = k - size) {
                                console.log('this is k: ' + k);
                                if (tempList[k].value > 0) {
                                    console.log('false');
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
                            else if (tempList[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
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
                            console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i + size; k < (i + (j * size)); k = k + size) {
                                console.log('this is k: ' + k);
                                if (tempList[k].value > 0) {
                                    console.log('false');
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
                            else if (tempList[i].value === tempTile.value && !didTileIncrease && canSwap) {
                                tempList[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
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
                        if ((i + j) % size !== 0 && (i+j)<=(size*size)) {
                            let tempTile = tileList[i + j];
                            console.log(tempTile);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i + 1; k < (i + j); k++) {
                                console.log('this is k: ' + k);
                                if (tempList[k].value > 0) {
                                    console.log('false');
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
                            else if (tempList[i].value === tempTile.value && !didTileIncrease && canSwap) {
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
                            console.log('this is the current Tile value');
                            console.log(tempTile)
                            console.log('i = ' + i);
                            console.log('j = ' + j);
                            //Check if tile is empty
                            let canSwap = true;
                            for (let k = i - 1; k > (i-j); k--) {
                                console.log('this is k: ' + k);
                                if (tempList[k].value > 0) {
                                    console.log('false');
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
                            else if (tempList[i].value === tempTile.value && !didTileIncrease &&canSwap) {
                                tempList[i].value += tempTile.value;
                                newPoints = newPoints + tempTile.value;
                                tempList[i - j].value = 0;
                                didTileIncrease = true;

                            }
                            console.log(tempList);
                        }
                    }
                }
            }
        }
        // setTileList(tempList);
        tempList = addTile(tempList);
        // console.log(tempList);
        // await delay(5000);
        console.log(score);
        setScore(score + newPoints);
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
    console.log("This is your score: " + score);
    console.log("This is the game State: " + gameState);
    return <>
        <h2>Current Score: {score}</h2>
        {gameState === 'on' ? null : <h3>GAME OVER</h3>}
        <div
            style={{
                display: 'grid',
                // margin: "30% 30%",
                backgroundColor: '#BBAC9F',
                gridTemplateColumns: totalColumns,
                gridTemplateRows: totalColumns,
                border: borderGap + " solid #BBAC9F",
                columnGap: borderGap,
                rowGap: borderGap
            }}>
            {tileList.map((tile, i) => <Tile key={i} size={sizeTile} value={tile.value}/>)
            }
        </div>
    </>;
}

export default Grid;