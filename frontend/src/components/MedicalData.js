import { connect } from "react-redux"
import { useEffect, useState } from "react"
import patientActions from "../redux/actions/patientActions"
import Description from "./Description"

const MedicalData = (props) => {
   const [inputDescription, setInputDescription] = useState({ description: "" })
   const { name, lastName, src, dni, data, medicalData, _id } =
      props.appointment.patientId
   const [descriptions, setDescriptions] = useState(medicalData)
   const [change, setChange] = useState(false)

   console.log(props)

   const inputHandler = (e) => {
      setInputDescription({
         ...inputDescription,
         description: e.target.value,
      })
   }

   const submitHandler = () => {
      props
         .postDescription(_id, props.token, inputDescription.description)
         .then((res) => {
            setDescriptions(res.res)
         })
      setChange(!change)
      setInputDescription({ description: "" })
   }

   const pressEnter = (e) => {
      if (e.key === "Enter") {
         submitHandler()
      }
   }

   return (
      <>
         <div className="medicalData">
            <h1>HISTORIAL MÉDICO</h1>
            <h2>Paciente</h2>
            <div className="ABC">
               <div>
                  <img className="imgMD" src={src} alt="fotoPaciente" />
               </div>
               <div>
                  {" "}
                  <p>Nombre: {name}</p>
                  <p>Apellido: {lastName}</p>
                  <p>DNI: {dni}</p>
               </div>
               <div>
                  {" "}
                  <p>
                     Domicilio: {data.direction.street}
                     {data.direction.num}
                     {data.direction.city}
                  </p>
                  <p>Telefono: {data.phoneNumber}</p>
                  <p>E-mail: {data.mail}</p>
               </div>
            </div>
            <div className="DEF">
               <h2>ANOTACIONES</h2>
               <div className="descripcion">
                  {descriptions.map((description, index) => {
                     return (
                        <Description description={description} key={index} />
                     )
                  })}
               </div>
               <div>
                  <input
                     type="text"
                     name="description"
                     placeholder="Ingresar anotación"
                     onChange={inputHandler}
                     onKeyPress={pressEnter}
                  />
                  <button onClick={submitHandler}>ENVIAR</button>
               </div>
            </div>
         </div>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
      token: state.users.token,
      dataUser: state.users.dataUser,
      patients: state.patients.patients,
   }
}

const mapDispatchToProps = {
   postDescription: patientActions.postDescription,
}
export default connect(mapStateToProps, mapDispatchToProps)(MedicalData)
