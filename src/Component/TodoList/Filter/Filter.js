import React, { useState } from 'react';
import PropTypes from "prop-types";

const Filter = ({ inputHandlerFilter, filter }) => {

    return (
        <>
            <form>
                <p className="form__text">Find contact by name</p>
                <input className="input__form"
                    type="text"
                    name="filter"
                    value={filter}
                    onChange={inputHandlerFilter}
                />
            </form>

        </>
    );
};

export default Filter;

Filter.propTypes = {
    inputHandlerFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
}