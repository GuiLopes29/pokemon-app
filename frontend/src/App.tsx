import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PersonalPokedex from "./components/Pokedex";
import { checkTokenExpiry } from "./utils";
import { useEffect, useState } from "react";
import TypeFilter from "./components/TypeFilter";
import PokemonList from "./components/PokemonList";
import Layout from "./components/ExpiredToken";
import TopMenu from "./components/TopMenu";

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if (checkTokenExpiry(localStorage.getItem("token"))) {
      setIsTokenExpired(true);
    }
  }, []);

  const handleFilterChange = (selectedType: string) => {
    setFilter(selectedType);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login tokenExpired={isTokenExpired} />}
        />
        <Route
          path="/pokedex"
          element={
            <Layout tokenExpired={isTokenExpired}>
              <TopMenu />
              {!isTokenExpired && localStorage.getItem("token") ? (
                <PersonalPokedex />
              ) : (
                <Login tokenExpired={isTokenExpired} />
              )}
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout tokenExpired={isTokenExpired}>
              <TopMenu />
              {!isTokenExpired && localStorage.getItem("token") ? (
                <>
                  <TypeFilter onFilterChange={handleFilterChange} />
                  <PokemonList filter={filter} />
                </>
              ) : (
                <Login tokenExpired={isTokenExpired} />
              )}
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
