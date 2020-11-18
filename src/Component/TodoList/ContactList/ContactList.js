import React from "react";
import Item from './Item/Item';
import PropTypes from "prop-types";

const ContactList = ({ filter, deleteContact }) => {
    return (
        <ul>
            {filter.map(el => <Item key={el.id} {...el} deleteContact={deleteContact} />)}
        </ul>

    );
};

export default ContactList;

ContactList.propTypes = {
    deleteContact: PropTypes.func.isRequired,
    filter: PropTypes.array.isRequired,
}