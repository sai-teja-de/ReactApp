import React, { useState, useEffect} from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";

const SearchParams =() => {
    const [location, updateLocation] = useState('Seattle, WA');
    const [breeds, updateBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal",'dog',ANIMALS);
    const [breed, BreedDropdown, updateBreed] = useDropdown("Breed","",breeds);
    const [pets, updatePets] = useState([]);

    const requestsPets = async () => {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });
        updatePets(animals || []);
    }

    useEffect(() => {
        updateBreeds([]);
        updateBreed("");
        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            updateBreeds(breedStrings);
        },console.error);
    },[animal,updateBreeds,updateBreed]);

    return (
        <div className="search-params">
            <h1>{location}</h1>
            <form onSubmit={e => {
                e.preventDefault();
                requestsPets();
            }}
            >
                <label htmlFor="location">
                    Location
                    <input id="location" 
                    value={location} 
                    placeholder="Location"
                    onChange={e => updateLocation(e.target.value)}
                    />
                </label>
                < AnimalDropdown />
                < BreedDropdown />
                <button>Submit</button>
            </form>
            
            < Results pets={pets} />
        </div>
    );
};

export default SearchParams;