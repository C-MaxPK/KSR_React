import Router from "./Router/Router";
import './fonts/fonts.css';
import './styles/App.scss';

function App(): JSX.Element {

  return (
    <div className="container">
      <div className="wrapper">
        <Router/>
      </div>
    </div>
  );
}

export default App;
