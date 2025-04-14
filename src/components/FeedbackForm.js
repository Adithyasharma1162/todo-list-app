import React, { useState } from 'react';

function FeedbackForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
    });

    const [errors, setErrors] = useState({});
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        // simple regex for demonstration only
        if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.feedback) newErrors.feedback = 'Feedback is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            setFeedbackMessage('Feedback submitted successfully!');
            setErrors({});
            // submit the form
        } else {
            setErrors(formErrors);
            setFeedbackMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            {errors.name && <p>{errors.name}</p>}

            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            {errors.email && <p>{errors.email}</p>}

            <textarea name="feedback" value={formData.feedback} onChange={handleChange} placeholder="Feedback"></textarea>
            {errors.feedback && <p>{errors.feedback}</p>}

            <button type="submit">Submit</button>

            {feedbackMessage && <p>{feedbackMessage}</p>}
        </form>
    );
}

export default FeedbackForm;
