"use client"

import { Square } from 'ldrs/react'
import 'ldrs/react/Square.css'

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-base-100">
            <Square
                size={31}
                stroke={5}
                strokeLength={0.25}
                bgOpacity={0.1}
                speed={1.2}
                color="white"
            />
        </div>
    );
}