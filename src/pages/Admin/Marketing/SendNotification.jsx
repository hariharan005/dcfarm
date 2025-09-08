import React, { useState } from 'react';

const SendNotification = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (title && message) {
            console.log('Notification Sent:', { title, message });
            // Add your notification sending logic here
            setTitle('');
            setMessage('');
        } else {
            alert('Please fill out both fields.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Send Notification</h1>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Message:
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px', width: '100%' }}
                    />
                </label>
            </div>
            <button onClick={handleSend} style={{ padding: '10px 20px' }}>
                Send
            </button>
        </div>
    );
};

export default SendNotification;