import React from 'react';
import './App.scss';

import Header from "./components/Header";

import CustomerForm from "./components/CustomerForm";
import WorkerForm from "./components/WorkerForm";
import ManagerForm from "./components/ManagerForm";


function App() {
  return (
    <div className="app">
        <Header/>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <CustomerForm/>
                </div>
                <div className="col-md-4">
                    <WorkerForm/>
                </div>
                <div className="col-md-4">
                    <ManagerForm/>
                </div>
            </div>
            {/*<div className="row">
                <div className="col-md-1"/>
                <div className="col-md-4" id="menuContentPanel">
                    <StoreList/>
                    <CategoryList/>
                    <RatingList/>
                    <button className="btn btn-warning" onClick={()=>{MovieActions.showMovieForm()}}>Add Movie</button>
                </div>
                <div className="col-md-6" id="mainContentPanel">

                </div>
                <div className="col-md-1"/>
            </div>*/}
        </div>
    </div>
  );
}

export default App;
