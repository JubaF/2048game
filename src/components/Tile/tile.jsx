function Tile(props) {

    const colorP = {
        0: '#CBC0B3',
        2: '#eee4da',
        4: '#eee1c9',
        8: '#f3b27a',
        16: '#f69664',
        32: '#f77c5f',
        64: '#f75f3b',
        128: '#edd073',
        256: '#4585f2',
        512: '#edcf72',
        1028: '#edc53f',
        2048: '#E5BD30',
    }


    let backgroundColor = colorP[props.value]
    let textColor = props.value < 8 ? "766E65" : "white";

    const size = props.size + "px";
    console.log("Tile size: " + size)
    return <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: backgroundColor,
            height: size
        }}>
        <h1>{props.value === 0 ? null : props.value}</h1></div>
};

export default Tile;