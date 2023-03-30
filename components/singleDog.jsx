import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";

export default function singleDog() {
  const [dogDetail, setDogDetail] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const setchSingleDogData = async () => {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`
        );
        const data = await res.json();
        setDogDetail(data);
      } catch (error) {
        console.error(error);
      }
    };
    setchSingleDogData();
  }, [name]);

  return (
    <div className="dogInfo">
      {dogDetail.map((item) => (
        <div key={item.id} className="singleDog">
          <div>
            <img
              src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
              alt={item.name}
            />
          </div>
          <div>
            <h1 className="dogName">{item.name}</h1>
            {item.description && <p>{item.description}</p>}

            <ul children="dogDiscription">
              <p className="bred">Bred for: {item.bred_for}</p>
              <p className="height">Height: {item.height.imperial} cm</p>
              <p className="weight">Weight: {item.weight.imperial} Lbs</p>
              <p className="breedGroup">Breed Group: {item.breed_group}</p>
              <p className="lifespan">Lifespan: {item.life_span}</p>
              <p className="tempermant">Temperament: {item.temperament}</p>
            </ul>

            <Link to="/">
              <button className="backToMain">Back</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
