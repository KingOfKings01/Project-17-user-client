import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmBooking = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const confirmBooking = async () => {
            try {
                const path = import.meta.env.VITE_APP_API + '/booking/';

                const response = await axios.get(path + `confirm-booking/${token}`);
                if (response.status === 200) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.log(error);
                setStatus('error');
            }
        };

        confirmBooking();
    }, [token]);

    return (
        <div className="p-6 text-center">
            {status === 'loading' && <div>Loading...</div>}
            {status === 'success' && <div>Booking confirmed successfully!</div>}
            {status === 'error' && <div>The like might be expired!</div>}
        </div>
    );
};

export default ConfirmBooking;
