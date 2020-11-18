import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const state = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
  ],
  filter: ''
};

const TodoList = () => {
  const [obj, setObj] = useState({ ...state });
  // useEffect(()=>{
  //   const prevContact = localStorage.getItem('contacts');
  //   const res=JSON.parse(prevContact)
  //   console.log(res);
  //   setObj(prev => ({ ...prev, contacts: [JSON.parse(prevContact)] }))
  // })
    // useEffect(() => {
    //   const prevContact = localStorage.getItem('contacts')
    //   const parsContacts = JSON.parse(prevContact)
    //   if (prevContact) {
    //     setObj(prev => ({ ...prev, contacts: [...parsContacts] })) 
    //   }
    // }, []);

    useEffect(()=>{
      const prevContact = localStorage.getItem('contacts');
        const res=JSON.parse(prevContact);
        console.log(res);
        setObj(prev => ({...prev, contacts: res}))
    },[])
    
    useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(obj.contacts))
    },[obj.contacts]);

    
  
  const inputFilter = ({ target }) => {
    const { value, name } = target;
    setObj(prev => ({ ...prev, [name]: value }))
  };
  const delContact = (id) => {
    const contacts = obj.contacts.filter((el) => el.id !== id)
    setObj((prev) => ({ ...prev, contacts }))
  }

  const vissbleTask = () => {
    return obj.contacts.filter(el => el.name.toLowerCase().includes(obj.filter.toLowerCase()))
  }

  const filterTask = vissbleTask()
  const addContact = async(user) => {
    if (obj.contacts.some(el => el.name === user.name)) {
      alert(`${user.name} уже записанно, введите другое имя!`)
    } else {
      console.log(obj.contacts);
     setObj(prev => ({ ...prev, contacts: [...prev.contacts, { id: uuidv4(), ...user }] }));
          localStorage.setItem('contacts', JSON.stringify(obj.contacts))
              

    }
  };


  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />

        <h2>Contacts</h2>
        <Filter inputHandlerFilter={inputFilter} filter={obj.filter} />
        <ContactList obj={obj} filter={filterTask} deleteContact={delContact} />

      </div>
    </>
  );
};

export default TodoList;