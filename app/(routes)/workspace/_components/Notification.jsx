"use client";
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function Notification({ children }) {
    
    return (
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
               No Notification
            </PopoverContent>
        </Popover>

    )
}

export default Notification
