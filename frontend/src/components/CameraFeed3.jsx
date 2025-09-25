import React, { useRef, useEffect, useState } from 'react';
import { Card } from './ui/Card';
import { VideoOff } from 'lucide-react';
const CameraFeed = ({ title, isLive = false }) => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLive) {
            const getCameraFeed = async () => {
                try {
                    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                        setError('Camera access is not supported by your browser.');
                        return;
                    }
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play().catch(err => {
                            setError('Failed to play the video stream.');
                            console.error('Video play error:', err);
                        });
                    }
                } catch (err) {
                    console.error('Error accessing camera:', err);
                    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                        setError('Camera access was denied. Please allow camera permissions for this site.');
                    } else {
                        setError(`An error occurred: ${err.message}`);
                    }
                }
            };
            getCameraFeed();
            return () => {
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = videoRef.current.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                }
            };
        }
    }, [isLive]);

    return (
        <Card title={title}>
            {error ? (
                <div className="text-red-500 text-center p-4">{error}</div>
            ) : isLive ? (
                <div className="relative w-full h-full min-h-[300px]">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover rounded-lg"
                        autoPlay
                        playsInline
                        muted
                    />
                </div>
            ) : (
                <div className="relative w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-slate-100 rounded-lg text-slate-400">
                    <VideoOff size={48} />
                    <p className="mt-4 text-lg font-medium">Feed Unavailable</p>
                </div>
            )}
        </Card>
    );
};

export default CameraFeed;