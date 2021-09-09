import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";
import patientActions from "../redux/actions/patientActions";
import AppointmentDay from "../components/AppointmentDay";

const Appointment = ({doctors,getDoctors, userToken,addAppointment, getCalendar,calendar,getAppointementByDoctor}) => {
  const [newDoctors, setNewDoctors] = useState(doctors)
  const [newCalendar, setNewCalendar] = useState(calendar)
  const [docName, setDocName] = useState(null)
  const [diaryByDoc, setDiaryByDoc]= useState([])
  const [confirmAppointment, setConfirmAppointment] = useState('')
  const [views, setViews] = useState({view:false, confirm:false, ok:false})
  const [appointmentReady, setAppointmentReady] = useState({
    date: {
      hour: "",
      date: "",
    },
    doctorId: "",
    patientId: "",
  });
  useEffect(() => {
      window.scroll(0, 0)
      if(!doctors.length){
        getDoctors()
        .then(res=>{
          if(res.success){
            setNewDoctors(res.res)
          }
        })
      }
      if(!calendar.length){
        getCalendar()
        .then(res=>{
          if(res.success){
            setNewCalendar(res.res)
          }else{
            console.log(res.res)
          }
        })
      }
  }, []);

  const appointmentValueHandler = (e) => {
    if(!e.target.value){
      setViews({...views, view:false, ok:false})
    }else{
      !views.view && setViews({...views, view:true, ok:false})
      setAppointmentReady({...appointmentReady, [e.target.name]:e.target.value})
      getAppointementByDoctor(e.target.value)
      .then(res=> setDiaryByDoc(res.res))
      setDocName(newDoctors.find(obj => obj._id === e.target.value))
    }
  }
  const bookAppointmentHandler=(hour,day)=>{
    setAppointmentReady({...appointmentReady,
      date: {
      hour: hour,
      date: day,
      },
      patientId: userToken,
    })
    setViews({...views, confirm:true, ok:false})
  }
  const optionDoctor = newDoctors.map(obj => <option key={obj._id} value={obj._id}>{obj.name} {obj.lastName}</option>)
 
  const inputDay = newCalendar.map(obj =>{
    const appointmentByDay = !diaryByDoc.length ? [] : diaryByDoc.filter(diary=>diary.date.date === obj.day)
    return(
      <AppointmentDay key={obj._id} day={obj.day} docName={`${obj.name} ${obj.lastName}`} fullDay={appointmentByDay.length === 18} appointmentByDay={appointmentByDay} bookAppointmentHandler={bookAppointmentHandler} timeTable={obj.timeTable}/>
    )
  })
  const confirmAppointmentHandler =(data)=>{
    addAppointment(data)
    .then(res=>{
      if(res.success){
        setViews({...views, confirm:false, ok:true})
        setConfirmAppointment('Tu turno fue agendado exitosamente. ¡Gracias!')
      }else{
        setViews({...views, confirm:false, ok:true})
        setConfirmAppointment('Lo sentimos, ha ocurrido un error. Por favor, intentá de nuevo más tarde.')
      }
      setTimeout(() => {
        setViews({...views,confirm:false, ok:false})
      }, 3000);
    })
  }
  return (
    <>
      <div className="container">
        <div className="signUpForm">
        <img src="/assets/appointment.png" alt="" />
        <h3>
          ¡Bienvenido! Antes de solicitar un turno, por favor elija el
          profesional.
        </h3>
        <form>
          <select id="optionDoctor" name="doctorId"
            defaultValue={appointmentReady.doctorId}
            onChange={appointmentValueHandler}
          >
            <option value="" >Seleccioná un profesional</option>
            {optionDoctor}
          </select>
        </form>
        {views.ok && <h2>{confirmAppointment}</h2>}
        {views.confirm && 
          <div>
            <h3>Confirmación de turno</h3>
            <p>Profesional: {docName.name} {docName.lastName}</p>
            <p>Día: {appointmentReady.date.date}</p>
            <p>Hora: {appointmentReady.date.hour}</p>
            <img className='iconTurn'  src='/assets/cross.png' alt='edit' onClick={()=>setViews({...views, confirm:false})}/>
            <img className='iconTurn'  src='/assets/check.png' alt='edit' onClick={()=>confirmAppointmentHandler(appointmentReady)}/>
          </div>}
        {views.view && <div className="container2" >{inputDay}</div>}
        {!views.view && <div>
          <h3 className="avisador">Los turnos que verás por doctor, son los disponibles.</h3>
          <h3>Protocolo COVID:</h3>
          <h4>Cuidémonos entre todos.</h4>
          <p>Por favor, asistir sólo con turno previamente acordado y ante cualquier síntoma, solicitá la reprogramación.</p></div>}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.doctors,
    userToken: state.users.token,
    calendar:state.patients.calendar
  };
};

const mapDispatchToProps = {
  getDoctors: doctorActions.getDoctors,
  getCalendar:patientActions.getCalendar,
  getAppointementByDoctor:doctorActions.getAppointementByDoctor,
  addAppointment:patientActions.addAppointment
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
