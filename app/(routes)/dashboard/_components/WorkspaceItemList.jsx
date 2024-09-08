import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const WorkspaceItemList = React.memo(({ WorkspaceList }) => {
    const router = useRouter()
    const onClickWorkspaceItem = (workspaceId) => { 
        router.push('/workspace/' + workspaceId)
    }
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
            {WorkspaceList && WorkspaceList.map((workspace, index) => (
                <div key={index} className='border shadow-xl rounded-xl hover:scale-105 transition-all cursor-pointer'>
                    <Image src={workspace?.coverUrl} width={400} height={200} alt='cover'
                        className='h-[170px] object-cover rounded-xl'
                        onClick={() => onClickWorkspaceItem(workspace.id)}
                    />
                    <div className='p-4 rounded-b-xl'>
                        <h2 className='flex gap-2'> {workspace?.emoji}  {workspace.workspaceName}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default WorkspaceItemList;
