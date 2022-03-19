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
import signup from '../../images/signup.svg';
import aiceresoft from '../../aiceresoft.png';
import waves from '../../images/waves.svg';
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
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column"
    },
    background: {
        backgroundColor: "white"
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1 0 auto",
        flexDirection: "column",
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

const signUp=()=>{
    axios.put('http://localhost:5000/users/?name=sravan&username=Sravan6666&password=Sravan@123&roleUUID=b6662c22-e3b8-40dc-a98c-edb913638d37&company=kanban_test1&companyUUID=c91c95eb-88cf-4502-a5f7-b1d8979516bb&phone=7013682645&website=kanbantest.kanban.com&email=sravan@dachrs.com&teams=d805b0f5-5824-4b64-bafb-b0a5c32abff9').then(res=>{
        console.log(res);
    })
}

const Signin = () => {
    const classes = useStyles();
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <div
                        className={styles.loginimg}
                        style={{
                            maxWidth: "500px",
                            minWidth: "250px",
                            flex: "1"
                        }}>
                        <img style={{ width: "100%" }} src={signup} alt="login" />
                    </div>
                    <Card className={classes.loginscreen}>
                        <CardContent>
                            <form onSubmit={signUp}>
                                <div
                                    className={classNames(classes.logo, `text-xs-center pb-xs`)}
                                >
                                    <img
                                        src={aiceresoft}
                                        alt=""
                                        className={styles.block}
                                    />
                                    <Typography variant="caption">
                                        Sign up to AcicereSoft to continue.
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
                                <TextField
                                    label="confirm Password"
                                    className={classes.textField}
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                />
                                <FormControlLabel
                                    control={<Checkbox color="primary" value="checkedA" />}
                                    label="I have read and agree to the terms of service."
                                    className={classes.fullWidth}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    create your account
                                </Button>
                                <div className="pt-1 text-md-center">
                                    <Link to="/signin">
                                        <Button>Create your account.</Button>
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