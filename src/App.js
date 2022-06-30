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
                <h2>2048 GAME</h2>
                <Grid size={4}/>
            </div>

        </div>
    );
}

export default App;
