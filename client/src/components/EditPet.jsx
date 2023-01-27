import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export const EditPet = (props) => {
    const {id} = useParams();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                const {
                    name,
                    type,
                    description,
                    skill1,
                    skill2,
                    skill3
                } = res.data

                setName(name);
                setType(type);
                setDescription(description);
                setSkill1(skill1);
                setSkill2(skill2);
                setSkill3(skill3);
            }).catch(err => {
                console.log(err);
            })
    }, [id])

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedPet = {
        name,
        type,
        description,
        skill1,
        skill2,
        skill3
        }

        axios.put(`http://localhost:8000/api/pets/edit/${id}`, updatedPet)
        .then(res => {
            navigate(`/pets/${id}`);
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
                <h3 className="text-center">Edit {name} </h3>

                <form
                    onSubmit={e => { handleUpdate(e) }}
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
                        type="text" className="form-control" value={name}
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
                        className="form-control" value={type}
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
                        className="form-control" value={description}
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
                        className="form-control" value={skill1}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label className="h6">Skill 2</label>
                    <input
                        onChange={(event) => {
                        setSkill2(event.target.value);
                        }}
                        type="text"
                        className="form-control" value={skill2}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label className="h6">Skill 3</label>
                    <input
                        onChange={(event) => {
                        setSkill3(event.target.value);
                        }}
                        type="text"
                        className="form-control" value={skill3}
                    />
                    </div>
                    <button className="btn btn-sm btn-outline-primary">Edit Pet</button>
                </form>
            </div>
        </div>
    )
};

export default EditPet;