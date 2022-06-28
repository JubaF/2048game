import Tile from "../Tile/tile";

function Grid(props) {
    const size = props.size
    let totalColumns = 'auto '.repeat(size);
    return <div style={{display: 'grid', gridTemplateColumns: totalColumns, gridTemplateRows: totalColumns}}>
        <Tile value={2} />
        <Tile value={0}/>
        <Tile value={0}/>
        <Tile value={0}/>
        <Tile value={0}/>
        <Tile value={0}/>
        <Tile value={0}/>
        <Tile value={0}/>
        <Tile value={4}/>
    </div>;
}

export default Grid;