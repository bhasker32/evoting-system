import ConnectWallet from "./components/ConnectWallet";
import ElectionList from "./components/ElectionList";

function App() {

  return (

    <div style={{padding:"40px"}}>

      <h1>Blockchain Voting System</h1>

      <ConnectWallet />

      <ElectionList />

    </div>

  );

}

export default App;