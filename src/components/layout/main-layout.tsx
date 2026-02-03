import { Outlet } from "react-router"

import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';
import { useEffect, useRef } from 'react';


const MainLayout = () => {
    const lenisRef = useRef<LenisRef>(null)

    useEffect(() => {
        function update(data: { timestamp: number }) {
            const time = data.timestamp
            lenisRef.current?.lenis?.raf(time)
        }

        frame.update(update, true)

        return () => cancelFrame(update)
    }, [])

    return (
        <div>

            <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
            <Outlet />
        </div>
    )
}

export default MainLayout
