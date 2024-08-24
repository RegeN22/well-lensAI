import styled from "@emotion/styled";
import { Box, Button, Stack } from "@mui/material";
import { DropzoneAreaBase } from "mui-file-dropzone";
import { useRef, useState } from "react";
import "./picture-upload.css"

interface Props {
  btnText?: string;
  onUpload?: (picture: File) => void
  initValue?: string
}

const Input = styled("input")({
  display: "none",
});

export default function PictureUpload({ btnText, onUpload, initValue }: Props): JSX.Element {
  const [pic, setPic] = useState(initValue ?? '')
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadPicture = (file: File | undefined) => {
    if (file) {
      const picUrl: string = URL.createObjectURL(file);
      setPic(picUrl);
      onUpload?.(file);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      {pic && <img className="user-avatar" src={pic} alt="Preview" />}{" "}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: { xs: "none", md: "block" }, width: "500px" }}>
            <DropzoneAreaBase
              fileObjects={[]}
              acceptedFiles={["image/*"]}
              filesLimit={1}
              showPreviewsInDropzone={true}
              dropzoneText={"Drag and drop an image here or click"}
              onAdd={(files) => onUploadPicture(files?.[0]?.file)}
            />
          </Box>
          <Stack
            flexDirection="column"
            alignItems="center"
            sx={{ display: { xs: "flex", md: "none" }, padding: 2 }}
          >
            <label htmlFor="image-upload">
              <Input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => onUploadPicture(e?.target?.files?.[0])}
              />
              <Button
                variant="outlined"
                component="span"
                onClick={handleButtonClick}
              >
                {btnText ?? 'Upload Image'}
              </Button>
            </label>
          </Stack>
        </Box>
    </>
  );
}
