import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Article from "./Article";
// import "css/components/FocusedSection";

const FocusedSection = props => (
  <section
    className={ `FocusedSection Tile ${props.className}` }
    style={{
      display: 'flex'
    }}
  >
    <div style={ { flex: 1 } }>
      <Header { ...props }/>
      <Article { ...props }/>
      <Footer { ...props }/>
    </div>

    <button onClick={ props.hideFocusedSection }>
      <i className="icon-cancel"></i>
    </button>
  </section>
);

export default FocusedSection;
