import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

function DocumentHeader() {
    return (
        <div className='flex justify-between items-center p-3 px-7 shadow-md'>
            <div></div>
            <OrganizationSwitcher
                appearance={{
                    elements: {
                        rootBox: 'h-16 w-16',
                        avatarBox: 'h-16 w-16',

                    },
                }} />
            <div className='flex gap-2'>
                <div className='mt-4'>
                    <Button>Share</Button>
                </div>
                <UserButton appearance={{
                    elements: {
                        avatarBox: 'h-16 w-16',
                    },
                }} />
            </div>
        </div>
    )
}

export default DocumentHeader
