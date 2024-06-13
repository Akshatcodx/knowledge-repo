import React from "react";
const getFileNameFromUrl = (url) => {
  let fileName = url?.split("/");
  if (fileName) {
    let splitWithDot = fileName[fileName.length - 1].split(".");
    return `${splitWithDot[splitWithDot.length - 2]}.${
      splitWithDot[splitWithDot.length - 1]
    }`;
  }
};

const generateFileImage = (url) => {
  let fileName = url?.split("/");
  let splitWithDot = fileName[fileName.length - 1];
  let fileExtWithDot = splitWithDot.split(".");
  let fileExt = fileExtWithDot[fileExtWithDot.length - 1];
  switch (fileExt) {
    case "ts":
    case "js":
    case "txt":
    case "docx":
    // return <FaFileAlt />
    case "pdf":
    // return <MdPictureAsPdf />
    case "png":
    case "jpg":
    case "jpeg":
      return <img src={url} className="doc-image" />;

    default:
  }
};

const FileDownloader = ({ fileUrl }) => {
  console.log(fileUrl, "fileUrl");
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    // link.download = fileName;
    link.download = "aaa";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload2 = () => {
    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      // If the popup blocker prevents opening the new tab
      alert(
        "Please allow pop-ups for this site to download the file in a new tab."
      );
    }
  };

  const convertFileToUrl = (e) => {
    // way 1
    // let url;
    // const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   url = e.target.result;
    // };
    // reader.readAsDataURL(file);

    // way 2
    const url = URL.createObjectURL(file);

    console.log(url);
  };

  return (
    <div style={{ cursor: "pointer" }}>
      download
      <button onClick={convertFileToUrl}>Download File</button>
      <a href={fileUrl} download={"aaa"}>
        Download File1
      </a>
    </div>
  );
};

export default FileDownloader;
