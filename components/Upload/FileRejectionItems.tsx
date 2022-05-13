import React from "react";
import { FileWithPath, FileRejection } from "react-dropzone";

import DocumentIcon from "public/svg/document.svg";
import TrashIcon from "public/svg/trash.svg";

interface CustomRejectedProps extends Omit<FileRejection, "file"> {
  file: FileWithPath;
}

interface RejectedProps extends CustomRejectedProps {
  removeFile: (index: number) => void;
  index: number;
}

export const FileRejectionItems = ({
  file,
  errors,
  removeFile,
  index,
}: RejectedProps) => {
  return (
    <li className="inline-flex items-center w-full gap-4 px-6 py-3 bg-gray-100 border border-red-500 rounded-lg">
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
        <div className="text-red-500 text-body-2">
          {errors.map((e) => (
            <div key={e.code}>
              {e.code === "file-invalid-type"
                ? "File must be PDF. Please remove this file as it won't be uploaded"
                : null}
              {e.code === "file-too-large" ? e.message : null}
            </div>
          ))}
        </div>
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
