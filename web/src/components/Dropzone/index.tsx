import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import photoIcon from '../../assets/images/icons/Camera.svg'
import './style.css'

interface Props {
    onFileUploaded: (file: File) => void
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        const fileUrl = URL.createObjectURL(file)
        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)
    }, [onFileUploaded])
    
    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/*'})

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept='image/*' />

            <img src={photoIcon} alt="Point thumbnail"/> 

        </div>
    )
}

export default Dropzone