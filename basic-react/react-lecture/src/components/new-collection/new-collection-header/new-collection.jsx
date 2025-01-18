import React from "react";
import "./new-collection.css";
import NewCollectionHeader from "./new-collection-header";
import CollectionCard from "../collection-card/collection-card.jsx";
import "./new-collection.css"
function Newcollection() {
  const cards_info = [
    {
      image:
        "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "title",
      subTitle: "sub_title",
      price: "1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "title",
      subTitle: "sub_title",
      price: "2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "title",
      subTitle: "sub_title",
      price: "3",
    },
    {
        image:
          "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "title",
        subTitle: "sub_title",
        price: "4",
      },
      {
        image:
          "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "title",
        subTitle: "sub_title",
        price: "5",
      },
  ];

  return (
    <div>
      <NewCollectionHeader />
      <div className="cards-list">
  {cards_info.map((item, index) => (
    <CollectionCard
      key={index}
      image={item.image}
      title={item.title}
      sub_title={item.subTitle}
      price={item.price}
    />
  ))}
</div>
    </div>
  );
};

export default Newcollection;
