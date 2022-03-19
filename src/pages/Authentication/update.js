import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

// import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import waves from '../../images/waves.svg';
import aiceresoft from '../../aiceresoft.png';
import check from '../../images/check.png';



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


const Updates = () => {
    const classes = useStyles();
    const history = useHistory();
    //   const [forgotMail, setForgotMail] = useState("");
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <Card>
                        <CardContent>
                            <form>
                                <div style={{ width: "100%", textAlign: "center" }} >
                                    <img
                                        src={aiceresoft}
                                        alt="logo"
                                        style={{
                                            width: "70%",
                                            height: "80px",
                                            objectFit: "contain"
                                            // height: "100px",
                                            // top: "auto",
                                            // marginLeft: "-190px",
                                            //position: "absolute",
                                            // zIndex: "2",
                                        }}
                                    />
                                </div>
                                <p className="update">PASSWORD UPDATE</p>

                                <div >
                                    <img

                                        src={check}
                                        alt="logo"
                                        style={{
                                            width: "90px",
                                            height: "90px",
                                            // top: "auto",
                                            // marginLeft: "-190px",
                                            //position: "absolute",
                                            // zIndex: "2",
                                        }}
                                    />
                                </div>


                                <Link to="/">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="mt-1"
                                        type="submit"

                                    // onClick={()=>{
                                    //   history.push('/Updates');
                                    // }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Updates;
