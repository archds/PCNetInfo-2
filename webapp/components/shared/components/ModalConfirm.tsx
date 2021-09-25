import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'

export interface Props {
    isOpen: boolean
    title: string
    text: string
    onClose(): void
    onConfirm(): void
}

function ModalConfirm(props: Props) {
    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={props.onConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>

    )
}

export default ModalConfirm