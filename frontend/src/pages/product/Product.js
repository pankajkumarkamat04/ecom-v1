import React, { useEffect } from "react";
import MetaData from "../../components/others/MetaData";
import { useGetProductQuery } from "../../store/api/productApi";
import ProductItem from "../../components/layout/product/ProductItem";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import CustomPagination from "../../components/layout/product/CustomPagination";
import { useSearchParams } from "react-router-dom";
import ProductFilter from "../../components/layout/product/ProductFilter";
import FilterQueryChecker from "../../helpers/FilterQueryChecker";

const Product = () => {
  const [searchparams] = useSearchParams();
  const parmas = {};
  FilterQueryChecker(searchparams, parmas);
  const { data, isLoading, error, isError } = useGetProductQuery(parmas);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  return (
    <div>
      <MetaData title={"Product Page"} />
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-3">
            <h6>Filter</h6>
            <ProductFilter />
          </div>
          <div className="col-md-9">
            <div className="row">
              {isError ? (
                "Somthing Went Wrong"
              ) : isLoading ? (
                <TailSpin
                  visible={true}
                  height="40"
                  width="40"
                  color="#0B5ED7"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <>
                  <h6>
                    {searchparams.has("keyword")
                      ? `This Keyword Has ${data.ProductCount} Product`
                      : "Latest Product"}
                  </h6>
                  {data.products.map((item) => (
                    <ProductItem product={item} key={item._id} />
                  ))}
                  <CustomPagination
                    resPerPage={data.resPerPage}
                    ProductCount={data.ProductCount}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
