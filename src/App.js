import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



class App extends Component {
   
  constructor(props){
    super(props)
    this.state={
      datos: [],
      modalInsertar: false,
      form: {
         id: '',
         nombre: '',
         pais: '',
         capital: ''
      }
    }
  }  
  
 peticionGet= () =>{
  axios.get('http://localhost:3001/empresas')
   .then(response =>{
    this.setState({
      datos: response.data
    });
   }).catch(error=>{
     console.log(error.message);
   })
 }

 peticionPost=async () =>{
  delete this.state.form.id
   await axios.post('http://localhost:3001/empresas', this.state.form)
   .then(response =>{
     this.modalInsertar();
     this.peticionGet();
   }).catch(error=>{
    console.log(error.message);
  })
   
 }



 modalInsertar= ()=>{
  this.setState({
   modalInsertar: !this.state.modalInsertar
  })
 }

 handleChange=async(e)=>{
  e.persist();
  await this.setState({
    form:{
      ...this.state.form,
     [e.target.name]: e.target.value
    }
  })
  console.log(this.state.form)
 }

  componentDidMount (){
    this.peticionGet();
  }


  render(){
     const datosForm = this.state.form;
     const daticos = this.state.datos;
     console.log(daticos)
    return (
      <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>this.modalInsertar()} >Agregar Empresa</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>País</th>
          <th>Capital Bursatil (en millones de USD)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {daticos.map(empresa=>{
          return(
            <tr>
          <td>{empresa.id}</td>
          <td>{empresa.nombre}</td>
          <td>{empresa.pais}</td>
          <td>{empresa.capital_bursatil}</td>
          <td>
                <button className="btn btn-primary" >Editar</button>
                {"   "}
                <button className="btn btn-danger" >Eliminar</button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>

    <Modal isOpen={this.state.modalInsertar} >
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()} >x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={daticos.length+ 1} />
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={datosForm.nombre} />
                    <br />
                    <label htmlFor="nombre">País</label>
                    <input className="form-control" type="text" name="pais" id="pais" onChange={this.handleChange} value={datosForm.pais} />
                    <br />
                    <label htmlFor="capital_bursatil">Capital Bursatil</label>
                    <input className="form-control" type="text" name="capital" id="capital" onChange={this.handleChange} value={datosForm.capital}/>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-success" onClick={()=>this.peticionPost()} >
                    Insertar
                  </button>
                  <button className="btn btn-danger" onClick={()=>this.modalInsertar()} >Cancelar</button>   
                </ModalFooter>
          </Modal>



    </div>
    );
    
  }
  
}


export default App;