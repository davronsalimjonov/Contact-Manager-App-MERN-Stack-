import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import { Fragment, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import useRenderItemsHandler from '@/hooks/useItemsRenderHandler';
import ChatCallMessage from '../../moleculs/ChatCallMessage';
import ChatTextMessage from '../../moleculs/ChatTextMessage';
import cls from './ConversationMessages.module.scss';
import AudioTrackBar from '../AudioTrackBar';
import { WavesurferProvider } from '@/providers/WavesurferProvider';

const messages = [
    {
        "id": "01de19e0-e48b-446f-adcf-66f568e9104f",
        "createdAt": "2024-11-20T09:44:21.805Z",
        "type": "comment",
        "isViewed": true,
        "call": null,
        "comment": {
            "id": "f6cda5c6-2b43-43fd-91c7-8ecaba4f237e",
            "text": "Test comment for Muhammadaziz 1",
            "owner": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "message": null,
        "sms": null
    },
    {
        "id": "bfce7de0-8d2d-47b4-9ba5-b1c68366e608",
        "createdAt": "2024-11-20T09:44:29.922Z",
        "type": "comment",
        "isViewed": true,
        "call": null,
        "comment": {
            "id": "27621bb0-1016-4dae-b8a9-7062292815da",
            "text": "Test comment for Muhammadaziz 2",
            "owner": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "message": null,
        "sms": null
    },
    {
        "id": "7ded38d5-050f-4d70-8e2c-aef1932b51cf",
        "createdAt": "2024-11-20T09:45:49.305Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "2f1b3731-4f5a-4e36-be85-86cf9d4aba16",
            "type": "text",
            "text": "Test message for Muhammadaziz 1",
            "caption": null,
            "url": null,
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "88359856-83bd-4e19-8dc1-7f05163e53f4",
        "createdAt": "2024-11-20T09:46:18.431Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "c77fe653-df73-45b0-9579-174bc771dce1",
            "type": "text",
            "text": "Test message for Muhammadaziz 2",
            "caption": null,
            "url": null,
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "10180832-ce53-4746-8b89-7bfda589a439",
        "createdAt": "2024-11-20T09:47:03.629Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "ae2dd7cd-cf00-4cca-ab6f-69c3ac1f7dc9",
            "type": "text",
            "text": "Test message from user to Muhammadaziz 1",
            "caption": null,
            "url": null,
            "whoSended": "student",
            "mentor": null,
            "user": {
                "id": "20266d08-16a4-43a3-8d84-eb990bccea7b",
                "firstName": "Obito",
                "lastName": "Suyunov",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "sms": null
    },
    {
        "id": "4f0dd4ca-dcdf-4dd7-a0d7-88d31d2ef4f0",
        "createdAt": "2024-11-20T09:47:15.051Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "11115855-0b65-49cc-a019-d5e001ab3c2f",
            "type": "text",
            "text": "Test message from user to Muhammadaziz 2",
            "caption": null,
            "url": null,
            "whoSended": "student",
            "mentor": null,
            "user": {
                "id": "20266d08-16a4-43a3-8d84-eb990bccea7b",
                "firstName": "Obito",
                "lastName": "Suyunov",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "sms": null
    },
    {
        "id": "c6c921d7-410c-420c-b17e-742392716a3e",
        "createdAt": "2024-11-20T09:47:20.652Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "5fa98ee7-16b3-40be-bc12-91571c84bdfe",
            "type": "text",
            "text": "Test message from user to Muhammadaziz 3",
            "caption": null,
            "url": null,
            "whoSended": "student",
            "mentor": null,
            "user": {
                "id": "20266d08-16a4-43a3-8d84-eb990bccea7b",
                "firstName": "Obito",
                "lastName": "Suyunov",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "sms": null
    },
    {
        "id": "fa126bc0-8a06-4d33-ac93-41aaf9e3ac2b",
        "createdAt": "2024-11-20T09:47:26.895Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "fbab5113-3b59-4cfc-867c-e399ffe92a5d",
            "type": "text",
            "text": "Test message for Muhammadaziz 3",
            "caption": null,
            "url": null,
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "48c6e7c5-563e-41b4-8318-db3d89abd4ea",
        "createdAt": "2024-11-20T09:47:34.264Z",
        "type": "comment",
        "isViewed": true,
        "call": null,
        "comment": {
            "id": "50b16bc4-e503-4eb4-ad26-769eff54390e",
            "text": "Test comment for Muhammadaziz 4",
            "owner": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "message": null,
        "sms": null
    },
    {
        "id": "7de7679f-8bed-4fdf-9e1b-95390aba1c51",
        "createdAt": "2024-11-20T09:52:22.702Z",
        "type": "call",
        "isViewed": true,
        "call": {
            "id": "416acb0c-8065-4e29-965c-980ef8be6c7e",
            "duration": 400,
            "status": "success",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "091ed035-9742-4166-9fbe-625331b93ffb",
        "createdAt": "2024-11-20T09:52:33.076Z",
        "type": "call",
        "isViewed": true,
        "call": {
            "id": "d83a4594-de27-45ce-ba66-5cf795abf92e",
            "duration": 400,
            "status": "success",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "ab301d31-8407-4619-ad60-1b33f3dfc6ae",
        "createdAt": "2024-11-20T09:52:38.920Z",
        "type": "call",
        "isViewed": true,
        "call": {
            "id": "17f8cc82-080f-4833-b4ae-fd501ae53806",
            "duration": 400,
            "status": "failed",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "bfc7705a-3c4f-47ea-9994-331d77bdf0d9",
        "createdAt": "2024-11-20T09:53:40.149Z",
        "type": "call",
        "isViewed": true,
        "call": {
            "id": "4a5fafb4-595c-446b-97db-280be668052e",
            "duration": 400,
            "status": "failed",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "5f0042b5-fee9-448c-83b1-817cacd1250d",
        "createdAt": "2024-11-20T09:53:51.728Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "9c27e5fc-3c08-4dbe-8028-25be1c8a569c",
            "type": "text",
            "text": "Test message for Muhammadaziz 4",
            "caption": null,
            "url": null,
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "fa6b9f83-df2c-4c57-a7ac-addd14e39dd0",
        "createdAt": "2024-11-20T09:54:05.333Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "299164f2-26b6-4f88-8679-39336c8ea214",
            "type": "file",
            "text": "Test message for Muhammadaziz 5",
            "caption": null,
            "url": "https://api.myteacher.uz/image/message/ava1732096445322.jpg",
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "46891699-bcda-411c-98f5-7c331a59a9ee",
        "createdAt": "2024-11-20T09:54:09.023Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "fe235aba-8f0c-49b5-9935-7f67677006fb",
            "type": "file",
            "text": "Test message for Muhammadaziz 6",
            "caption": null,
            "url": "https://api.myteacher.uz/image/message/ava1732096449017.jpg",
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "c4979410-8dee-49e7-97c8-e5cd068b08fc",
        "createdAt": "2024-11-20T09:54:20.637Z",
        "type": "message",
        "isViewed": true,
        "call": null,
        "comment": null,
        "message": {
            "id": "3498594b-d3e2-40d5-92ff-8e473b17570d",
            "type": "text",
            "text": "Test message for Muhammadaziz 7",
            "caption": null,
            "url": null,
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "8959caa5-3b43-48a6-9a74-e71fd27b780a",
        "createdAt": "2024-11-20T09:54:27.721Z",
        "type": "comment",
        "isViewed": false,
        "call": null,
        "comment": {
            "id": "540d0377-9e25-4e5f-a93a-13f6dacb5abd",
            "text": "Test comment for Muhammadaziz 5",
            "owner": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "message": null,
        "sms": null
    },
    {
        "id": "aabcc32e-7ce0-469d-a245-eb50752f4a58",
        "createdAt": "2024-11-20T09:54:31.200Z",
        "type": "comment",
        "isViewed": false,
        "call": null,
        "comment": {
            "id": "91d0ab77-beed-4527-8068-df53f9a58114",
            "text": "Test comment for Muhammadaziz 6",
            "owner": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "message": null,
        "sms": null
    },
    {
        "id": "73a3592d-fb8d-478e-a4fb-dbc155c2980b",
        "createdAt": "2024-11-20T09:54:34.876Z",
        "type": "comment",
        "isViewed": false,
        "call": null,
        "comment": {
            "id": "25a0b3a4-75a1-467e-9e6c-a025c3a32018",
            "text": "Test comment for Muhammadaziz 7",
            "owner": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            }
        },
        "message": null,
        "sms": null
    },
    {
        "id": "a52f78d7-e11c-4c0b-b3fb-61ea6dab5db8",
        "createdAt": "2024-11-20T09:54:43.887Z",
        "type": "message",
        "isViewed": false,
        "call": null,
        "comment": null,
        "message": {
            "id": "51be0505-f0df-4e28-94d6-756b59afed63",
            "type": "text",
            "text": "Test message for Muhammadaziz 8",
            "caption": null,
            "url": null,
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "d2a8c4f4-6fae-4dfe-a33f-85a30fe407c0",
        "createdAt": "2024-11-20T09:54:55.888Z",
        "type": "message",
        "isViewed": false,
        "call": null,
        "comment": null,
        "message": {
            "id": "a664b378-4b98-4fe7-b9c9-a8c7a659bbb4",
            "type": "file",
            "text": "Test message for Muhammadaziz 9",
            "caption": null,
            "url": "https://api.myteacher.uz/image/message/ava1732096495880.jpg",
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "1fc0302b-b731-4008-9052-60c40f64ba98",
        "createdAt": "2024-11-20T09:54:59.378Z",
        "type": "message",
        "isViewed": false,
        "call": null,
        "comment": null,
        "message": {
            "id": "1f461406-6e3b-406b-814a-39c956830812",
            "type": "file",
            "text": "Test message for Muhammadaziz 10",
            "caption": null,
            "url": "https://api.myteacher.uz/image/message/ava1732096499372.jpg",
            "whoSended": "mentor",
            "mentor": {
                "id": "f7d666e8-06b0-404a-8f52-0bea90f5261a",
                "firstName": "Jamila",
                "lastName": "Tursunova",
                "url": "https://api.myteacher.uz/image/profile/IMG_20230614_122417_167_compressed1730532225702.jpg"
            },
            "user": null
        },
        "sms": null
    },
    {
        "id": "cd1f1bd1-ae85-4d07-98a1-b78405fa2660",
        "createdAt": "2024-11-20T09:55:03.617Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "ed070c87-4021-487b-8104-2208930d8a3f",
            "duration": 400,
            "status": "failed",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "1414ab15-de0c-47c4-bbc3-1985276a0bf8",
        "createdAt": "2024-11-20T09:55:10.043Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "88abce40-4587-4726-b35e-cf9ecffd0dbe",
            "duration": 400,
            "status": "success",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "8ec31c8c-8b23-4cbe-99f1-b0a8f57bece5",
        "createdAt": "2024-11-20T09:55:11.210Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "f9a19d45-bca2-400e-8a3d-91a60d7cddf9",
            "duration": 400,
            "status": "success",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "2012fe2f-754a-4513-947d-4561d4a2d070",
        "createdAt": "2024-11-20T09:55:12.156Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "146e8721-9581-4624-ad3c-98cc69d1c130",
            "duration": 400,
            "status": "success",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "cd1f1bd1-ae8-4d07-98a1-b78405fa2660",
        "createdAt": "2024-11-20T09:55:03.617Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "ed070c87-4021-487b-8104-2208930d8a3f",
            "duration": 400,
            "status": "failed",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "cd1f1bd1-ae85-4d07-981-b78405fa2660",
        "createdAt": "2024-11-20T09:55:03.617Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "ed070c87-4021-487b-8104-2208930d8a3f",
            "duration": 400,
            "status": "failed",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "cd1f1bd1-ae85-4d07-98a1-78405fa2660",
        "createdAt": "2024-11-20T09:55:03.617Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "ed070c87-4021-487b-8104-2208930d8a3f",
            "duration": 400,
            "status": "failed",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "cd1f1bd1-a85-4d07-98a1-b78405fa2660",
        "createdAt": "2024-11-20T09:55:03.617Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "ed070c87-4021-487b-8104-2208930d8a3f",
            "duration": 400,
            "status": "failed",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
    {
        "id": "cd1f1bd1-ae85-d07-98a1-b78405fa2660",
        "createdAt": "2024-11-20T09:55:03.617Z",
        "type": "call",
        "isViewed": false,
        "call": {
            "id": "ed070c87-4021-487b-8104-2208930d8a3f",
            "duration": 400,
            "status": "failed",
            "audio": "https://api.myteacher.uz:3014/2024-11-07/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-1730973569140.mp3"
        },
        "comment": null,
        "message": null,
        "sms": null
    },
].filter(msg => ['message', 'call'].includes(msg.type))

const MeasureRowHeight = ({ index, setRowHeight, children, windowWidth }) => {
    const rowRef = useRef()

    useEffect(() => {
        setRowHeight(index, rowRef.current.getBoundingClientRect().height);
    }, [setRowHeight, index, windowWidth]);

    return (
        <div ref={rowRef}>
            {children}
        </div>
    );
};

const ConversationMessages = ({
    // messages = []
}) => {
    const listRef = useRef(null);
    const rowHeights = useRef({});
    const isFirstRender = useRef(true);
    const { width: windowWidth } = useWindowSize()
    const handleRenderItems = useRenderItemsHandler({
        onTopReach: () => console.log("Top threshold reached"),
        onBottomReach: () => console.log("Bottom threshold reached"),
        itemCount: messages?.length,
        threshold: 2,
    });

    const getItemSize = useCallback((index) => rowHeights.current[index] || 60, []);

    const setRowHeight = useCallback((index, size) => {
        if (rowHeights.current[index] !== size) {
            rowHeights.current[index] = size;
            listRef.current?.resetAfterIndex(index);
        }
    }, []);

    const firstUnreadIndex = messages.findIndex((msg) => !msg.isViewed);

    const getInitialOffset = useCallback((unreadIndex, totalHeight) => {
        if (unreadIndex === -1) return 0;

        let offset = 0;
        for (let i = 0; i < unreadIndex; i++) {
            offset += getItemSize(i);
        }

        if (offset > totalHeight - getItemSize(unreadIndex)) {
            return offset;
        }
        return 0;
    }, [getItemSize]);

    const renderRow = ({ index, style }) => {
        const message = messages[index];

        return (
            <div style={style}>
                <MeasureRowHeight index={index} setRowHeight={setRowHeight} windowWidth={windowWidth}>
                    {RenderMessage(message)}
                </MeasureRowHeight>
            </div>
        );
    };

    const RenderMessage = (message) => {
        switch (message?.type) {
            case 'message': return (
                <div key={message?.id} style={{ paddingBottom: '37px' }}>
                    <ChatTextMessage
                        message={message?.message?.text}
                    />
                </div>
            );
            case 'call': return (
                <div key={message?.id} style={{ paddingBottom: '37px' }}>
                    <ChatCallMessage
                        recordUrl={message?.call?.audio}
                        recordDuration={message?.call?.duration}
                    />
                </div>
            );
            default: return <Fragment key={message?.id}></Fragment>;
        }
    }

    const ListComponent = memo(({ height, width }) => {
        const heightRef = useRef(height);
        heightRef.current = height;

        const initialOffset = useMemo(() => {
            return getInitialOffset(firstUnreadIndex, height);
        }, [height]);

        useEffect(() => {
            isFirstRender.current = false;
        }, []);

        return (
            <List
                ref={listRef}
                height={height}
                width={width}
                itemCount={messages.length}
                itemSize={getItemSize}
                overscanCount={10}
                onItemsRendered={handleRenderItems}
                initialScrollOffset={initialOffset}
                style={{ opacity: isFirstRender.current ? 0 : 1, transition: 'all 0.3s' }}
            >
                {renderRow}
            </List>
        );
    });

    return (
        <WavesurferProvider>
            <div className={cls.chat}>
                <AudioTrackBar className={cls.chat__audiobar} />
                <div className={cls.chat__window}>
                    <AutoSizer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        {({ width, height }) => {
                            return <ListComponent width={width} height={height} />
                        }}
                    </AutoSizer>
                </div>
            </div>
        </WavesurferProvider>
    );
}

export default ConversationMessages;