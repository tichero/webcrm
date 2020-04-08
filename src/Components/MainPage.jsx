import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { format, parse } from "date-fns";
import Calendar from "react-calendar/dist/entry.nostyle";
import AreaNotes from "./AreaNotes";
import CodeScanner from "./CodeScanner";
import {isToday} from "../App";
import { fetchPersons } from "../store/personsDataStore/personsDataActions";
import { fetchDays } from "../store/dayDataStore/dayDataActions";
import { fetchVisits } from "../store/activitiesDataStore/activitiesDataActions";


import TableForScanner from './TableForScanner';
import Spinner from './Spinner';



export const MainPage = props => {
  // const personData = useSelector(state => state.personsStore.data);
  // const dayData = useSelector(state => state.dayStore.data);
  const loadingPersons = useSelector(state => state.personsStore.loading);
  const loadingDays = useSelector(state => state.dayStore.loading);
  const loadingActivities = useSelector(state => state.activitiesStore.loading);
  const notesValue = useSelector(state => state.dayStore.data.notes);

  const dispatch = useDispatch();


  const history = useHistory();
  const [loadedDate, setLoadedDate] = useState(
    format(new Date(), "dd-MM-yyyy")
  );

  useEffect(() => {
    dispatch(fetchVisits(loadedDate));
    dispatch(fetchPersons());
    dispatch(fetchDays(loadedDate));
  }, [dispatch, loadedDate]);

  const changeLoadDate = date => {
    setLoadedDate(format(date, "dd-MM-yyyy"))
    dispatch(fetchDays(loadedDate));
    dispatch(fetchVisits(loadedDate));
  };

  return (!loadingDays && !loadingPersons && !loadingActivities) ? (
    <>
      <div className="mainPage">
        <Calendar
          className="calendar calendarMain"
          value={parse(loadedDate, "dd-MM-yyyy", new Date())}
          onChange={date => changeLoadDate(date)}
        />
        <div className="notesMain font-white-shadow">
          <AreaNotes type="DAY_DATA" notesValue={notesValue} date={loadedDate} />
        </div>
        {isToday(loadedDate) ? (
          <>
            <CodeScanner divName="newProfileField" route={history} type="PROFILE" />
            <CodeScanner divName="newCodeField" type="SCANNER" />
          </>
        ) : (
            undefined
          )}
      </div>
      <TableForScanner />
    </>
  ) : <Spinner />

};


export default MainPage;


// return (!loadingDays && !loadingPersons) ? (
  //   <>
  //       <div className="notesMain font-white-shadow">
  //         <AreaNotes notesValue={data?.notes} type="DAY_DATA" dayObject={data} />
  //       </div>
  //       <div className="newProfileField">
  //         <FormData
  //           baseValue=""
  //           formLabel="Новый профиль:"
  //           type="NEW_PERSON"
  //           route={history}
  //         />
  //       </div>
  //       {isToday(loadedDate) ? (
  //         <div className="newCodeField">
  //           <CodeScanner dayObject={data} date={loadedDate} />
  //         </div>
  //       ) : (
  //           undefined
  //         )}
  //     </div>
  //     <TableForScanner data={dayData[indexDate]} />
  //   </>
  // ) : <Spinner />