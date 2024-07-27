import { Box, Button, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useCameraDevice } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera-text-recognition';

interface Props {
  onUpload?: (picture: File) => void
}

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
  const device = useCameraDevice('back');

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

        {!!device && (
          <Camera
            device={device}
            isActive
            options={{
              language: 'latin'
            }}
            mode={'recognize'}
            callback={(d) => console.log(d)}
          />
        )}

        <input style={{display: 'none'}} ref={inputRef} type="file" accept="image/*" capture="environment" onChange={onUploadPic} />
        <Button variant="contained" component="span" onClick={handleButtonClick}> Upload Image</Button>
      </label>
      {pic && (
        <>
          <Typography variant="h6" component="p" sx={{ marginTop: '16px' }}>
            Image Preview
          </Typography>
          <img className="image-preview" src={pic} alt="Preview" />
        </>
      )}
    </Box>
  </>);
}