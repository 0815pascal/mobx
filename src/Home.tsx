// Home.tsx
import { observer } from "mobx-react-lite";
import { useStores } from "./hooks/useStores";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import mobxLogo from "./assets/mobx.svg";
import tsLogo from "./assets/typescript.svg";

export const Home: React.FC = observer(() => {
  const { loadingStore } = useStores();

  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://mobx.js.org" target="_blank" rel="noopener noreferrer">
          <img src={mobxLogo} className="logo mobx" alt="logo MobX" />
        </a>
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={tsLogo} className="logo ts" alt="logo TypeScript" />
        </a>
      </div>
      <h1>Vite + React + MobX + TypeScript</h1>
      <div className="card">
        <button onClick={loadingStore.simulateFetch}>Simulate Fetch</button>
        {loadingStore.isLoading ? <p>Loading...</p> : <p>Not Loading</p>}
      </div>
    
    </div>
  );
});
