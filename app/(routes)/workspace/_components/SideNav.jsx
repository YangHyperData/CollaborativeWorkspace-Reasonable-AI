"use client"
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/FirebaseConfig'
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import Notification from './Notification'

function SideNav({ params }) {

    const [documentList, setDocumentList] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        params && GetDocumentList();
    }, [params])

    const GetDocumentList = () => {
        const q = query(
            collection(db, 'workspaceDocuments'),
            where('workspaceId', '==', Number(params?.workspaceid))
        );

        const unsubscribe = onSnapshot(q, (querySnapShot) => {
            const documents = [];
            querySnapShot.forEach((doc) => {
                documents.push(doc.data());
            });
            setDocumentList(documents);
        });


        return () => unsubscribe();
    };

    const CreateNewDocument = async () => {

        if (documentList?.length >= 5) {
            toast("Upgrade to add new file",
                {
                    description: "You reach max file, Please upgrade for unlimitit access",
                    action: {
                        label: "Upgrade",
                        onClick: () => console.log("Undo"),
                    },
                }
            )
            return;
        }


        setLoading(true);
        const docId = uuid4();
        await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
            workspaceId: Number(params?.workspaceid),
            createBy: user?.primaryEmailAddress?.emailAddress,
            coverImage: null,
            emoji: null,
            id: docId,
            documentName: 'Untitled Document',
            documentOutput: []
        })

        await setDoc(doc(db, 'DocumentOutput', docId.toString()), {
            docId: docId,
            output: []
        })

        setLoading(false)
        router.replace('/workspace/' + params?.workspaceid + "/" + docId)
    }

    return (
        <div className='h-screen md:w-72 hidden md:block fixed bg-blue-100 p-5 shadow-md'>
            <div className='flex justify-between items-center'>
                <Logo />

                <Notification>
                    <Bell className='h-7 w-7 text-gray-500 mt-2' />
                </Notification>
            </div>
            <hr className='my-5'></hr>
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className='font-medium'>
                        Workspace Name
                    </h2>
                    <Button onClick={CreateNewDocument}>
                        {loading ? <Loader2Icon className='w-4 h-4 animate-spin' /> : '+'}
                    </Button>
                </div>
            </div>

            {/* Document List */}
            <DocumentList documentList={documentList}
                params={params}
            />

            {/* Process Bar */}

            <div className='absolute bottom-10 w-[85%]'>
                <Progress value={(documentList?.length / 5) * 100} />
                <h2 className='text-md font-light my-2'><strong>{documentList?.length}</strong> Out of <strong>5</strong> files used</h2>
                <h2 className='text-md font-light '>Upgrade your plan for unlimitit access</h2>

            </div>
        </div>
    )
}

export default SideNav
