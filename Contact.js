import axios from "axios";
import { useEffect, useState } from "react";

function Contact() {

const [id, setId] = useState("");
const [First_name, setFName] = useState("");
const [Last_name, setLName] = useState("");
const [contact, setUsers] = useState([]);
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {
    
    const result = await axios.get("https://localhost:7195/api/Contact/GetContact");
    setUsers(result.data);
    console.log(result.data);
  }
 
  async function save(event) {
   
    event.preventDefault();
    try {
      await axios.post("https://localhost:7195/api/Contact/AddContact", {
        
        First_name: First_name,
        Last_name: Last_name,
       
      });
      alert("Contact Added Successfully");
          setId("");
          setFName("");
          setLName("");
       
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editContact(contact) {
    setFName(contact.First_name);
    setLName(contact.Last_name);
   
 
    setId(contact.id);
  }
 

  async function DeleteContact(id) {
  await axios.delete("https://localhost:7195/api/Contact/DeleteContact/" + id);
   alert("Contact deleted Successfully");
   setId("");
   setFName("");
   setLName("");
   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {

  await axios.patch("https://localhost:7195/api/Contact/UpdateContact/"+ contact.find((u) => u.id === id).id || id,
        {
        id: id,
        First_name: First_name,
        Last_name: Last_name,

        }
      );
      alert("Contact Updated!!!");
      setId("");
      setFName("");
      setLName("");
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

    return (
      <div>
        <h1>Contact Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <label>First Name</label>
            <input
              type="text"
              class="form-control"
              id="First_name"
              value={First_name}
              onChange={(event) => {
                setFName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input
              type="text"
              class="form-control"
              id="Last_name"
              value={Last_name}
              onChange={(event) => {
                setLName(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Add Contact
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Contact Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
         
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        {contact.map(function fn(contacts) {
          return (
            <tbody>
              <tr>
                <th scope="row">{contacts.id} </th>
                <td>{contacts.First_name}</td>
                <td>{contacts.Last_name}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editContact(contacts)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteContact(contacts.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default Contact;