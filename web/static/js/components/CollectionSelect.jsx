import React from "react";
import  "css/components/CollectionSelect";

const CollectionSelect = ({className="", collection, selected, render, onClick}) => (
  <div
    className={className + " CollectionSelect"}
    >
    { collection.map((item, idx) => (
      <div
        key={idx}
        onClick={() => onClick(item)}
        style={ { display: 'flex' } }
        className={ [
          selected.includes(item) ? "selected" : "",
          "CollectionSelect-item",
          "Tile-padded",
          "margin-between-h",
        ].join(" ") }
        >
        <div className="icon-gutter">
          {
            selected.includes(item) ? (
              <i className="icon icon-check"></i>
              ) : (
              <i className="icon icon-check-empty"></i>
              )
          }
        </div>
        { render(item) }
      </div>))
    }
  </div>
);

export default CollectionSelect;
