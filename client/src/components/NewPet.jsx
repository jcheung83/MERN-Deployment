import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const NewPet = (props) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const createPet = async (e) => {
        e.preventDefault();
        const newPet = {
        name,
        type,
        description,
        skill1,
        skill2,
        skill3
        }

        axios.post("http://localhost:8000/api/pets/new", newPet)
        .then(res => {
            navigate(`/`);
        }).catch(err => {
            console.log(err.response);
            setErrors(err.response?.data?.errors)
        })
    }

    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
            <nav className="flex">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </nav>
            <div className="margin-top">
                <h3 className="text-center">Know a pet needing a home?</h3>

                <form
                    onSubmit={e => { createPet(e) }}
                >
                    <div className="form-group">
                    <label className="h6">Pet Name</label>
                    {
                        errors?.name && (
                        <p style={{ color: 'red' }}>{errors.name?.message}</p>
                        )
                    }
                    <input
                        onChange={(event) => {
                        setName(event.target.value);
                        }}
                        type="text" className="form-control"
                    />
                    </div>
                    
                    <div className="form-group">
                    <label className="h6">Pet Type</label>
                    {
                        errors?.type && (
                        <p style={{ color: 'red' }}>{errors.type?.message}</p>
                        )
                    }
                    <input
                        onChange={(event) => {
                        setType(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                    />
                    </div>

                    <div className="form-group">
                    <label className="h6">Pet Description</label>
                    {
                        errors?.description && (
                        <p style={{ color: 'red' }}>{errors.description?.message}</p>
                        )
                    }
                    <textarea
                        onChange={(event) => {
                        setDescription(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                    ></textarea>
                    </div>
                    <p></p>
                    <h4>Skills (optional)</h4>
                    <div className="form-group">
                    <label className="h6">Skill 1</label>
                    <input
                        onChange={(event) => {
                        setSkill1(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                    />
                    </div>
                    
                    <div className="form-group">
                    <label className="h6">Skill 2</label>
                    <input
                        onChange={(event) => {
                        setSkill2(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                    />
                    </div>
                    
                    <div className="form-group">
                    <label className="h6">Skill 3</label>
                    <input
                        onChange={(event) => {
                        setSkill3(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                    />
                    </div>
                    
                    <button className="btn btn-sm btn-outline-success">Add pet</button>
                </form>
            </div>
        </div>
    )
};

export default NewPet;