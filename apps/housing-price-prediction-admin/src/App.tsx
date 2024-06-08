import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { PropertyList } from "./property/PropertyList";
import { PropertyCreate } from "./property/PropertyCreate";
import { PropertyEdit } from "./property/PropertyEdit";
import { PropertyShow } from "./property/PropertyShow";
import { LocationList } from "./location/LocationList";
import { LocationCreate } from "./location/LocationCreate";
import { LocationEdit } from "./location/LocationEdit";
import { LocationShow } from "./location/LocationShow";
import { TransactionList } from "./transaction/TransactionList";
import { TransactionCreate } from "./transaction/TransactionCreate";
import { TransactionEdit } from "./transaction/TransactionEdit";
import { TransactionShow } from "./transaction/TransactionShow";
import { OwnerList } from "./owner/OwnerList";
import { OwnerCreate } from "./owner/OwnerCreate";
import { OwnerEdit } from "./owner/OwnerEdit";
import { OwnerShow } from "./owner/OwnerShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"HousingPricePrediction"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="Property"
          list={PropertyList}
          edit={PropertyEdit}
          create={PropertyCreate}
          show={PropertyShow}
        />
        <Resource
          name="Location"
          list={LocationList}
          edit={LocationEdit}
          create={LocationCreate}
          show={LocationShow}
        />
        <Resource
          name="Transaction"
          list={TransactionList}
          edit={TransactionEdit}
          create={TransactionCreate}
          show={TransactionShow}
        />
        <Resource
          name="Owner"
          list={OwnerList}
          edit={OwnerEdit}
          create={OwnerCreate}
          show={OwnerShow}
        />
      </Admin>
    </div>
  );
};

export default App;
