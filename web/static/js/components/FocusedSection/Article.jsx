import React from "react";
import MeetingTime from "./MeetingTime";
import Seats from "./Seats";

const Article = props => {
  return <article
    className="Tile-padded"
  >
    <dl>
      <dt>Seats</dt>
      <dd><Seats { ...props.section.seats }/></dd>
      <dt>Waitlist</dt>
      <dd><Seats { ...props.section.waitlist }/></dd>
    </dl>
    { props.meetingTimes.map(x => <MeetingTime key={x.id} { ...x }/>) }
  </article>
};

export default Article;
