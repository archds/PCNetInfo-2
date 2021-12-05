import { useEffect, useRef } from 'react'

export default function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true)

    useEffect((): void => {
        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            return effect()
        }
    }, dependencies)
}