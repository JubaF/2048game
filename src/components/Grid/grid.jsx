import Tile from "../Tile/tile";
import {useState} from "react";

function Grid(props) {
    const size = props.size
    let totalColumns = 'auto '.repeat(size);
    let [isInitialized, setIsInitialized] = useState(false)
    let [tileList, setTileList] = useState([])
    const addTile = () => {
        let rdNumber = Math.floor((Math.random() * 100) + 1) % 2 === 0 ? 0 : 2;
        let tempList = [...tileList];
        tempList.push({value: rdNumber})
        setTileList(tempList);
    };
    // totalSize
    if (!isInitialized) {
        let tempList = [...tileList];
        for (let i = 0; i < 9; i++) {
            let rdNumber = Math.floor((Math.random() * 100) + 1) % 2 === 0 ? 0 : 2;
            tempList.push({value: rdNumber})
        }
        setTileList(tempList);
        setIsInitialized(true);
    }
    console.log(tileList);
    return <div style={{display: 'grid', gridTemplateColumns: totalColumns, gridTemplateRows: totalColumns}}>
        {tileList.map((tile,i) => <Tile key={i} value={tile.value}/>)
        }
    </div>;
}

export default Grid;