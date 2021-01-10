const FileUploader = ({ src, setSrc }) => {
  const decodeFile = (e) => {
    getBase64(e.target.files[0])
      .then((res) => setSrc(res))
      .catch((err) => console.log(err));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  };

  return (
    <div className="fileuploader">
      <div className="thumbnail-preview">
        <img src={src} alt="" height="150" width="150" />
      </div>
      <span>
        <u>
          <i className="fa fa-upload"></i> Upload Thumbnail
        </u>
      </span>
      <input type="file" onChange={decodeFile} />
    </div>
  );
};

export default FileUploader;
