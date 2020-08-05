import React from 'react';
import {Button} from 'react-dom';
import './App.css';
//import Modal from './component/ListModal';
//import BootstarpModal from './component/BootStrap';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      list:[],
      show: false,
      detail:[]
    }
   // this.showModal = this.showModal.bind(this);
    }
    showModal = name => e => {
      this.setState({ show: true });
      console.log(name);
      fetch(`http://localhost:3000/members/${name}`)
        .then((response) =>{
          response.json().then((result) => {
              console.log("onclick rasult", result);
            this.setState({detail : result.activity_periods})
          })
        });
    }
    
    hideModal = () => {
      this.setState({ show: false });
    }

  componentDidMount(){
    fetch('http://localhost:3000/members')
    .then((response) =>{
      response.json().then((result) => {
        this.setState({list : result})
      })
    });
  }
   
  render(){
      return(
          <main className="main" >
            <Modal show={this.state.show} handleClose={this.hideModal} >
              <div className="modal-header"><h3>USER DETAIL</h3></div>
            { 
                    this.state.list?
                        this.state.detail.map((item, index) => 
                        <tr key={index}>
                        <td ><p> <strong>Start Time :</strong>{item.start_time}</p></td>
                        <td><p style={{marginLeft:"4%", }}><strong>End Time :</strong> {item.end_time}</p></td>
                    </tr>
                    
                        )
                        
                        :
                        <div></div>
                }
            </Modal>
            <div className="main-screen">
            <h1>USER LIST</h1>
            { 
         this.state.list?
             this.state.list.map((item, index) => 
             <tr key={index} >
             <td className="tr-view" >{item.real_name}</td>
             <td >{" "} - {" "}</td>
            <td>
            <button type='button' 
            className="btn"
             onClick={this.showModal(item.id)}>Detail</button>
            </td>
           </tr>
              )
              :
              <div></div>
         
        }
            </div>
          </main>
        )
      }
    }
    
    const Modal = ({ handleClose, show, children }) => {
      const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    
      return (
        <div className={showHideClassName}>
          <section className='modal-main'>
            {children}
            <button
              onClick={handleClose}
              className="btn"
            >
              Close
            </button>
          </section>
        </div>
      );
}

export default App;
