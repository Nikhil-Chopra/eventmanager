import React from "react";
import {Grid}  from "@material-ui/core";

// have to add to String method

export default function DisplayPostCard({item}) {
        return(
            <div style={{padding:5}}>
                <Grid direction="row" justify="space-evenly">
                    <h5>{item.title}</h5>
                    <h6>From : {item.eventstartat.slice(0,10)}&nbsp;&nbsp;&nbsp;{item.eventstartat.slice(11,16)}</h6>
                    <h6>To : {item.eventendat.slice(0,10)}&nbsp;&nbsp;&nbsp;{item.eventendat.slice(11,16)}</h6>
                    <h6>Managed by : {item.organisermail}</h6>
                </Grid>
            </div>
        )
}

