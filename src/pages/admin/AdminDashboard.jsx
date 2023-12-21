import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createproductApi, getAllProductsApi } from "../../apis/Api";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
  //Male usestate
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProductsApi().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  //submit function

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productImage", productImage);

    //send req to backend Api
    createproductApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  };

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between">
          <h1>Admin Dashboard</h1>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create a New product!
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {/* 
                  Name,Description,price,Catagory(Select),Image
                  */}
                  <label>Product Name</label>
                  <input
                    onChange={(e) => setProductName(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    placeholder="Enter a product name"
                  />
                  <label>Product Description</label>
                  <input
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter a product description"}
                    cols="4"
                    rows="4"
                  />
                  <label>Product Price</label>
                  <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    placeholder={"Enter a product price"}
                  />
                  <label>Select Category</label>
                  <select
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
                  {previewImage && (
                    <img
                      src={previewImage}
                      className="img-fluid rounded object-cover"
                    />
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="table mt-2">
        <thead class="table-dark">
          <tr>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Product Description</th>
            <th scope="col">Product Category</th>
            <th scope="col">Product Actions</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {products.map((item) => (
            <tr>
              <td>
                <img src={item.productImageUrl}
                  height={100}
                  width={100}
                />
              </td>
              <td>{item.productName}</td>
              <td>NPR:{item.productPrice}</td>
              <td>{item.productDescription.slice(0,20)}</td>
              <td>{item.productCategory}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <Link to={`/admin/edit/${item._id}`} type="button" className="btn btn-success">
                    Edit
                  </Link>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminDashboard;
