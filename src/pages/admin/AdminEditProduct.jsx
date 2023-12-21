import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleProductApi, updateProductApi } from "../../apis/Api";
const AdminEditProduct = () => {
  //receive product id from url
  const { id } = useParams();

  //load product data
  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      console.log(res.data);
      setProductName(res.data.product.productName);
      setProductPrice(res.data.product.productPrice);
      setProductDescription(res.data.product.productDescription);
      setProductCategory(res.data.product.productCategory);
      setOldImage(res.data.product.productImageUrl);
    });
  }, [id]);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  //image upload function
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  //load all products when page load
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   getAllProductsApi().then((res) => {
  //     setProducts(res.data.products);
  //   });
  // }, []);

  //handle submit
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productImage", productImage);
    // make a api call
    updateProductApi(id, formData)
      .then((res) => {
        if ((res.data.success = false)) {
          toast.error(res.data.message);
        } else {
          navigate("/admin/dashboard");
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(
    //   productName,
    //   productPrice,
    //   productDescription,
    //   productCategory,
    //   productImage
    // );
  };
  return (
    <>
      <div className="m-4">
        <h3>
          Editing product - <span className="text-danger">{productName}</span>
        </h3>
        <div className="d-flex gap-3">
          <form action="">
            <div className="d-flex gap-3">
              <form action="">
                <label></label>
              </form>
              <div className="modal-body">
                <label>Product Name</label>
                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Enter a product name"
                />
                <label>Product Description</label>
                <input
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="form-control mb-2"
                  placeholder={"Enter a product description"}
                  cols="4"
                  rows="4"
                />
                <label>Product Price</label>
                <input
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="form-control mb-2"
                  type="text"
                  placeholder={"Enter a product price"}
                />
                <label>Select Category</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="form-control"
                >
                  <option value="Flower">Flower</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="Mobile">Mobile</option>
                </select>

                <label>Product Image</label>
                <input
                  onChange={handleImageUpload}
                  className="form-control mb-2"
                  type="file"
                  placeholder={"Enter a product Image"}
                  // preview image
                />
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary w-100 mt-2"
                >
                  Update product
                </button>
              </div>
            </div>{" "}
          </form>
          <div>
            <h6>Old Image preview</h6>
            <img
              className="img-fluid rounded-4 object-fit-cover"
              width={300}
              height={300}
              src={oldImage}
            />
            <h6 className="mt-4">New Image</h6>
            {previewImage ? (
              <img
                src={previewImage}
                alt="product Image"
                className="img-fluid rounded-4 object-fit-cover"
                width={300}
                height={300}
              />
            ) : (
              <p>No Image selected</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditProduct;
