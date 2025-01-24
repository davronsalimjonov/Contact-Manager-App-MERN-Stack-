import axios from 'axios';
import { useState } from 'react';

const useFileDownload = (url) => {
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [fileSize, setFileSize] = useState(null);
    const [error, setError] = useState(null);

    const downloadFile = async () => {
        try {
            setProgress(0);
            setIsDownloading(true);
            setError(null);

            const response = await axios.head(url);
            const contentLength = response.headers['content-length'];

            if (contentLength) {
                setFileSize(Math.round(Number(contentLength) / 1024));
            }

            await axios.get(url, {
                onDownloadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setProgress(percentCompleted);
                },
                responseType: 'blob'
            });

            setIsDownloading(false);
            setProgress(100);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Download failed');
            setIsDownloading(false);
        }
    };

    return { progress, isDownloading, error, downloadFile, fileSize };
};

export default useFileDownload;