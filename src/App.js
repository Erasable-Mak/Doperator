import React, { Component } from 'react';
import './App.css';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import { Jumbotron, Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Button, Container, Card } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.openNewPage = this.openNewPage.bind(this);
    this.fileInput = React.createRef();
  }

  renderFile = (fileObj) => {
      //pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            dataLoaded: true,
            cols: resp.cols,
            rows: resp.rows
          });
        }
      }); 
  }

  fileHandler = (event) => {    
    if(event.target.files.length){
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      
      //only .xlsx extension file uploaded else display error message otherwise
      if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
      }    
      else{
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }               
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }

  openNewPage = (chosenItem) => {
    const url = chosenItem === "github" ? "https://github.com/Erasable-Mak" : "https://mern-additional-features.herokuapp.com/";
    window.open(url, '_blank');
  }

  render() {
    return (
      <div>
        <div className="jumbotron-backgrounds">
          <Jumbotron className="jumbotron-background">  
          <div className="pp">        
              <h1 className="display-3">Doperator</h1>
              </div>
              <div className="kk">  
              <p className="lead">Welcome to Doperator, developed with react-excel-renderer.</p>  
              </div>
              <div className="pp">    
              <Button className="primary jumbotron-button"  onClick={this.openNewPage.bind(this,"github")}>GitHub</Button>{' '}
              <Button className="primary jumbotron-button" onClick={this.openNewPage.bind(this,"medium")}>Other Live Site</Button>                      
              <p>-----<span className="fa fa-heart">--------------------</span></p>
              </div>
          </Jumbotron>
        </div>
        <Container>
        <form>
        <div className="ss">
          <FormGroup row>
            <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg" style={{fontStyle: "italic"}}>Upload</Label><Label> .xlsx/.csv</Label><br/>          
            <Col xs={6} sm={8} lg={10}>                                                     
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button color="info" style={{color: "black", zIndex: 0}} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Select File Browse&hellip;</Button><br/>
                  <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event)=> { event.target.value = null }} style={{"padding":"10px"}} />                                
                </InputGroupAddon>
                <Input type="text" className="form-control" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} /> 
              </InputGroup>     
            </Col>                                                   
          </FormGroup>   
          </div>
        </form>

        {this.state.dataLoaded && 
        <div className="zz">
          <Card body outline color="secondary" className="restrict-card">
            
              <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
            
          </Card>  
        </div>}
        </Container>
      </div>
    );
  }
}

export default App; 


/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */



