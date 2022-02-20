import React from 'react'; 

const Post = (props) => { 
  
  return ( 
    
    <div> 
    
      <h1>
        {props.title}
      </h1> 
      
      <p>
        {props.body}
      </p> 
      
    </div> 
    
  ); 
  
}; 

export {Post};