import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import axios from "axios";
import React, { useState } from "react";

function CreateImage() {
  const [uploadedFile, setUploadedFile] = useState("");

  const onFileChange = (e: any) => {
    setUploadedFile(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("uploadedFile", uploadedFile);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axios.post(`http://localhost:6001/stats`, formData);

    console.log("RES", res);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <div className="form-group my-4 space-y-3">
          <input
            type="file"
            className="form-control-file"
            name="uploadedFile"
            onChange={onFileChange}
          />
          <Input
            type="text"
            className="form-control"
            placeholder="Number of speakers"
            name="nspeakers"
          />
        </div>

        <Button size="sm">Submit</Button>
      </form>
    </div>
  );
}

export default CreateImage;
