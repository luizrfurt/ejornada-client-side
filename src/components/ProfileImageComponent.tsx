import React, { useCallback, useState, useEffect } from "react";
import { HiOutlineUpload, HiTrash } from "react-icons/hi";

interface Props {
  photo: string;
  onChange: (
    photoChanged: boolean,
    isDefaultPhoto: boolean,
    photoBase64: string
  ) => void;
}

const ProfileImageComponent: React.FC<Props> = ({ photo, onChange }) => {
  const [isPhotoChanged, setIsPhotoChanged] = useState<boolean>(false);
  const [isDefaultPhoto, setIsDefaultPhoto] = useState<boolean>(true);
  const [photoBase64String, setPhotoBase64String] = useState<string>("");
  const urlDefaultPhoto =
    "https://frot4.s3.sa-east-1.amazonaws.com/profiles/default-profile-picture.jpeg";
  const [photoSource, setPhotoSource] = useState<string>(urlDefaultPhoto);
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

  useEffect(() => {
    setPhotoSource(photo);
    setIsDefaultPhoto(photo === urlDefaultPhoto);
    setShowDeleteButton(photo !== urlDefaultPhoto);
  }, [photo]);

  const handleUploadClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setIsPhotoChanged(true);
        setIsDefaultPhoto(false);
        setPhotoBase64String(base64String);
        setPhotoSource("");
        setShowDeleteButton(true);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, []);

  const handleRemoveImage = () => {
    setIsPhotoChanged(true);
    setIsDefaultPhoto(true);
    setPhotoBase64String("");
    setPhotoSource(urlDefaultPhoto);
    setShowDeleteButton(false);
  };

  useEffect(() => {
    onChange(isPhotoChanged, isDefaultPhoto, photoBase64String);
  }, [isPhotoChanged, isDefaultPhoto, photoBase64String, onChange]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: 175,
          height: 175,
          borderRadius: "50%",
          border: "2px #ccc solid",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <img
          src={photoBase64String || photoSource}
          alt=""
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <button
          style={{
            marginBottom: "10px",
          }}
          onClick={handleUploadClick}
        >
          <HiOutlineUpload />
        </button>
        {showDeleteButton && (
          <button
            style={{
              marginLeft: "10px",
            }}
            onClick={handleRemoveImage}
          >
            <HiTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileImageComponent;
