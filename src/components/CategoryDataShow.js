import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import CategoryEdit from './CategoryEdit';
import Swal from 'sweetalert2';

const CategoryDataShow = ({ data, getCategory }) => {
    // const deleteCategory = (id) => {

    //     // Show confirmation dialog
    //    // Show confirmation dialog
    // const result =  Swal.fire({
    //     title: 'Delete Category?',
    //     text: 'Are you sure you want to delete this category?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes, delete it!',
    //     cancelButtonText: 'Cancel'
    //   });

    //     if (result.isConfirmed) {
    //         // If user confirms, delete data
    //         axios.get(`http://127.0.0.1:8000/api/category/delete/${id}`).then(res => {
    //             console.log(res)
    //             if (res.status == 200) {
    //                 getCategory();
    //             }
    //         })
    //     }
    // } 
    // search 

        const deleteCategory = async (id) => {
          const result = await Swal.fire({
            title: 'Delete Category?',
            text: 'Are you sure you want to delete this category?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm!',
            cancelButtonText: 'Cancel'
          });
      
          if (result.isConfirmed) {
            try {
              const response = await axios.get(`http://127.0.0.1:8000/api/category/delete/${id}`);
              console.log(response);
              if (response.status === 200) {
                getCategory();
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
              } else {
                Swal.fire('Error', 'An error occurred while deleting the category.', 'error');
              }
            } catch (error) {
              console.error('Error deleting data:', error);
              Swal.fire('Error', error);
            }
          }
        };

        if (!data) {
            // Return a placeholder or a message when data is null
            return <p>No data available.</p>;
        }
        return (
            <>
            <table className='table table-stripted table-bordered'>
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((element,i) => (

                    <tr>
                        <td>{i+1}</td>
                        <td>{element.name}</td>
                        <td>{element.description}</td>
                        <td>

                        <CategoryEdit id={element.id} categoryData={element} getCategories={() => getCategory()} />
                        <AiFillDelete onClick={() => deleteCategory(element.id)} className='text-danger fs-4' />
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
                {/* {data.map((element) => (

                    <div key={element.id} className='col-md-4 col-sm-3 w-25 border border-primary p-3 m-4'>
                        <h1>{element.name}</h1>
                        <p>{element.description}</p>
                        <div className='d-flex justify-content-end'>
                        </div>
                    </div>
                ))} */}
            </>
        )
    }

export default CategoryDataShow

