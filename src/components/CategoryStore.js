import axios from 'axios';
import React, { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';

const CategoryStore = (props) => {
  // for store
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  //   for validation 
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [modal, setModal] = useState(false);



  const validateForm = () => {
    let isValid = true;

    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (description.trim() === '') {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    return isValid;
  };

  const toggle = () => (setModal(!modal));



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/category/store', {
        name: name,
        description: description,
      });

      setResponseMessage(response.data.message);
      if (response.status === 200) {
        props.getCategory();
        setModal(false);
        Swal.fire({
          title: 'Success...',
          text: 'Successfully added Category',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    // <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //   <div className="modal-dialog">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title" id="exampleModalLabel">Category Add</h5>
    //         <button type="button" className="btn btn-danger  btn-sm" data-bs-dismiss="modal" aria-label="Close">X</button>
    //       </div>
    //       <div className="modal-body">
    //         <form onSubmit={handleSubmit}>
    //           <div className='fluid-container'>

    //             <div className='row'>
    //               <div className='col-md-12 col-sm-12'>
    //                 <label htmlFor='name' className='form-label'>Name</label> <br />
    //                 <input type="text" name='name' className='form-control' 
    //                  value={name}
    //                  onChange={(e) => setName(e.target.value)}
    //                  />
    //                  {nameError && <p className="text-danger">{nameError}</p>}

    //               </div>
    //               <div className='col-md-12 col-sm-12'>
    //                 <label htmlFor='description' className='form-label'>Description</label> <br />
    //                 <input type="text" name='description' className='form-control' 
    //                    value={description}
    //                    onChange={(e) => setDescription(e.target.value)}
    //                 />
    //                 {descriptionError && <p className="text-danger">{descriptionError}</p>}

    //               </div>
    //               <div className='col-md-12 col-sm-12 mt-4'>
    //               <button type="submit" className='btn btn-primary float-end btn-sm'>Submit</button>
    //               </div>
    //             </div>
    //           </div>
    //         </form>
    //         {responseMessage && <p>Response: {responseMessage}</p>}
    //       </div>

    //     </div>
    //   </div>
    // </div>
    <div>
    <span > 
             
             {/* <Button color="danger" onClick={toggle} className=' btn btn-sm'> */}
             <AiFillPlusCircle fontSize="35px" className='text-warning ' onClick={toggle}  />
         {/* </Button> */}
             </span>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Update Modal</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className='fluid-container'>

              <div className='row'>
                <div className='col-md-12 col-sm-12'>
                  <label htmlFor='name' className='form-label'>Name</label> <br />
                  <input type="text" name='name' className='form-control'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {nameError && <p className="text-danger">{nameError}</p>}

                </div>
                <div className='col-md-12 col-sm-12'>
                  <label htmlFor='description' className='form-label'>Description</label> <br />
                  <input type="text" name='description' className='form-control'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {descriptionError && <p className="text-danger">{descriptionError}</p>}

                </div>
                <div className='col-md-12 col-sm-12 mt-4'>
                  <button type="submit" className='btn btn-primary float-end btn-sm'>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  )
}

export default CategoryStore