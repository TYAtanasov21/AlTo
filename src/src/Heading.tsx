import React from 'react';

function Head(props:any){
    return(
        <div>
        <h1  className = "text-center">{props.heading}</h1>    
        </div>
    );
}

export default Head;
