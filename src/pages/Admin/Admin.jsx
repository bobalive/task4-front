import React, { useContext, useEffect, useState } from 'react'
import { Container, FormCheck, Table } from 'react-bootstrap'
import AppContext from '../../context/app.context'
import axios from 'axios'
import User from '../../components/User'
import Tools from '../../components/Tools'

export default function Admin() {

    const { user, setUser } = useContext(AppContext)


    const [checkAll , setCheckAll ] = useState(false)
    const [allUsers ,setAllUsers] = useState(null)
    const [updatedUsers , setUpdatedUsers] = useState([])
    const [isRequestSent , setIsRequestSent] = useState(false)



    const fetchData = async () => {
        if(!allUsers){
            try {
                const response = await axios.get(import.meta.env.VITE_API+"/users")
                setAllUsers(response.data) 
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }
        console.log('bob');
    }


    useEffect(()=>{
        fetchData()
    },[])
  return (
<div className='w-100 bg-dark d-flex justify-content-center align-items-center position-relative' style={{minHeight:'100vh'}}> 

  <Container className='w-100 bg-dark text-white mt-5 position-relative'>
  <div className='position-absolute' style={{top:'-30px' , right:'10px'}}> Hello {user.name}! <span style={{cursor:'pointer'}} onClick={()=>setUser('')}>Logout</span></div>
    <Tools fetchData={fetchData} setCheckAll ={setCheckAll} setUser ={setUser} email ={user.email} password = {user.password} setUpdatedUsers ={setUpdatedUsers} updatedUsers ={updatedUsers} setAllUsers={setAllUsers} setIsRequestSent ={setIsRequestSent}/>
    <Table striped bordered hover variant="dark" size='lg' className='w-100 '>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th> 
          <th>Last login</th>
          <th style={{cursor:"pointer" ,textAlign:"center" , width:'100px'}} onClick={()=> setCheckAll(prev=> !prev)}>{checkAll?'Remove all': 'Select all'}</th>
        </tr>
      </thead>
      <tbody key={1}>
        
        {allUsers && allUsers.length > 0 && allUsers.map((item, i) => (
          <User {...item} checkAll ={checkAll} i={i} key={i} setUpdatedUsers ={setUpdatedUsers} isRequestSent ={isRequestSent} setIsRequestSent={setIsRequestSent}/>
        ))}
      </tbody>
    </Table>
  </Container>
</div>
  )
}
