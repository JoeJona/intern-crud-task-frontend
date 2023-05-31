import React, {useState, useEffect} from "react";
import "../App.css";
import "./all-user.css";
import Axios from 'axios';

function AllUser() {

  const localHost = 'http://localhost:5000';
  const deployHost = 'https://intern-crud-task-backend-production.up.railway';

  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [allUserList, setAllUserList] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbbies] = useState("");
  let usersList = [];
  
  const showFormToggle = () => {
      setShowForm(!showForm);
    }
  
  const showUpdateFormToggle = () => {
    setShowUpdateForm(!showUpdateForm);
    }

  const deleteUserConfirm = () => {
    setDeleteConfirm(!deleteConfirm);
  }
    
  useEffect(() => {
      Axios.get(`${localHost}/get-all-users`).then((res) => {
          setAllUserList(res.data);
        });
    }, []);
    
  const saveNewUser= () => {
      Axios.post(`${localHost}/add-user`, {name: name, phoneNumber: phoneNumber, email: email, hobbies: hobbies});
        setShowForm(!showForm);
        window.location.reload();
      }
  
   const updateUser = (id) => {
      Axios.put(`${localHost}/update-user/${id}`, {name: name, phoneNumber: phoneNumber, email: email, hobbies: hobbies});
      setShowUpdateForm(!showUpdateForm);
      window.location.reload();
    }

  const deleteUser = (id) => {
      Axios.delete(`${localHost}/delete-user/${id}`);
      setDeleteConfirm(!deleteConfirm);
      window.location.reload();
      }
  
  const getSelectedUsers = () => {
      if (usersList.length > 0) {
        Axios.post(`${localHost}/send-email`, {userList: usersList});
        usersList = [];
        window.location.reload();
      }
    }

  return (
    <>
     <div className="container">
        <button className="new_user_btn" onClick={showFormToggle}>Add New User</button>
        {showForm && (
            <div className="add_form">
            <button className="close" onClick={showFormToggle}>X</button>
            <form onSubmit={saveNewUser}>
            <h2>Add New User</h2>
                <div className="que">
                <label htmlFor="">Name</label>
                <input required type="text" onChange={(event) => {setName(event.target.value)}} />
                </div>
                <div className="que">
                <label htmlFor="">Phone Number</label>
                <input required type="text" onChange={(event) => {setPhoneNumber(event.target.value)}} />
                </div>
                <div className="que">
                <label htmlFor="">Email</label>
                <input required type="email" onChange={(event) => {setEmail(event.target.value)}} />
                </div>
                <div className="que">
                <label htmlFor="">Hobbies</label>
                <input required type="text" onChange={(event) => {setHobbbies(event.target.value)}} />
                </div>
                <button className="save" type="submit">Save</button>
            </form>
        </div>
        )}
        <table>
          <thead>
            <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Hobbies</th>
                <th>Action</th>
            </tr>
            </thead>
            {allUserList.map((user, key) => {
            return <tbody key={key}><tr>
                    <td>
                        <input type="checkbox" id="sel_row" onChange={() => {usersList.push(user._id); console.log(usersList);}}/>
                    </td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>{user.hobbies}</td>
                    <td>
                    <button className="update_user_btn" onClick={() => {
                      setId(user._id);
                      setName(user.name);
                      setPhoneNumber(user.phoneNumber);
                      setEmail(user.email);
                      setHobbbies(user.hobbies);
                      showUpdateFormToggle();
                    }}>Update</button>
                    {showUpdateForm && (
                    <div className="add_form">
                    <button className="close" onClick={() => {
                      setId('')
                      setName('');
                      setPhoneNumber('');
                      setEmail('');
                      setHobbbies('');
                      showUpdateFormToggle();
                    }}>X</button>
                    <form onSubmit={() => {updateUser(id)}}>
                    <h2>Update User</h2>
                        <div className="que">
                        <label htmlFor="">Name</label>
                        <input required type="text" value={name} onChange={(event) => {setName(event.target.value)}} />
                        </div>
                        <div className="que">
                        <label htmlFor="">Phone Number</label>
                        <input required type="text" value={phoneNumber} onChange={(event) => {setPhoneNumber(event.target.value)}} /><br />
                        </div>
                        <div className="que">
                        <label htmlFor="">Email</label>
                        <input required type="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                        </div>
                        <div className="que">
                        <label htmlFor="">Hobbies</label>
                        <input required type="text" value={hobbies} onChange={(event) => {setHobbbies(event.target.value)}} />
                        </div>
                        <button className="save" type="submit">Update</button>
                    </form>
                    </div>
                    )}
                    <button className="delete_user_btn" onClick={() => {
                      setId(user._id);
                      deleteUserConfirm(); 
                      }}>Delete</button>
                    {deleteConfirm && (
                    <div className="delete_confirm">
                    <h2>Delete User</h2>
                        <h3 className="sp">Are You Sure You Want To Delete This</h3>
                        <div className="conf">
                          <button className="save" onClick={() => {deleteUser(id)}}>YES</button>
                          <button className="save" onClick={deleteUserConfirm}>NO</button>
                        </div>
                    </div>
                    )}
                    </td>
            </tr></tbody>
            })}
        </table>
        <div className="send-div">
        <h3 className="send-h3">Send Seletcted row</h3>
        <button className="send" onClick={() => getSelectedUsers()}>Send</button>
        </div>
     </div>
    </>
  );
}

export default AllUser;
