import React from 'react';

function Head(props:any){//Head
    return(
        <div>
        <h1  className = "text-center">{props.heading}</h1>    
        </div>
    );
}

export default Head;
