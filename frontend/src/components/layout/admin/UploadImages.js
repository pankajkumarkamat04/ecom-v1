import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  useDeleteProductImageMutation,
  useGetProductDetailQuery,
  useUploadProductImagesMutation,
} from "../../../store/api/productApi";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UploadImages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const { data, isLoading } = useGetProductDetailQuery({
    id,
  });

  const [uploadProductImages, { error, isSuccess, isLoading: Uploading }] =
    useUploadProductImagesMutation();

  const [
    deleteProductImage,
    { isSuccess: deleteImageSuccess, isLoading: deleteImageLoading },
  ] = useDeleteProductImageMutation();
  useEffect(() => {
    if (data?.result) {
      setProductImages(data?.result?.images);
    }
    if (isSuccess) {
      toast.success("Product Images Upload Successfully");
      navigate("/admin/products");
    }
  }, [data, isSuccess]);
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please Select Image");
      return;
    }
    const body = {
      images,
    };
    uploadProductImages({ id, body });
  };
  const removePreviewImage = (image) => {
    const filteredImage = imagesPreview.filter((img) => img != image);
    setImagesPreview(filteredImage);
    setImages(filteredImage);
  };
  const removeProductImage = (imgId) => {
    console.log(imgId);
    const body = {
      imgId,
    };
    deleteProductImage({ id, body });
  };
  return (
    <AdminLayout>
      <div className="w-50 ms-auto me-auto">
        <h2 className="text-center">Add Images</h2>
        <div>
          <input
            className="form-control"
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            multiple
          />
        </div>
        <div className="row">
          {imagesPreview.length !== 0 ? (
            <>
              <p className="text-success pt-2">Preview Images</p>
              <div className="row">
                {isLoading ? (
                  <Loader />
                ) : (
                  imagesPreview?.map((img) => (
                    <div className="col-3">
                      <img
                        style={{ height: "75px", width: "75px" }}
                        className="p-1 m-1 border"
                        src={img}
                        alt=""
                        srcset=""
                      />
                      <button
                        style={{ width: "75px", marginBlockStart: "-15px" }}
                        className="btn ms-1 me-1 btn-danger"
                        onClick={() => removePreviewImage(img)}
                      >
                        <i className="fa-solid fa-x fa-sm"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>{" "}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          {data?.result?.images.length !== 0 ? (
            <>
              <p className="text-primary pt-2">Product Images</p>
              <div className="row">
                {isLoading ? (
                  <Loader />
                ) : (
                  productImages?.map((img) => (
                    <div className="col-3">
                      <img
                        style={{ height: "75px", width: "75px" }}
                        className="p-1 m-1 border"
                        src={img?.url}
                        alt=""
                        srcset=""
                      />
                      <button
                        style={{ width: "75px", marginBlockStart: "-15px" }}
                        className="btn ms-1 me-1 btn-danger"
                        onClick={() => removeProductImage(img?.public_id)}
                        disabled={deleteImageLoading}
                      >
                        <i className="fa-solid fa-x fa-sm"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>{" "}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="mt-3">
          <button
            className="btn btn-primary"
            onClick={submitHandler}
            disabled={Uploading}
          >
            {Uploading ? "Uploading..." : "Upload Product Image"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;
