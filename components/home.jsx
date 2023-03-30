import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Home() {
  const [dogs, setDogs] = useState([]);
  const [search, setSearch] = useState("");

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
    fetchDogData();
  }, []);

  return (
    <section>
      <div className="home">
        <h1 className="title">Dog App</h1>
        <div className="userInput">
          <input className="input" placeholder="Enter a Dog name..." />
          <button className="button">Search</button>
        </div>
      </div>
      <div className="displaySection">
        {dogs.map((dog) => (
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
        ))}
      </div>
    </section>
  );
}

export default Home;
