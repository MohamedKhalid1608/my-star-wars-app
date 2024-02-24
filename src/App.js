import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://swapi.dev/api/planets/?format=json');
        const data = await response.json();
        setPlanets(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching planets:', error);
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const fetchPage = async (pageUrl) => {
    setLoading(true);
    try {
      const response = await fetch(pageUrl);
      const data = await response.json();
      setPlanets(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching planets:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Planets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="planets-container">
            {planets.map((planet, index) => (
              <div key={index} className="planet-card">
                <h2>{planet.name}</h2>
                <p>Climate: {planet.climate}</p>
                <p>Population: {planet.population}</p>
                <p>Terrain: {planet.terrain}</p>
                <h3>Residents:</h3>
                <table>
                  <tbody>
                    {planet.residents.map((resident, idx) => {
                      const residentId = resident.split('/').filter(Boolean).pop();
                      return (
                        <tr key={idx}>
                          <td>Resident with id {residentId}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <div className="pagination">
            {prevPage && (
              <button onClick={() => fetchPage(prevPage)}>Previous</button>
            )}
            {nextPage && (
              <button onClick={() => fetchPage(nextPage)}>Next</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
