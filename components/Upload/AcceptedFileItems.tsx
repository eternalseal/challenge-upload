import { Indicator, Root } from "@radix-ui/react-progress";
import React from "react";
import { FileWithPath } from "react-dropzone";

import DocumentIcon from "public/svg/document.svg";
import TrashIcon from "public/svg/trash.svg";

export const AcceptedFileItems = ({
  file,
  removeFile,
  index,
  uploadProgress,
  uploading,
}: {
  file: FileWithPath;
  removeFile: (index: number) => void;
  index: number;
  uploadProgress: number;
  uploading: boolean;
}) => {
  return (
    <li className="inline-flex items-center w-full gap-4 px-6 py-3 bg-gray-100 border border-green-500 rounded-lg">
      <span className="text-gray-800 w-7 h-7">
        <DocumentIcon className="w-7 h-7" />
      </span>
      <div className="flex flex-col">
        <span className="font-semibold text-black text-header-5">
          {file.path}
        </span>
        <span className="text-gray-600">
          {Math.max(file.size / 1024 / 1024, 0.1).toFixed(2)}MB
        </span>
        {uploading ? (
          <>
            <span className="text-gray-500 text-body-2">
              {uploadProgress}%{" "}
              {uploadProgress === 100 ? "uploaded" : "uploading"}...
            </span>
            <Root
              value={uploadProgress}
              className="relative h-1 mt-1 overflow-hidden bg-gray-400 border border-transparent rounded-lg w-80"
            >
              <Indicator
                className="h-full bg-teal-400"
                style={{ transform: `translateX(-${100 - uploadProgress}%)` }}
              />
            </Root>
          </>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => removeFile(index)}
        className="w-4 h-4 ml-auto text-red-500"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </li>
  );
};
