import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

export default function App() {
  const events = [{ title: "today's event", date: new Date() }];
  console.log('test');
  return (
    <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} events={events} />
  );
}
if(document.getElementById("calendar-wrapper")) {
  ReactDOM.render(<App />, document.getElementById("calendar-wrapper"));
}