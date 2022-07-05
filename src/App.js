import './App.css';
import Grid from "./components/Grid/grid";


function App() {


    return (
        <div className="App">
            <div style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: '100%',

            }}>
                <h2  style={{
                    color: 'orange',
                    fontWeight: '900',
                    fontSize: '40px',
                    textAlign: 'center'
                }}>2048 GAME</h2>
                <Grid size={5}/>
            </div>

        </div>
    );
}

export default App;
