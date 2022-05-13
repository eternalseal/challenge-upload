import React from "react";
import { useDropzone, FileWithPath, FileRejection } from "react-dropzone";
import toast from "react-hot-toast";
import { HiX } from "react-icons/hi";

import UploadColorIcon from "public/svg/upload-color.svg";

import { AcceptedFileItems } from "./AcceptedFileItems";
import { FileRejectionItems } from "./FileRejectionItems";

interface CustomRejectedProps extends Omit<FileRejection, "file"> {
  file: FileWithPath;
}

const FileUpload = () => {
  const [myFiles, setMyFiles] = React.useState<FileWithPath[]>([]);
  const [myRejectedFiles, setMyRejectedFiles] = React.useState<FileRejection[]>(
    []
  );
  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
      setMyRejectedFiles([...myRejectedFiles, ...rejectedFiles]);
    },
    [myFiles, myRejectedFiles]
  );
  const [uploadStatus, setUploadStatus] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "application/pdf": [],
      },
      onDrop,
      validator: (file) => {
        // do not allow files greater than 10mb
        if (file.size > 10485760) {
          return [
            {
              code: "file-too-large",
              message:
                "File is too large. Please remove it. This file won't be uploaded",
            },
          ];
        }
        return null;
      },
    });

  const removeAcceptedFile = (index: number) => {
    const newFiles = [...myFiles];
    newFiles.splice(index, 1);
    setMyFiles(newFiles);
  };
  const removeRejectedFile = (index: number) => {
    const newFiles = [...myRejectedFiles];
    newFiles.splice(index, 1);
    setMyRejectedFiles(newFiles);
  };

  const handleUpload = () => {
    setUploadStatus(true);
    setUploadProgress(10);
    toast
      .promise(
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(true);
            setUploadProgress(100);
          }, 5000)
        ),
        {
          loading: "Uploading...",
          success: "Uploaded successfully",
          error: "Upload failed",
        }
      )
      .then(() => {
        setUploadProgress(100);
        setTimeout(() => {
          setUploadStatus(false);
          setMyFiles([]);
        }, 1000);
      });
  };

  return (
    <div className="max-w-2xl pb-4 mx-auto bg-white rounded-lg shadow">
      <div
        id="drop__zone__wrapper"
        {...getRootProps({
          className:
            "drop__zone w-full flex flex-col justify-center items-center border border-gray-200 rounded px-48 py-8 border-dashed",
        })}
      >
        <input {...getInputProps()} />
        <span>
          <UploadColorIcon />
        </span>
        <p className="mt-3 text-black text-body-1">
          <span className="text-teal-400 cursor-pointer">Upload a file</span> or
          drag and drop{" "}
        </p>
        <p className="mt-2 text-body-1 text-grey-500">PDF up to 10MB</p>
      </div>
      <ul className="px-4 pt-4 space-y-3">
        {myFiles.map((file: FileWithPath, index) => (
          <AcceptedFileItems
            key={file.path}
            file={file}
            removeFile={removeAcceptedFile}
            index={index}
            uploading={uploadStatus}
            uploadProgress={uploadProgress}
          />
        ))}
        {myRejectedFiles.map((rejection: CustomRejectedProps, index) => (
          <FileRejectionItems
            key={rejection.file.path}
            file={rejection.file}
            errors={rejection.errors}
            removeFile={removeRejectedFile}
            index={index}
          />
        ))}
      </ul>

      <footer className="grid px-4 mt-4 place-content-end">
        <button
          onClick={handleUpload}
          className="py-3 px-4 font-semibold rounded-full uppercase text-xs leading-4 gap-2 flex items-center justify-center transition-all tracking-[1px] text-white bg-teal-500 focus:outline-none focus:ring focus:ring-teal-400 focus:ring-offset-2 disabled:text-white disabled:pointer-events-none"
        >
          Submit
        </button>
      </footer>
    </div>
  );
};

export default FileUpload;
