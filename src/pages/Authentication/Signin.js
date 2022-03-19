import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import styles from './auth.module.css';

//image
import login from '../../images/login.svg';
import waves from '../../images/waves.svg';
import aiceresoft from '../../aiceresoft.png';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    card: {
        overflow: "visible"
    },
    session: {
        backgroundImage: `url(${waves})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "-200px",
        position: "relative",
        zIndex: 4000,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    background: {
        backgroundColor: "white"
    },
    content: {
        padding: `40px ${theme.spacing(1)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1 0 auto",
        flexDirection: "column",
        minHeight: "100%",
        textAlign: "center"
    },
    wrapper: {
        flex: "none",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        margin: "0 auto"
    },
    loginscreen: {
        minWidth: "250px",
        maxWidth: "400px",
        margin: "16px",
        padding: "24px 16px",
        borderRadius: "20px",
        flex: "1"
    },
    fullWidth: {
        width: "100%"
    },
    logo: {
        display: "flex",
        flexDirection: "column"
    }
}));

const logintest=()=>{
    const req = {
        username:'sravan',
        password:'123'
    }
    axios.post('http://127.0.0.1:5000/login/', req).then((res)=>{
console.log(res);
    });
}

const Signin = () => {
    const classes = useStyles();
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <div
                        className="loginimg"
                        style={{
                            maxWidth: "500px",
                            minWidth: "250px",
                            flex: "1"
                        }}>
                        <img style={{ width: "100%" }} src={login} alt="login" />
                    </div>
                    <Card className={classes.loginscreen}>
                        <CardContent>
                            <form onClick={logintest}>
                                <div
                                    className={classNames(classes.logo, `text-xs-center pb-xs`)}
                                >
                                    <img
                                        src={aiceresoft}
                                        alt=""
                                        className="block"
                                    />
                                    <Typography variant="caption">
                                        Sign in to AcicereSoft to continue.
                                    </Typography>
                                </div>
                                <TextField
                                    id="username"
                                    label="Username"
                                    className={classes.textField}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    className={classes.textField}
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                />
                                <FormControlLabel
                                    control={<Checkbox color="primary" value="checkedA" />}
                                    label="Stayed logged in"
                                    className={classes.fullWidth}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    Login
                                </Button>
                                <div className="pt-1 text-md-center">
                                    <Link to="/forgot">
                                        <Button>Forgot password?</Button>
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to="/signup">
                                        <Button>Create new account.</Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Signin;