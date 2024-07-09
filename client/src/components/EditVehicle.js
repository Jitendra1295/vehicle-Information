
import React, { useState, useEffect } from 'react'
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
import { useNavigate, useParams } from "react-router-dom";
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

const EditVehicle = () => {
    // const [selectBrand, setSelectBrand] = useState('');
    const [variant, setVariant] = useState('');
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    let { id, model, vId } = useParams();
    const arrId = id.split("")
    const arrModel = model.slice(1)
    const vehicleId = vId.slice(1)
    const selectBrand = Brand[arrId[1] - 1]
    const selectModel = selectBrand.model.filter(value => value.model_name === arrModel)
    const modelVariant = selectModel[0]?.Variant
    console.log("useParams::", selectModel, modelVariant);
    const classes = useStyles();
    const handleAddImage = async (e) => {
        e.preventDefault();
        console.log("add vehicle res::");
        const formData = new FormData();
        formData.append('file', file);
        formData.append('vehicle_information_id', vehicleId);

        try {
            console.log("add vehicle res::", formData);
            const res = await axios.post('http://localhost:5000/api/img/add', formData);
            console.log("add vehicle res::", res);
            navigate("/landingPage")
        } catch (err) {
            console.log("register err::", err);
        }
    }
    const handleSubmit = async (e) => {
        console.log("handleSubmit ::", variant, vehicleId);
        const formData = {
            model_name: variant.
                model_variant, vehicle_information_id: vehicleId
        }
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/vehicle/variant', formData)
            console.log("add image res::", res);
            navigate("/landingPage")
        } catch (err) {
            console.log("register err::", err);
        }
    };
    function handleChange(e) {
        console.log(e.target.files);
        setFile(e.target.files[0]);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add Vehicle Price Variant
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Autocomplete
                        id="combo-box-demo"
                        options={modelVariant || []}
                        getOptionLabel={(option) => option.model_variant}
                        style={{ width: 400, marginTop: "20px" }}
                        onChange={(e, value) => { setVariant(value) }}
                        renderInput={(params) => <TextField {...params} label="Add Variant" variant="outlined" />}
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
                <Typography component="h1" variant="h5">
                    Vehicle information images
                </Typography>
                <div>
                    <h2>Add Image:</h2>
                    <input type="file" onChange={handleChange} />
                    <img src={file} width={100} height={50} />

                    <Button
                        style={{ marginTop: "30px" }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            handleAddImage()
                        }}
                    // className={classes.submit}
                    >
                        Submit
                    </Button>

                </div>

            </div>
        </Container>
    )
}

export default EditVehicle
