// var lastElementEndTime = Number;
// return (
// element && element && <div
//     key={element.width + index + element.backgroundColor}
//     className="grid-row"
//     onMouseUp={(e) => this.mouseUpHandler(e)}
//     onMouseDown={(e) => this.mouseDownHandler(e)}
//     onPointerMoveCapture={(e) => this.mouseEvent(e)}
//     id={`row-${index}-spaceID-${element.spaceID}`}
//     style={{width: element.width, height: 576}}>
//         {/* {
//             element.reservations.map((reservation, resIndex) => {
//                 if(reservation.date == this.props.currentDate && reservation.starttime < reservation.endtime) {
//                     var start = reservation.starttime.split(":")
//                     var end = reservation.endtime.split(":")
//                     var cardMarginTop = resIndex == 0 ? ((start[0] -8) * 36) + (Math.round(start[1] / 15) * 9) : ((start[0] * 4 + Math.round(start[1] / 15)) - (lastElementEndTime.split(":")[0] * 4 + Math.round(lastElementEndTime.split(":")[1] / 15))) * 9
//                     var cardHeight = ((((end[0] - start[0]) * 4) + ((Math.round(end[1]) - Math.round(start[1])) / 15)) * 9) - 1
//                     lastElementEndTime = `${end[0]}:${end[1]}`;
//                     if(cardHeight < 577) {
//                         return (
//                             <div className="reservation-card d-flex flex-column justify-content-around align-items-center" key={element.width + resIndex} style={{marginTop: cardMarginTop + 1, width: element.width, backgroundColor: element.backgroundColor, height: cardHeight}}>
//                                 <span style={{fontSize: '0.6vw'}}>{reservation.title}</span>
//                                 <span style={{fontSize: '0.6vw'}}>{reservation.starttime} - {reservation.endtime}</span>
//                             </div>
//                         )
//                     }
//                 }
//             })

//         } */}
// </div>
// )
// })
// }