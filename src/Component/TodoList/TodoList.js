import React, { useState, useEffect } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { v4 as uuidv4 } from "uuid"
import ContactForm from "./ContactForm/ContactForm"
import Filter from "./Filter/Filter"
import ContactList from "./ContactList/ContactList"
import "./TodoList.css"

const state = {
	contacts: [
		// { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
		// { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
		// { id: "id-3", name: "Eden Clements", number: "645-17-79" },
		// { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
	],
	filter: "",
}

const TodoList = () => {
	const [obj, setObj] = useState({ ...state })
	const [isNotifi, setIsNotifi] = useState(false)

	useEffect(() => {
		const prevContact = localStorage.getItem("contacts")
		const res = JSON.parse(prevContact)
		setObj((prev) => ({ ...prev, contacts: res }))

	}, [])

	useEffect(() => {
		localStorage.setItem("contacts", JSON.stringify(obj.contacts))
	}, [obj.contacts])

	const inputFilter = ({ target }) => {
		const { value, name } = target

		setObj((prev) => ({ ...prev, [name]: value }))
	}

	const delContact = (id) => {
		const contacts = obj.contacts.filter((el) => el.id !== id)
		setObj((prev) => ({ ...prev, contacts, filter: "" }))
	}

	const vissbleTask = () => {
		return obj.contacts.filter((el) => el.name.toLowerCase().includes(obj.filter.toLowerCase()))
	}
	const reversNotifi = () => {
		setIsNotifi(true)
		setTimeout(function () {
			if (isNotifi) {
				setIsNotifi(false)
			};
		}, 2000);
	}
	const filterTask = vissbleTask()
	const addContact = async (user) => {
		if (obj.contacts.some((el) => el.name === user.name)) {
			reversNotifi()
			// alert(`${user.name} уже записанно, введите другое имя!`)
		} else {
			setObj((prev) => ({ ...prev, contacts: [...prev.contacts, { id: uuidv4(), ...user }] }))
			localStorage.setItem("contacts", JSON.stringify(obj.contacts))
		}
	}

	return (
		<>

			<CSSTransition in={true} appear={true} timeout={500} classNames="title" unmountOnExit>
				<h1 className='titles'>Phonebook</h1>
			</CSSTransition>
			<CSSTransition in={isNotifi} timeout={500} classNames="alert" unmountOnExit>
				<h2 className='alert'>Contact is already exists!</h2>
			</CSSTransition>
			<ContactForm addContact={addContact} setIsNotifi={setIsNotifi} isNotifi={isNotifi} />

			<CSSTransition in={obj.contacts.length > 1} timeout={250} classNames='filter' unmountOnExit>
				<Filter inputHandlerFilter={inputFilter} filter={obj.filter} />
			</CSSTransition>

			<ContactList obj={obj} filter={filterTask} deleteContact={delContact} />


		</>
	)
}

export default TodoList
