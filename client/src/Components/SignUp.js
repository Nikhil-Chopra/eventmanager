import React, { Component } from "react";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import logo from "../Images/logo.png";
import { LockRounded } from "@material-ui/icons";
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import * as RegisterLink from "../Constant";

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : null,
            email: null,
            password: null,
            confirmPassword: null,
            phonenumber : null,
            warning: null,
            redirect: false,
        };
    }
    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };
    register(e) {
        e.preventDefault();
        //Call API
        if (!this.state.name || !this.state.email || !this.state.password || !this.state.confirmPassword || !this.state.phonenumber) {
            alert("Please Enter all the Information");
        } else if (this.state.password !== this.state.confirmPassword) {
            alert("Password did not match");
        } else {
            const url = RegisterLink.Link.baseUrl.RegisterUrl;
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phonenumber : this.state.phonenumber
            };    
            console.log(data);
            axios.post(url, data).then( (response) => {
                if (response.data) {
                    console.log(response.data)
                    localStorage.setItem("token", response.data);
                    alert("Registration Successfull");
                    this.setState({redirect: true,});
                } else {
                    console.log(response);
                    alert("Something Went Wrong");
                }
            }, (error) => {
                console.log(error);
                alert("Something Went Wrong");
            });
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/landingpage" />;
        }
        return (
        <div>
            <Grid container style={{ minHeight: "100vh", maxHeight: "100vh" }}>
                <Grid container item xs={12} sm={6} md={8}> <Slider /></Grid>
                <Grid container item xs={12} sm={6} md={4} alignItems="center" direction="column" justify="space-between" 
                    style={{ padding: 10 }} >
                <div/>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, minWidth: 300, }}>
                    <Grid container justify="center"> <img src={logo} width={100} height={90} alt="logo" /></Grid>
                    <br /> <br />
                    
                    <TextField label="Name" margin="normal" onChange={(event) => {this.setState({name: event.target.value }); }}/>
                    
                    <TextField label="Email" margin="normal"
                        InputProps={{ startAdornment: ( <InputAdornment position="start"> <AlternateEmailIcon /> </InputAdornment>), }}
                        onChange={(event) => { this.setState({ email: event.target.value }); }} />
                    
                    <TextField label="Password"   margin="normal" type="password"
                        InputProps={{ startAdornment: (<InputAdornment position="start"> <LockRounded /></InputAdornment> ),}}
                        onChange={(event) => { this.setState({ password: event.target.value });}}/>
                    
                    <TextField label="Confirm Password" margin="normal" type="password"
                        InputProps={{ startAdornment: (<InputAdornment position="start"><LockRounded /></InputAdornment>),}}
                        onChange={(event) => {this.setState({ confirmPassword: event.target.value });}}/>
                    <div style={{ height: 20 }} />
                    
                    <TextField label="Phonenumber" margin="normal" 
                        InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneAndroidIcon /></InputAdornment>),}}
                        onChange={(event)=>{this.setState({phonenumber: event.target.value });}}/>
                    <div style={{ height: 20 }} />
                    <div style={{ height: 20 }} />
                    
                    <Button color="primary" variant="contained" onClick={(e) => this.register(e)}> Sign Up </Button>
                    <div style={{ height: 20 }} />
                    <Button variant="outlined">
                        <Link to="/" style={{ textDecoration: "none", color: "black", width: "100%", }}>
                            Already Have Account ? Sign In
                        </Link>
                    </Button>
                </div>
                <div />
                </Grid>
            </Grid>
        </div>
        );
    }
}

export default SignUp;
