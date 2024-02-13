import React, { useEffect, useState } from 'react'
import { FormCheck } from 'react-bootstrap'

export default function User({_id,name , email , lastLogin,status,i , setUpdatedUsers , isRequestSent ,setIsRequestSent, checkAll}) {
  const [check, setCheck] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  useEffect(()=>{
    
    setCheck(checkAll)
    setIsAdded(checkAll)
    setIsRequestSent(false)

    if(checkAll){
      setUpdatedUsers(prev => [...prev, _id]);
    }else{
      setUpdatedUsers(prev => prev.filter(item => item !== _id));
    }
  },[checkAll])

  const handleCheckboxChange = (e) => {
    setIsRequestSent(false);
    setCheck(prevCheck => !prevCheck);
    
    if (!check && !isAdded) {
      setIsAdded(true);
      setUpdatedUsers(prev => [...prev, _id]);
      
    } else if (check && isAdded) {
      setIsAdded(false);
      setUpdatedUsers(prev => prev.filter(item => item !== _id));
    }
  };
  if(isRequestSent && check){
    setCheck(false)
    setIsAdded(false)
  }

  return (
    <tr key={_id} onClick={(e) =>handleCheckboxChange(e)}>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td className={status === 'blocked' ? 'opacity-25' : ''}>{status}</td>
      <td>{lastLogin}</td>
      <td >
        <FormCheck type='checkbox' checked={check} onChange={()=> ''} />
      </td>
    </tr>
  );
};

