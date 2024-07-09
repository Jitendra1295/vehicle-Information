import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Brand, Category } from "../data"
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Vehicle = () => {
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [modelName, setModelName] = useState('');
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();
    const handleSubmit = async (e) => {
        setError("")
        console.log("handleSubmit ::", brand, category, modelName);

        const formData = {
            brand_id: brand._id,
            category_id: category._id,
            model_name: modelName,
            user_id: localStorage.getItem('user')
        }
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/vehicle/add', formData);
            console.log("add vehicle res::", res);
            navigate("/landingPage")
        } catch (err) {
            console.log("register err::", err);
        }
    };
    console.log(error);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add Vehicle information
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Autocomplete
                        id="combo-box-demo"
                        options={Brand}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 400, marginTop: "20px" }}
                        onChange={(e, value) => { setBrand(value) }}
                        renderInput={(params) => <TextField {...params} label="Brand Name" variant="outlined" />}
                    />
                    <Autocomplete
                        id="combo-box-demo"
                        options={Category}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 400, marginTop: "20px" }}
                        onChange={(e, value) => { setCategory(value) }}
                        renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                    />
                    <Autocomplete
                        id="combo-box-demo"
                        options={brand.model}
                        getOptionLabel={(option) => option.model_name}
                        style={{ width: 400, marginTop: "20px" }}
                        onChange={(e, value) => { setModelName(value?.model_name) }}
                        renderInput={(params) => <TextField {...params} label="Model" variant="outlined" />}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        // onClick={() => { handleSubmit() }}
                        className={classes.submit}
                    >
                        Submit
                    </Button>

                </form>
            </div>
        </Container>
    )
}

export default Vehicle
