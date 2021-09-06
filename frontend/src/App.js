import "./App.css"
import Home from "./pages/Home"
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignUpPat from "./components/SignUpPat"
import DoctorInformation from './components/DoctorInformation'
import Staff from "./pages/Staff"
import SignUpDoc from "./components/SignUpDoc"
// import { connect } from "react-redux";
// import {useEffect} from "react"


const App = () => {

  // useEffect(()=>{
  //   if (localStorage.getItem("token"){
  //       props.logWithLs(localStorage.getItem("token"))
  //   })
  // }, [])


  return (
      <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/signup' component={SignUpPat}/>
            <Route path="/staff" component={Staff} />
            <Route path="/information" component={DoctorInformation} />
            <Route path="/editdoc" component={SignUpDoc} />
          </Switch>
        <Footer />
      </BrowserRouter>
  )
}

export default App
