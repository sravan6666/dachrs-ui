import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link, useHistory } from "react-router-dom";
import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import styles from './auth.module.css';


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
    const inputRef = React.useRef();
    const [otp, setotp] = useState(new Array(6).fill(""));
    const handleChange = (element, index) => {


        if (isNaN(element.value)) return false;
        setotp([...otp.map((d, idx) => (idx === index) ? element.value : d)]);

        if (element.nextsibling) {
            element.nextsibling.focus();
        }




        if (index < 6)
            inputRef.current?.children[index + 1]?.focus();

    };
    const history = useHistory();
    const [forgotMail, setForgotMail] = useState("");
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <Card>
                        <CardContent>
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

                                <p
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    Enter the Verification code we just sent you on your email
                                    address.
                                </p>
                                <form ref={inputRef}>
                                    {otp.map((data, index) => {
                                        return (
                                            <input

                                                className={styles["otp-field"]}
                                                type="text"
                                                name="otp"
                                                maxLength="1"
                                                key={index}
                                                value={data}
                                                onChange={(e) => handleChange(e.target, index)}
                                                onFocus={e => e.target.select()}
                                            />
                                        );
                                    })}
                                </form>
                                {/* <p>Otp Enter - {otp.join("")}</p>     */}
                                <p>
                                    if you didn't receive a code!<span className={styles.resend}> <Link >Resend</Link></span>
                                </p>

                                <div className={styles.btn5}>
                                    <div>
                                        <Link to="/signin">
                                            <p style={{ margin: "0px" }}>go back to login</p>
                                        </Link>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                    }}>
                                        <div>
                                            <button
                                                style={{
                                                    backgroundColor: "white !important",
                                                    border: "1px solid darkblue",
                                                    marginRight: "16px",
                                                    padding: " 6px 16px ",
                                                    cursor: "pointer",
                                                    borderRadius: "8px",

                                                }}
                                                type="submit"
                                                onClick={e => setotp(new Array(6).fill(""))
                                                }
                                            >
                                                Clear
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                style={{
                                                    cursor: "pointer",
                                                    outline: "none",
                                                    padding: " 6px 16px ",
                                                    borderRadius: "8px",
                                                    backgroundColor: " darkblue",
                                                    color: "#fff",
                                                    border: "1px solid darkblue"
                                                }}
                                                type="submit"
                                                onClick={() => {
                                                    history.push("/Newpassword");
                                                }}
                                            // onClick={() => {
                                            //   getVerify();
                                            // }}
                                            >
                                                Verify
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;