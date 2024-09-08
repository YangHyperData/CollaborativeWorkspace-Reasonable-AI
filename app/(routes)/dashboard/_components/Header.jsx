"use client"
import React, { useEffect } from 'react'
import Logo from './../../../_components/Logo'
import { OrganizationSwitcher, useAuth, UserButton, useUser } from '@clerk/nextjs'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
function Header() {
    const { orgId } = useAuth();
    const { user } = useUser();
    useEffect(() => {
        user && saveUserData();
    }, [user])
    const saveUserData = async () => {
        const docId = user?.primaryEmailAddress?.emailAddress
        try {
            await setDoc(doc(db, 'LoopUser', docId), {
                name: user?.fullName,
                avatar: user?.imageUrl,
                email: user?.primaryEmailAddress?.emailAddress
            })
        }
        catch (e) {

        }
    }
    return (
        <div className='flex justify-between items-center p-3 shadow-md'>
            <Logo />
            <div className='pr-48'>
                <OrganizationSwitcher afterCreateOrganizationUrl={'/dashboard'}
                    afterLeaveOrganizationUrl={'/dashboard'}
                    appearance={{
                        elements: {
                            rootBox: 'h-16 w-16',
                            avatarBox: 'h-16 w-16',

                        },
                    }}
                />
            </div>
            <UserButton
                appearance={{
                    elements: {
                        avatarBox: 'h-16 w-16',
                    },
                }}
            />
        </div>
    )
}

export default Header
