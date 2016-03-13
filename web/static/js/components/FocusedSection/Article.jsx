import React from "react";
import MeetingTime from "./MeetingTime";

const Article = props => (
  <article
    className="Tile-padded"
  >
    { props.meetingTimes.map(x => <MeetingTime key={x.id} { ...x }/>) }
  </article>
);

export default Article;
