import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

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

const ViewPage = () => {
    const [userData, setUserData] = useState('');
    const [error, setError] = useState('');
    let { id } = useParams();
    useEffect(() => {
        async function getVehicleData() {
            try {
                const res = await axios.get(`http://localhost:5000/api/img/user/${id}`);
                console.log("res::", res);
                if (res.status === 200) {
                    setUserData(res.data?.vehicleDetails[0])
                }
                else if (res?.response?.status === 400 || res?.response?.status === 500) {
                    console.log("error res::", res.response.data.Error);
                    setError(res.response.data.Error)
                }
            } catch (err) {
                console.log("register err::", err);
            }
        }
        getVehicleData()

    }, [])



    const navigate = useNavigate();
    const classes = useStyles();
    const ImageData = [1, 2, 3]

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Vehicle information
                </Typography>

                <div style={{ display: "flex", flexDirection: "column", marginTop: "40px" }}>
                    <span>Vehicle Brand:  {userData?.brand_id} </span>
                    <span>Category:  {userData?.category_id} </span>
                    <span>modelName: {userData?.model_name} </span>
                </div>
                <Typography component="h1" variant="h5">
                    Vehicle Images
                </Typography>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "40px", marginBottom: "40px" }}>
                    {
                        userData?.images && userData?.images.map((image, index) => {
                            return (
                                <div>
                                    <img src={`http://localhost:5000/${image?.vehicle_information_image}`} style={{ marginLeft: "20px" }} width={200} height={100}></img>
                                </div>
                            )
                        })

                    }
                </div>

                <Typography component="h1" variant="h5">
                    Vehicle Price Variant
                </Typography>
                <div style={{ display: "flex", flexDirection: "column", marginTop: "40px" }}>
                    <span>Model Variant name :  {userData && userData?.variants[0]?.model_name}</span>
                    <span>Model color:  {userData && userData?.variants[0]?.model_color} </span>

                </div>

            </div>
        </Container>
    )
}

export default ViewPage
