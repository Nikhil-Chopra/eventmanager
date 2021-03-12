import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayPostCard from "./DisplayPostCard";
import * as AllPostsLink from "../Constant";
import './LandingPage.css'
import {Grid}  from "@material-ui/core";

const LandingPage = () => {
    const [itemsFuture, setItemsFuture] = useState([]);
    const [itemsPresent, setItemsPresent] = useState([]);
    const [itemsPast, setItemsPast] = useState([]);
    const [loading, setLoading] = useState(true);  // true

    const urlPresent = AllPostsLink.Link.baseUrl.PresentPostUrl;
    const urlPast = AllPostsLink.Link.baseUrl.PastPostUrl;
    const urlFuture = AllPostsLink.Link.baseUrl.FuturePostUrl;

    useEffect(() => {
        const AxiosPresent = axios.create({ baseURL:urlPresent, headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },});
        const AxiosPast = axios.create({ baseURL:urlPast, headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },});
        const AxiosFuture = axios.create({ baseURL:urlFuture, headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },});
        const fetchData = async () => {
            try {
                const resultPresent = await AxiosPresent.get(); setItemsPresent(resultPresent.data);
                const resultPast = await AxiosPast.get(); setItemsPast(resultPast.data);
                const resultFuture = await AxiosFuture.get(); setItemsFuture(resultFuture.data);
                setLoading(false);
            } catch (e) {
                alert(e);
            }
        };
        fetchData();
    },);

    return loading ? (<h1> Loading... </h1>) : (
    <Grid container className="MainContainer" >
        <br></br>
        <Grid item xs={12} >
            <section className="cards">
                <h1 style={{ color: "white",paddingTop:"20px" }}><b> Event List </b></h1>
                <div style={{ height: 20 }}/>
                <h1>Currently ongoing events</h1>
                {itemsPresent.map((item)=>(<DisplayPostCard key={item._id} item={item} style={{marginBottom:"20px"}}></DisplayPostCard>))}
                <br></br>
                <div style={{ height: 20 }}/>
                <h1>Future events</h1>
                {itemsFuture.map((item)=>(<DisplayPostCard key={item._id} item={item} style={{marginBottom:"20px"}}></DisplayPostCard>))}
                <br></br>
                <div style={{ height: 20 }}/>
                <h1>Past events</h1>
                {itemsPast.map((item)=>(<DisplayPostCard key={item._id} item={item} style={{marginBottom:"20px"}}></DisplayPostCard>))}
            </section>
        </Grid>
    </Grid>
  );
};

export default LandingPage;
