import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import waves from '../../images/waves.svg';
import aiceresoft from '../../aiceresoft.png';


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
        maxWidth: "400px",
        width: "100%",
        margin: "0 auto"
    },
    fullWidth: {
        width: "100%"
    },
    logo: {
        display: "flex",
        flexDirection: "column"
    }
}));

const PasswordReset = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <Card >
                        <CardContent>
                            <form>
                                <div
                                    className={classNames(classes.logo, `text-xs-center pb-xs`)}
                                >
                                    <img
                                        src={aiceresoft}
                                        alt=""
                                    />
                                    <Typography variant="caption">
                                        Enter your email and we'll send you instructions on how to
                                        reset your password.
                                    </Typography>
                                </div>
                                <TextField
                                    id="email"
                                    label="Email Address"
                                    className={classes.textField}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    onClick={() => history.push('/otp')}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className="mt-1"
                                    type="submit"
                                >
                                    Send password reset
                                </Button>
                                <div className="pt-1 text-xs-center">
                                    <Link to="/signin">
                                        <Button>Sign</Button>
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

export default PasswordReset;