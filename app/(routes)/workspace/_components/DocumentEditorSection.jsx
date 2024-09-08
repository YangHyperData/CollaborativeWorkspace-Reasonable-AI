import React, { useState } from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import CommentBox from './CommentBox'

function DocumentEditorSection({ params }) {

    const [onpenComment, setOpenComment] = useState(false);
    return (
        <div>
            {/* Header */}
            <DocumentHeader />

            {/* Document Info */}
            <DocumentInfo params={params} />

            {/* Rich Text Editor */}

            <div className='grid grid-cols-4'>
                <div className='col-span-3 ml-20 block'>
                    <RichDocumentEditor params={params} />
                </div>
                <div className='fixed right-5 bottom-5'>
                    <Button onClick={() => setOpenComment(!onpenComment)}>
                        {onpenComment ? <X /> : <MessageCircle />}
                    </Button>
                    {onpenComment && <CommentBox />}
                </div>
            </div>
        </div>
    )
}

export default DocumentEditorSection
