import React, { useRef, useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css'
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const errorHandler = () => {
        setError(null);
    }

    const addUserHandler = event => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;

        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a vaild name and age. (non-empty values)',
            });
            return;
        }
        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a vaild age. (> 0)',
            });
            return;
        }

        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    return (
        <React.Fragment>
            {error && <ErrorModal title={error.title} 
                                  message={error.message}
                                  onConfirm={errorHandler} />}
            <Card className={classes.input} >
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">User Name: </label>
                    <input type="text" 
                        id="username" 
                        ref={nameInputRef} />
                    <label htmlFor="age">User Age: </label>
                    <input type="number" 
                        id="age" 
                        ref={ageInputRef} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </React.Fragment>
    );
}

export default AddUser;