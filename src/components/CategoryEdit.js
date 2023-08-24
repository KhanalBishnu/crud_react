import axios from "axios";
import React, { useState } from "react";
import { LiaEdit } from 'react-icons/lia';
import Swal from "sweetalert2";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const CategoryEdit = ({ id, getCategories, categoryData }) => {
  const [name, setName] = useState(categoryData.name);
  const [description, setDescription] = useState(categoryData.description);
  const [responseMessage, setResponseMessage] = useState('');
  const [modal, setModal] = useState(false);

 const toggle=()=>setModal(!modal);

  const handleEditForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/category/update`, {
        name: name,
        description: description,
        id: id,
      });
      setResponseMessage(response.data.message);

      // Refresh categories
      if (response.status === 200) {
        getCategories();
        toggle(); // Hide the modal
        Swal.fire({
          title: 'Success...',
          text: 'Successfully Update Category',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <>
      <LiaEdit className='text-primary fs-4'  onClick={toggle} />

    
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <form onSubmit={handleEditForm}>
                <div className='fluid-container'>
                  <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                      <label htmlFor='name' className='form-label'>Name</label> <br />
                      <input type="text" name='name' className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='col-md-12 col-sm-12'>
                      <label htmlFor='description' className='form-label'>Description</label> <br />
                      <input type="text" name='description' className='form-control'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className='col-md-12 col-sm-12 mt-4'>
                      <button type="submit" className='btn btn-primary float-end btn-sm'>Update</button>
                    </div>
                  </div>
                </div>
              </form>
        </ModalBody>
        
      </Modal>
    </>
  );
};

export default CategoryEdit;







