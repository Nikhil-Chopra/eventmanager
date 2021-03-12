import React, { Component } from "react";
import { Button , TextField } from "@material-ui/core";
import { Redirect } from 'react-router';
import "./UploadPost.css";
import axios from "axios";
import * as UploadPostLink from "../Constant";
import 'react-image-crop/lib/ReactCrop.scss';


export class UploadPost extends Component {
    state = {
        title: null,
        eventstartatdate : null ,
        eventstartattime : null ,
        eventendatdate : null ,
        eventendattime : null ,
        redirect:false,
    };
    submit = (e) => {
        // alert(this.state.title)
        // alert(this.state.eventstartatdate)
        // alert(this.state.eventstartattime)
        // alert(this.state.eventendatdate)
        // alert(this.state.eventendattime)
        if( !this.state.title || !this.state.eventstartatdate || !this.state.eventstartattime || !this.state.eventendatdate || 
            !this.state.eventendattime){
            alert("Please Enter all the Information");
        }
        else {
            let date1 = `${this.state.eventstartatdate}T${this.state.eventstartattime}:00`
            let date2 = `${this.state.eventendatdate}T${this.state.eventendattime}:00`
            const dateone = new Date(date1)
            const datetwo = new Date(date2)
            if(dateone > datetwo){
                alert('Start event should be less than end event time')
            }else{
                const data = {
                    title :this.state.title ,
                    eventstartat : date1 ,
                    eventendat : date2 
                }
                const token = localStorage.getItem("token");
                // alert(token)
                const config = { headers: {  Authorization: `Bearer ${token}`}};
                const url = UploadPostLink.Link.baseUrl.UploadPostUrl
                axios.post(url, data , config).then((response) => {this.setState({ redirect:true }); alert('Successfull'); })
                    .catch((error) => { alert(error); }
                );
            }
        }
    };
  
    handleChange = (input) => (e) => { this.setState({ [input]: e.target.value });};

    render() {
        if(this.state.redirect){
            return <Redirect push to="/landingpage" />;
        } else{
            return (
                <div className="Updatepage">
                    <div className="Updatecontainer">
                        <div style={{ height: 40 }} />
                        
                        <h1>Title :</h1>
                        <TextField className="TextField"  id="outlined-basic" label="Title" variant="outlined"
                            onChange={(event)=>{this.setState({ title: event.target.value }); }}/>
                        <div style={{ height: 20 }} />
                        
                        <h1>From :</h1>
                        <TextField className="TextField"  id="outlined-basic" label="From YYYY-MM-DD" variant="outlined"
                            onChange={(event)=>{this.setState({ eventstartatdate: event.target.value }); }}/>
                        <div style={{ height: 20 }} />
                        <TextField className="TextField"  id="outlined-basic" label="From HH:MM Use 24 hr format (UTC)" variant="outlined"
                            onChange={(event)=>{this.setState({ eventstartattime: event.target.value }); }}/>
                        <div style={{ height: 20 }} />
                        
                        <h1>To :</h1>
                        <TextField className="TextField"  id="outlined-basic" label="To YYYY-MM-DD" variant="outlined"
                            onChange={(event)=>{this.setState({ eventendatdate: event.target.value }); }}/>
                        <div style={{ height: 20 }} />
                        <TextField className="TextField"  id="outlined-basic" label="To HH:MM Use 24 hr format (UTC)" variant="outlined"
                            onChange={(event)=>{this.setState({ eventendattime: event.target.value }); }}/>
                        <div style={{ height: 40 }} />
            
                        <Button color="primary" variant="contained" onClick={(e) => this.submit(e)} className="UploadPostButton" >
                            Upload
                        </Button>
                        <div style={{ height: 20 }}/>
                    </div>
                </div>
            );
        }
    }
}

export default UploadPost;