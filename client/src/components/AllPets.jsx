import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AllPets = (props) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then(res => {
                console.log(res.data);
                setPets(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
            <nav className="flex">
                <h1>Pet Shelter</h1>
                <Link to="/pets/new">add a pet to the shelter</Link>
            </nav>
            <div className="margin-top">
                <h3>These pets are looking for a good home</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet) => {
                        return (
                            <tr key={pet._id} className="shadow mb-4 rounded border p-4">
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td><Link to={`/pets/${pet._id}`}>Details</Link> | <Link to={`/pets/${pet._id}/edit`}>Edit</Link></td>
                            </tr> 
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default AllPets;