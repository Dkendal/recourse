import React from "react";
import classnames from "classnames";
import  "css/components/CollectionSelect";

const Item = ({ onClick, isSelected, item, children }) => (
  <div
    onClick={() => onClick(item)}
    style={{ display: 'flex' }}
    className={ classnames(
      "CollectionSelect-Item",
      "Tile-padded",
      "margin-between-h",
      { selected: isSelected,
      })
    }
  >
    <div className="icon-gutter">
      { (isSelected
        ? <i className="icon icon-check"></i>
        : <i className="icon icon-check-empty"></i>)
      }
    </div>
    { children }
  </div>
);

const CollectionSelect = ({className="", collection, selected, render, onClick}) => (
  <div className={ classnames(className, "CollectionSelect") }>
    { collection.map((item, idx) => <Item
      item={ item }
      key={ idx }
      onClick={ onClick }
      isSelected={ selected.includes(item) }>
      { render(item) }
    </Item>)}
  </div>
);

export default CollectionSelect;
