import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Avatar} from '@mui/material';

const AvatarComponent = (props) =>  {
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch existing avatar from the database
    useEffect(() => {
        axios.get('/api/user/avatar')
            .then(response => {
                // Assuming the API returns the avatar URL
                if (response.data.avatarUrl) {
                    setAvatar(response.data.avatarUrl);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching avatar:', error);
                setIsLoading(false);
            });
    }, []);

    // Handle avatar change
    const handleAvatarChange = event => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);

            axios.post('/api/user/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setAvatar(response.data.avatarUrl);
            })
            .catch(error => {
                console.error('Error uploading avatar:', error);
            });
        }
    };

    return (
        // <div>
        //     {isLoading ? (
        //         <p>Loading avatar...</p>
        //     ) : (
        //         <div>
        //             <input type="file" accept="image/*" onChange={handleAvatarChange} />
        //             {avatar ? <img src={avatar} alt="Avatar" /> : <p>No avatar available</p>}
        //         </div>
        //     )}
        // </div>
        <Avatar
            src={avatar}
        />
    );
}

export default AvatarComponent;
