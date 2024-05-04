import { observer } from "mobx-react-lite";
import { useStores } from "./hooks/useStores";

const NewComponent = observer(() => {
  const { loadingStore } = useStores();

  return (
    <div>
      {loadingStore.isLoading ? <p>Loading...</p> : <p>Content loaded!</p>}
    </div>
  );
});

export default NewComponent;
