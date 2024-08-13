import styled from "@emotion/styled";
import { Box, Button, Paper, Stack } from "@mui/material";
import { DropzoneAreaBase } from "mui-file-dropzone";
import { useRef, useState } from "react";

interface Props {
  btnText?: string;
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

export default function PictureUpload({ btnText, onUpload }: Props): JSX.Element {
  const [pic, setPic] = useState('')
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadPicture = (file: File | undefined) => {
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
    <Paper elevation={2} sx={{ padding: "0.5em", height: '100%' }}>
      {!pic && (
        <>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <DropzoneAreaBase fileObjects={[]} acceptedFiles={['image/*']}
              filesLimit={1}
              showPreviewsInDropzone={false}
              dropzoneText={"Drag and drop an image here or click"}
              onAdd={(files) => onUploadPicture(files?.[0]?.file)} />
          </Box>
          <Stack flexDirection="column" alignItems='center' sx={{ display: { xs: 'flex', md: 'none' }, padding: '2em' }}>
            <label htmlFor="image-upload">
              <Input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={(e) => onUploadPicture(e?.target?.files?.[0])} />
              <Button variant="contained" component="span" onClick={handleButtonClick}>{btnText ?? 'Upload Image'}</Button>
            </label>
          </Stack>
        </>
      )}
      {pic && (
        <ImagePreview src={pic} alt="Preview" />
      )}
    </Paper>
  </>);
}