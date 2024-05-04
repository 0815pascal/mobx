import "./App.css";
import { observer } from "mobx-react-lite";
import { useStores } from "./hooks/useStores";
import NewComponent from "./NewComponent";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./Home";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";

type Person = {
  name: string;
  email: string;
}

const App = observer(() => {
  const { loadingStore } = useStores();
  const location = useLocation();

  const fetchData = async (): Promise<Person> => {
          loadingStore.showLoader();
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          name: faker.person.fullName(),
          email: faker.internet.email(),
        });
      }, 1000)
    );
  };

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["data", location.pathname],
    queryFn: fetchData,
  });



  useEffect(() => {
    console.log('isError', isError, 'isFetching', isFetching, 'data', data)
    if (!isError && !isFetching) {
      console.log(data)
      loadingStore.hideLoader();
    }
  }, [data, isError, isFetching, loadingStore]);

  useEffect(() => {
    if (error) {
      console.log("Error fetching data:", error);
    }
  }, [error]);

  return (
    <>
      <header>
        <Link to="/new-component">Go to New Component | </Link>
        <Link to="/">Go Home</Link>
      </header>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/new-component" element={<NewComponent />} />
      </Routes>
      <p>{(!loadingStore.isLoading && data && data.name) ?? ""}</p>
    </>
  );
});

export default App;
