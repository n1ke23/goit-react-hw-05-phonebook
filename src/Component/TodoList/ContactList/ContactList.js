import React from "react";
import Item from './Item/Item';
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import './ContactList.css'
const ContactList = ({ filter, deleteContact }) => {
    return (
        <TransitionGroup component='ul' className='list-item'>

            {filter.map(el => <CSSTransition key={el.id} timeout={250} classNames='items'><Item {...el} deleteContact={deleteContact} /></CSSTransition>)}

        </TransitionGroup>

    );
};

export default ContactList;

ContactList.propTypes = {
    deleteContact: PropTypes.func.isRequired,
    filter: PropTypes.array.isRequired,
}