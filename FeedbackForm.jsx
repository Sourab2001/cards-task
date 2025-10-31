import React, { useState } from 'react'

function FeedbackForm({onclose}) {
    const[form, setForm] = useState({name:"", email: "", message: ""});
    const[errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const e = {};
        if(!form.name.trim()) e.name = "Name is required";
        if(!form.email.trim()) e.email = "Email is required";
        else if (!/^[^\s@] + [^\s@] +\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
        if(!form.message.trim()) e.message = "Message is required"
        return e;
    };
    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value}));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const eobj = validate();
        setErrors(eobj);
        if(Object.keys(eobj).length === 0){
            setSubmitted(true);
            setTimeout(() => {
                alert("Feedback submitted. Thank you!");
                onclose();
            }, 600);
        }
    };
  return (
    <div className='modal'>
        <div className="modal-card">
            <div className="modal-header">
                <h2>Feedback</h2>
                <button className='close'
                onClick={onclose} aria-label='Close'
                >X</button>
            </div>
            {submitted ? (
                <div className="submitted">Thanks - submitting...</div>
            ):(
                <form onSubmit={handleSubmit}
                className='feedback-form' noValidate>
                    <lable>
                        Name
                        <input name='name' value={form.name} onChange={handleChange}/>
                        {errors.name && <div className='err'>
                            {errors.name}
                        </div> }
                    </lable>

                    <lable>
                        Email
                        <input name='email' value={form.email} onChange={handleChange}/>
                        {errors.email && <div className='err'>
                            {errors.email}
                        </div> }
                    </lable>

                    <lable>
                        Message
                        <input name='message' value={form.message} onChange={handleChange}/>
                        {errors.message && <div className='err'>
                            {errors.message}
                        </div> }
                    </lable>

                    <div className="form-actoins">
                        <button type='submit'
                        className='btn submit'
                        >
                            Submit
                        </button>
                    </div>


                </form>
            )}
        </div>
    </div>
  )
}

export default FeedbackForm
