import React, { useEffect } from "react";
import "./collection-card.css";

function CollectionCard({ image, title, sub_title, price }) {
 
  
return (
    <div className="collecionCardMain">
      <div
        className="collecionCardMain-img"
        style={{
          background: "url('" + image +"')" ,  // important
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="collecionCardMain-title">{title}</div>
      <div className="collecionCardMain-subtitle">{sub_title}</div>
      <div className="collecionCardMain-price">${price}</div>
    </div>
  );
}

export default CollectionCard;