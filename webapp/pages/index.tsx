import ActionsDashboard from 'components/computer/ActionsDashboard'
import ComputersDashboard from 'components/computer/ComputersDashboard'
import React, { useState } from 'react'
import { Box, Paper } from '@mui/material'

function Index() {
    const [activeComputer, setActiveComputer] = useState<string | undefined>(undefined)
    const [inputMode, setInputMode] = useState<boolean>(false)

    const resetActionsDashboard = (): void => {
        setActiveComputer(undefined)
        setInputMode(false)
    }

    const onComputerClick = (computerId: string): void => {
        setActiveComputer(computerId)
        setInputMode(false)
    }

    return (
        <Box margin='auto' display='flex' justifyContent='space-around' gap='20px' maxWidth='97%'>
            <ComputersDashboard onComputerClick={onComputerClick} onAddComputer={() => setInputMode(true)} />
            <Paper sx={{ width: '100%', minHeight: '70vh', padding: '20px' }}>
                <ActionsDashboard
                    resetActionsDashboard={resetActionsDashboard}
                    computerId={activeComputer}
                    input={inputMode}
                />
            </Paper>
        </Box>
    )
}

export default Index
