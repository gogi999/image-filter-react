import React, { useContext, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Button, Grid } from '@mui/material';
import { Box, styled } from '@mui/system';
import { FilterContext } from '../App';
import '../styles/instagram.css';

const StyleBox = styled(Box)({
    background: '#ddd',
    minHeight: '20rem',
    maxHeight: '100vh',
    marginBottom: '1rem',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
});
  
const StyledImage = styled('img')(props => ({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: `
        contrast(${props.customFilter.contrast}%) 
        brightness(${props.customFilter.brightness}%) 
        saturate(${props.customFilter.saturate}%) 
        sepia(${props.customFilter.sepia}%) 
        grayScale(${props.customFilter.gray}%)
    `
}));

const ImageField = () => {
    const uploadInputRef = useRef(null);
    const imgResultRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const { filterClass, customFilter } = useContext(FilterContext);

    const handleChangeInput = (e) => {
        setImageFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleDownloadImage = () => {
        domtoimage.toBlob(imgResultRef.current)
            .then(function (blob) {
                saveAs(blob, 'result.png');
            })
            .catch((error) => {
                console.error('Ooops, something went wrong!', error);
            });
    }

    const renderImage = () => (
        <figure style={{ width: "100%", height: "100%" }}>
            <StyledImage 
                className={filterClass} 
                src={imageFile} 
                alt="" 
                customFilter={!filterClass && customFilter}
                ref={imgResultRef}    
            />
        </figure>
    );

    return (
        <Grid item xs={12} md={7}>
            <StyleBox 
                onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
            >
                {imageFile ? (
                    renderImage()
                ) : (
                    <p>Upload Image</p>
                )}
            </StyleBox>
            <input 
                ref={uploadInputRef} 
                type="file" 
                accept="image/*" 
                hidden 
                onChange={handleChangeInput}    
            />
            <Button 
                disabled={!imageFile} 
                variant="contained" 
                fullWidth
                onClick={handleDownloadImage}
            >
                Download Image
            </Button>
        </Grid>
    );
}

export default ImageField;
