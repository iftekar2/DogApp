import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Home() {
  const [dogs, setDogs] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds");
        const data = await res.json();
        setDogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    setSearch(false);
    fetchDogData();
  }, []);

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${input}`
      );
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchForDog();
    setSearch(true);
  };

  return (
    <section>
      <div className="home">
        <h1 className="title">Dog App</h1>
        <div className="userInput">
          <input
            className="input"
            placeholder="Enter a Dog name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </div>
      <div className="displaySection">
        {!search ? (
          dogs.map((dog) => (
            <Link to={`/${dog.name}`} key={dog.id}>
              <article className="showSection">
                <img
                  className="dogImage"
                  src={dog.image.url}
                  alt={dog.name}
                  loading="lazy"
                />
                <h2 className="dogName">{dog.name}</h2>
                <p className="dredFor">Bred for: {dog.bred_for}</p>
              </article>
            </Link>
          ))
        ) : (
          <>
            {dogs.map((dog) => (
              <Link to={`/${dog.name}`} key={dog.id}>
                <article className="showSection">
                  <img
                    src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                    alt={dog.name}
                    className="dogImage"
                  />
                  <h2 className="dogName">{dog.name}</h2>
                  <p className="dredFor">Bred for: {dog.bred_for}</p>
                </article>
              </Link>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
