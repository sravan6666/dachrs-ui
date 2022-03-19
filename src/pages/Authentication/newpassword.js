import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

// import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import waves from '../../images/waves.svg';
import aiceresoft from '../../aiceresoft.png';

import styles from './auth.module.css';

const useStyles = makeStyles((theme) => ({
    card: {
        overflow: "visible",
    },
    session: {
        backgroundImage: `url(${waves})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "-200px",
        position: "relative",
        zIndex: 4000,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    // background: {
    //     backgroundColor: theme.palette.primary.main,
    // },
    content: {
        padding: `40px ${theme.spacing(1)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1 0 auto",
        flexDirection: "column",
        minHeight: "100%",
        textAlign: "center",
    },
    wrapper: {
        flex: "none",
        maxWidth: "400px",
        width: "100%",
        margin: "0 auto",
    },
    fullWidth: {
        width: "100%",
    },
    logo: {
        display: "flex",
        flexDirection: "column",
    },
}));

const Newpassword = () => {
    const classes = useStyles();
    const history = useHistory();
    const [userPassword, setUserPassword] = useState('');
    const [userConfirm, setUserConfirm] = useState('');
    const [showPass, setShowPass] = useState(false);

    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <Card>
                        <CardContent>
                            <form>
                                <div style={{ width: "100%", textAlign: "center" }}>
                                    <img
                                        src={aiceresoft}
                                        alt="logo"
                                        style={{
                                            width: "70%",
                                            height: "80px",
                                            objectFit: "contain"

                                        }}
                                    />
                                </div>

                                <div>

                                    <TextField
                                        fullWidth
                                        label="Password"
                                        margin="dense"
                                        // type="Password"
                                        type={showPass ? "text" : "password"}
                                        variant="outlined"
                                        value={userPassword}
                                        onChange={(e) => {
                                            setUserPassword(e.target.value)
                                        }}
                                    />


                                </div>
                                <div className={styles.ramana}>
                                    <TextField
                                        fullWidth
                                        // className="text-3"
                                        label="Confirm"
                                        margin="dense"
                                        // type="Password"
                                        type={showPass ? "text" : "password"}
                                        variant="outlined"
                                        value={userConfirm}
                                        onChange={(e) => {
                                            setUserConfirm(e.target.value)
                                        }}
                                    />


                                </div>
                                <div>
                                    <Checkbox
                                        color="primary"
                                        // defaultChecked
                                        size="small"
                                        inputProps={{
                                            "aria-label": "checkbox with small size",
                                        }}
                                        onChange={() => {
                                            showPass ? setShowPass(false) : setShowPass(true);
                                        }}
                                        value={showPass}
                                    />
                                    Show password
                                </div>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="mt-1"
                                    type="submit"
                                    onClick={() => {
                                        history.push("/update");
                                    }}
                                // onClick={() => {
                                //  getNewpassword();
                                // }}

                                >
                                    UPDATE
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Newpassword;
