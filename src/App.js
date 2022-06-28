import './App.css';
import Grid from "./components/Grid/grid";

function App() {
  return (
    <div className="App">
        <div>
            <h2>2048 GAME</h2>
            <h3>Score: 5000</h3>
            <Grid size={3}/>
        </div>
    </div>
  );
}

export default App;
