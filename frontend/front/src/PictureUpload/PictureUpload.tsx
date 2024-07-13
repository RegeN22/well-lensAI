import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

interface Props {
  onUpload?: (picture: File) => void
}

const Input = styled('input')({
  display: 'none',
});

const ImagePreview = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: '16px',
});

export default function PictureUpload({ onUpload }: Props): JSX.Element {
  const [pic, setPic] = useState('')
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadPic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target?.files?.[0];
    if (file) {
      const picUrl: string = URL.createObjectURL(file);
      setPic(picUrl);
      onUpload?.(file);
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (<>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <label htmlFor="image-upload">
        <Input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={onUploadPic} />
        <Button variant="contained" component="span" onClick={handleButtonClick}> Upload Image</Button>
      </label>
      {pic && (
        <>
          <Typography variant="h6" component="p" sx={{ marginTop: '16px' }}>
            Image Preview
          </Typography>
          <ImagePreview src={pic} alt="Preview" />
        </>
      )}
    </Box>
  </>);
}