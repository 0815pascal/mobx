import "./App.css";
import { observer } from "mobx-react-lite";
import ForeignExchange from "./CurrencyConverter";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import FakePeople from "./FakePeople";

const App = observer(() => {
  
  return (
    <>
      <header>
        <Link to="/">Go Home | </Link>
        <Link to="/services/fx">Foreign Exchange | </Link>
        <Link to="/services/fake">Fake People Award</Link>
      </header>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/services/fx" element={<ForeignExchange />} />
        <Route path="/services/fake" element={<FakePeople />} />
      </Routes>
    </>
  );
});

export default App;
