import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import { TextField } from '@material-ui/core';
import axios from 'axios';

function Home() {

    const [projectName, setProjectName] = useState('')
    useEffect(()=>{
        axios.get('http://192.168.52.94:5000/users').then(res=>{
            console.log(res);
        })
    })
    return (
        <div className={styles.home}>
            <div className={styles.head}>
                <div>
                    <p>Kanban (Japanese: meaning signboard or billboard) is a lean method to manage and improve work across human systems. This approach aims to manage work by balancing demands with available capacity, and by improving the handling of system-level bottlenecks.</p>
                </div>
                <div>
                    <input
                        className={styles.projectNameinput}
                        placeholder="create Project.."
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.sidecontent}>

            </div>
        </div>
    )
}

export default Home
{/* 

<div className={styles.header22}>
                    Aiceresoft KANBAN
                </div>
                <div style={{ display: !signup ? "block" : "none" }} className={styles.textFeilds}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        alert("form submitted")
                    }}>
                        <div className={styles.textFeild}>
                            <label>Email</label>
                            <TextField
                                placeholder="example@gmail.com"
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </div>
                        <div className={styles.textFeild}>
                            <label>Password</label>
                            <TextField
                                placeholder="enter Password"
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </div>
                        <div className={styles.textFeild}>
                            <button type="submit" className={styles.loginbutton}>
                                Login
                            </button>
                            <p>
                                Don't have an Accout? <span>Sign up</span>
                            </p>
                        </div>
                    </form>
                </div>

                <div style={{ display: signup ? "block" : "none" }} className={styles.textFeilds}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        alert("form submitted")
                    }}>
                        <div className={styles.textFeild}>
                            <label>User Name</label>
                            <TextField
                                placeholder="enter name.."
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </div>
                        <div className={styles.textFeild}>
                            <label>Email</label>
                            <TextField
                                placeholder="example@gmail.com"
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </div>
                        <div className={styles.textFeild}>
                            <label>Password</label>
                            <TextField
                                placeholder="enter Password"
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </div>
                        <div className={styles.textFeild}>
                            <button type="submit" className={styles.loginbutton}>
                                Sign up
                            </button>
                            <p>
                                Already had an Accout? <span onClick={() => setsignup(false)}>Sign in</span>
                            </p>
                        </div>
                    </form>
                </div>

            </div> */}