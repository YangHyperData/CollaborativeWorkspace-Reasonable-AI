"use client"
import React, { useEffect, useState } from 'react'
import { useAuth, UserButton, useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import { AlignLeft, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import WorkspaceItemList from './WorkspaceItemList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
function WorkspaceList() {
  const { user } = useUser();
  const [WorkspaceList, setWorkspaceList] = useState([]);
  const { orgId } = useAuth();
  useEffect(() => {
    user && getWorkspaceList()
  }, [orgId,user])
  const getWorkspaceList = async () => {
    setWorkspaceList([]);
    const q = query(collection(db, 'Workspace'), where('orgId', '==', orgId ? orgId : user?.primaryEmailAddress?.emailAddress));
  const querySnapShot = await getDocs(q);

  const workspaces = querySnapShot.docs.map(doc => doc.data());
  setWorkspaceList(workspaces);
  }
  return (
    <div className='my-10 p-10 md:px-24 lg:px-36 xl:px-52 '>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold'>Hello, {user?.fullName} </h2>
        <Link href={'/createworkspace'}>
          <Button>+</Button>
        </Link>

      </div>

      <div className='mt-10 flex justify-between'>
        <div>
          <h2 className='font-bold text-primary'>Workspaces</h2>
        </div>
        <div className='flex gap-2'>
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {WorkspaceList?.length == 0 ?
        <div className='mt-10 flex flex-col items-center my-10'>
          <Image src={'/workspace.png'} width={200} height={200} />

          <h2 className='font-bold text-xl mt-3'>Create a new workspace</h2>
          <Link href={'/createworkspace'}>
            <Button className="text-xl my-3 font-medium">+ New Workspace</Button>
          </Link>
        </div>
        :
        <div>
          <WorkspaceItemList WorkspaceList={WorkspaceList} />
        </div>
      }
    </div>
  )
}

export default WorkspaceList
