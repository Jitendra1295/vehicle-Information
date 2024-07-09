
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { Brand, Category } from "../data"

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    flexGrow: {
        flexGrow: 1,
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function LandingPage() {
    const [vehicleData, setVehicleData] = useState('');
    const [brand, setBrand] = useState('');
    const classes = useStyles();
    const navigate = useNavigate();
    const handleAddVehicle = () => {
        navigate("/vehicle")
    }

    useEffect(() => {
        async function getVehicleData() {
            try {
                const res = await axios.get(`http://localhost:5000/api/vehicle/:${localStorage.getItem('user')}`);
                console.log("getVehicleData res::", res);
                setVehicleData(res.data)
            } catch (err) {
                console.log("register err::", err);
            }
        }
        getVehicleData()
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem('token'); // Adjust this key according to your storage key
        localStorage.removeItem('user'); // Adjust this key according to your storage key
        navigate("/")

    }
    const handleSearch = async () => {
        console.log("submit:", brand);
        try {
            const res = await axios.get(`http://localhost:5000/api/vehicle/${localStorage.getItem('user')}/${brand._id}`);
            console.log("getVehicleData res::", res);
            setVehicleData(res.data)
        } catch (err) {
            console.log("register err::", err);
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Vehicle information
                    </Typography>
                    <div className={classes.flexGrow}></div>
                    <Button variant="contained" onClick={() => { handleLogout() }}>
                        <span style={{ color: "red" }}>Logout</span>
                    </Button>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Vehicle Information
                        </Typography>

                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button style={{ height: "53px" }} onClick={() => { handleAddVehicle() }} variant="contained" color="primary">
                                        Add Vehicle
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={Brand}
                                        getOptionLabel={(option) => option.name}
                                        style={{ width: 200 }}
                                        onChange={(e, value) => { setBrand(value) }}
                                        renderInput={(params) => <TextField {...params} label="Filter" variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button style={{ height: "53px" }} onClick={() => { handleSearch() }} variant="contained" color="primary">
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {vehicleData && vehicleData.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://picsum.photos/200/300"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card?.model_name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => { navigate(`/view/${card?._id}`) }} size="small" color="primary">
                                            View
                                        </Button>
                                        <Button onClick={() => { navigate(`/edit/${card?.brand_id}/${card?.model_name}/${card?._id}`) }} size="small" color="primary">
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}