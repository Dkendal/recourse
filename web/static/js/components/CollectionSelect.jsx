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
        className={ [
          selected.includes(item) ? "selected" : "",
          "CollectionSelect-item",
          "margin-between-h",
        ].join(" ") }
        >
        {
          selected.includes(item) ? (
            <div>
              <i className="icon icon-check"></i>
            </div>) : (
            <div>
              <i className="icon icon-check-empty"></i>
            </div>)
        }
        { render(item) }
      </div>))
    }
  </div>
);

export default CollectionSelect;
