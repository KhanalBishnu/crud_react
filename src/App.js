import React, { useEffect, useState } from 'react';
import Header from "./components/header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import CategoryDataShow from './components/CategoryDataShow';
import CategoryStore from './components/CategoryStore';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from 'reactstrap';


function App() {
  const [data, setData] = useState(null)
  const [searchData, setsearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);


  const getCategories = () => {

    axios.get('http://127.0.0.1:8000/api/category').then(res => {
      console.log(res);
      setData(res.data.categories)
      setsearchData(res.data.categories)
      setLoading(false)
    })
  };

  const toggle = () => (setModal(!modal));

  const searchFilter = (e) => {
    let search = e.target.value;
    if (search === '') {
      setsearchData(data); // Reset search results to show all data
    } else {
      const filterItems = data.filter((ele) =>
        ele.name.toLowerCase().includes(search.toLowerCase())
      )
      setsearchData(filterItems);
    }
  }

  useEffect(() => {

    getCategories()
  }, []);

  return (
    <>

      {/* < Header /> */
      /* <Routes>
        <Route path="/" element={< Home />} />
        <Route path="about" element={ <About/>} />
        <Route path="contact" element={ < Contact />} />
      </Routes> */}
      <div className='fluid-container'>
        <div className="row justify-content-evenly ">

          <div className="bg-dark text-white d-flex justify-content-center align-items-center w-75  mt-2">
            <h3>FireBase Contact App</h3>
          </div>
        </div>
        <div className="row justify-content-end align-items-center  ">
          <div className="w-50  position-relative mt-4 justify-content-center ">
            <span className='position-absolute px-2 text-center pt-1'> <BsSearch fontSize="20px" /></span> <input onChange={searchFilter} type="search" className='px-5  w-50 py-1' />
            
            <CategoryStore getCategory={getCategories} /> 
          </div>
        </div>
        <div className='row  justify-content-around m-3 position-relative' style={{ height: '200px', width: '100%' }}>
          {loading ? (
            <div className='d-flex position-relative justify-content-center align-items-center '>

              <ThreeDots type="ThreeDots" color="#00BFFF" height={80} width={80} className="position-absolute top-50 start-50 translate-middle" />
             </div>
          ) : (
            <CategoryDataShow data={searchData} getCategory={getCategories} />
          )}
        </div>


        {/* <CategoryDataShow  data={searchData} getCategory={getCategories} /> */}

        {/* <div className='col-md-4 col-sm-3 w-25 border border-primary'>
            <h1>test</h1>
            <p>desvf</p>
          </div>
          <div className='col-md-4 col-sm-3 w-25 border border-primary'>
            <h1>test</h1>
            <p>desvf</p>
          </div> */}
      </div>


    </>
  );
}

export default App;
