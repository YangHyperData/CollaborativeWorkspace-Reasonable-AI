import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import Table from '@editorjs/table';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import SimpleImage from "@editorjs/simple-image";
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/nextjs';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor({ params }) {
    const editorRef = useRef(null);
    const { user } = useUser();
    const [documentOutput, setDocumentOutput] = useState([]);
    const isFetched = useRef(false);

    useEffect(() => {
        if (user) {
            if (!editorRef.current) {
                InitEditor();
            } else {
                // Restore content without re-rendering if editor already exists
                if (documentOutput.length > 0) {
                    editorRef.current.render(documentOutput);
                }
            }
        }
    }, [user]);

    useEffect(() => {
        return () => {
            // Only destroy editor if necessary
            // For example, when completely unmounting the component permanently
            // editorRef.current?.destroy();
        };
    }, []);

    const SaveDocument = async () => {
        try {
            const outputData = await editorRef.current.save();
            const docRef = doc(db, 'DocumentOutput', params?.documentid);
            await updateDoc(docRef, {
                output: outputData,
                editedBy: user?.primaryEmailAddress?.emailAddress
            });
        } catch (error) {
            console.error('Error saving document:', error);
        }
    };

    const GetDocumentOutput = () => {
        setDocumentOutput([]);
        const unsubscribe = onSnapshot(doc(db, 'DocumentOutput', params?.documentid),
            (doc) => {
                if (!isFetched.current || doc.data()?.editedBy !== user?.primaryEmailAddress?.emailAddress) {
                    setDocumentOutput(doc.data()?.output || []);
                    if (doc.data()?.output && editorRef.current) {
                        // Render only if the document output has been fetched for the first time
                        if (!isFetched.current) {
                            editorRef.current.render(doc.data().output).catch(error => {
                                console.error('Error rendering document:', error);
                            });
                        }
                    }
                }
                isFetched.current = true;
            });
        return () => unsubscribe();
    };

    const InitEditor = () => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                onChange: SaveDocument,
                onReady: GetDocumentOutput,
                holder: 'editorjs',
                tools: {
                    header: Header,
                    delimiter: Delimiter,
                    alert: Alert,
                    table: Table,
                    list: List,
                    checklist: Checklist,
                    image: SimpleImage,
                    code: CodeTool,
                },
            });
        }
    };

    return (
        <div style={{ marginLeft: '-30rem' }}>
            <div id='editorjs'></div>
            <div className='fixed bottom-10 md:ml-80 left-0 z-10'>
                <GenerateAITemplate setGenerateAIOutput={async (output) => {
                    if (editorRef.current) {
                        try {
                            console.log('Rendering AI output:', output);
                            await editorRef.current.render(output);
                        } catch (error) {
                            console.error('Error rendering AI-generated output:', error);
                        }
                    }
                }} />

            </div>
        </div>
    );
}

export default RichDocumentEditor;
