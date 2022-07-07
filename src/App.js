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
                    fontSize: '3rem',
                    textAlign: 'center'
                }}>JEU 2048</h2>
                <Grid/>
            </div>

        </div>
    );
}

export default App;
