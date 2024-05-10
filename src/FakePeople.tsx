import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStores } from "./hooks/useStores";
import { observer } from "mobx-react-lite";


type Person = {
  name: string;
  email: string;
};

const FakePeople = observer(() => {
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
   if (error) {
     console.log("Error fetching data:", error);
   }
 }, [error]);

  useEffect(() => {
    if (!isError && !isFetching) {
      console.log(data)
      loadingStore.hideLoader();
    }
  }, [data, isError, isFetching, loadingStore]);

    return (
      <>
        <h1>Fake Person of the Day</h1>
        {loadingStore.isLoading ? <p>Loading...</p> : <p>{data?.name}</p>}
      </>
    );
})

export default FakePeople;