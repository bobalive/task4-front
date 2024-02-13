import React from 'react';
import Trash  from '../assets/trash-solid.svg';
import  Block  from '../assets/lock-solid.svg';
import  Unblock  from '../assets/lock-open-solid.svg';
import Refresh from '../assets/rotate-right-solid.svg'
import axios from 'axios';

export default function Tools({ fetchData,updatedUsers, setAllUsers ,setIsRequestSent ,setUpdatedUsers , email,password , setUser , setCheckAll}) {
  const changeStatus = async(status)=>{
    let isAuth = await checkIsAuth()
    if(isAuth){
      

      const blocked = await axios.put(import.meta.env.VITE_API+'/block',{users:updatedUsers,type:status})
      console.log(checkIsAuth());
      if(blocked.status ===200){

        setAllUsers(prev=>{
          let next = prev.map(item=>{

            if(updatedUsers.includes(item._id)){
              return {...item,status:status}
            }
            return {...item}
          })

          return next

        })
        setCheckAll(false)
        setUpdatedUsers([])
        setIsRequestSent(true)
        
      }
    }
      
  }

  const deleteUsers = async ()=>{
    if(checkIsAuth()){
      const status = []

      for( let i =0 ; i<updatedUsers.length ; i++){
        const deleated = await axios.delete(import.meta.env.VITE_API+"/delete/"+updatedUsers[i])
        status.push(deleated.status)
      }
      if(status.every(item => item == 200)){
        setAllUsers(prev=>{
          let next = prev.filter(item => !updatedUsers.includes(item._id))
          return next
        })
        setIsRequestSent(true)
        setUpdatedUsers([])
      }
    }
    setCheckAll(false)

  }
  const checkIsAuth = async()=>{
    const formData = {email,password}
    
    const res = await axios.post(import.meta.env.VITE_API+'/login', formData);
    if(res.status === 200 && res.data != 'false'){
      return true
    }
    setUser('')
    return false
  }

  return (
    <div className='gap-2 d-flex mb-3'>
        <div  className='bg-light p-1 border border-dark border-2 rounded-3 text-black fw-bold' style={{cursor:'pointer'}} onClick={()=>changeStatus('blocked')}><img src={Block} alt="" width={30} height={30} /> Block</div>
        <div  className='bg-light p-1 border border-dark border-2 rounded-3 text-black fw-bold' style={{cursor:'pointer'}} onClick={()=>changeStatus('active')}><img src={Unblock} alt="" width={30} height={30} style={{cursor:'pointer'}}/></div>
        <div  className='bg-light p-1 border border-dark border-2 rounded-3 text-black fw-bold' style={{cursor:'pointer'}} onClick={()=>deleteUsers()}><img src={Trash} alt="" width={30} height={30} style={{cursor:'pointer'}}/></div>
        <div  className='bg-light p-1 border border-dark border-2 rounded-3 text-black fw-bold' style={{cursor:'pointer'}} onClick={()=>fetchData()}><img src={Refresh} alt="" width={30} height={30} style={{cursor:'pointer'}}/> refresh</div>
    </div>

  );
}