import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const OnePet = (props) => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                console.log(res.data);
                setPet(res.data);
            }).catch(err => {
                console.log(err)
            })
    }, [id])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/pets/delete/${id}`)
            .then(res => {
                navigate('/');
            }).catch(err => {
                console.log(err);
            })
    }

    if (pet === null) {
        return null;
    }

    // We can only safely use the data to render and destructure now since
    // we checked it's not null.
    const { name, type, description, skill1, skill2, skill3 } = pet;

    return (
        <div className="w-100 mx-auto shadow mb-4 rounded border p-4">
            <nav className="flex">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </nav>
            <div className="margin-top">
                <div className="flex">
                    <h2>Details about: {name}</h2>
                    <button
                        onClick={handleDelete}
                        className="btn btn-med btn-outline-danger mx-1">
                        Adopt {name}
                    </button>
                </div>
                <h3>Pet type: {type}</h3>
                <h3>Description: {description}</h3>
                <h3>Skills: </h3>
                <ul className="no-bullets">
                    <li>{skill1}</li>
                    <li>{skill2}</li>
                    <li>{skill3}</li>
                </ul>
                <Link to={`/pets/${pet._id}/edit`}>Edit</Link>
            </div>
        </div>
    );
};

export default OnePet;