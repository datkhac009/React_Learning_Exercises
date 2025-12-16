import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProduct } from "../../hooks/useProduct";
import ProductTable from "./ProductTable";
import { useState, useMemo, useEffect, useRef } from "react";
import CreateItemProduct from "./CreateItemProduct";
import { useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
//import ProductFilter from "./ProductFilter";

function ListProduct() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { product, isLoading, refetchdata } = useProduct(API_BASE_URL);

  const [searchParams, setSearchParams] = useSearchParams();

  const [openCreate, setOpenCreate] = useState(false);

  const handleOpen = () => setOpenCreate(true);
  const handleClose = () => setOpenCreate(false);
  const ITEMS_PER_PAGE = 8;
  // search theo name
  const searchUrl = searchParams.get("q") || "";
  // pagination
  const pageUrl = Number(searchParams.get("page")) || 1;
  const sortUrl = searchParams.get("sort") || "";

  const [searchInput, setSearchInput] = useState(searchUrl);
  const [page, setPage] = useState(pageUrl);
  const [sort,setSort] = useState(sortUrl)
  // const[category,setCategory] = useState(categoryUrl);
  // const[status,setStatus] = useState(statusUrl);
  // const[priceRange, setPriceRange] = useState([priceMinUrl || 0, priceMaxUrl || 1000000]);
  // const[createAt,setCreateAt]= useState(createdAtUrl)


  // đồng bộ url params với local
  useEffect(() => {
    setSearchInput(searchUrl);
  }, [searchUrl]);
  
  const prevSearchRef = useRef(searchUrl);
  //console.log("totalPage:", totalPage);

  // Update dữ liệu cũ khi searchUrl thay đổi từ URL
  useEffect(() => {
    setSearchInput(searchUrl);
    prevSearchRef.current = searchUrl;
  }, [searchUrl]);
  
  // Debounce 400ms: update URL q
  useEffect(() => {
    const timer = setTimeout(() => {
      const valueSearch = searchInput.trim();
      const valuePage = Number(pageUrl);
      const currentQ = searchParams.get("q") || "";
      //  IMPORTANT: Chỉ update URL + reset page khi keyword (q) thật sự thay đổi.
      // Nếu không check đoạn này, bạn click page=2 cũng có thể bị "đè" về page=1.
      if (valueSearch !== currentQ) {
        if (valueSearch) {
          setSearchParams(
            (prev) => {
              const p = new URLSearchParams(prev);
              p.set("q", valueSearch);
              p.set("page", valuePage);
              return p;
            },
            { replace: true }
          );
        } else {
          // ✅ Xoá search: chỉ xoá q, GIỮ page hiện tại
          setSearchParams(
            (prev) => {
              const p = new URLSearchParams(prev);
              p.delete("q");
              return p;
            },
            { replace: true }
          );

          // ❌ KHÔNG setPage(1) ở đây
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, searchParams, setSearchParams, pageUrl]);

  //  Filter product theo name
  const filteredProducts = useMemo(() => {
    if (!searchUrl.trim()) return product;
    return product.filter((p) =>
      p.name.toLowerCase().includes(searchUrl.toLowerCase())
    );
  }, [product, searchUrl]);

  const totalPage = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  //Tính pagination chỉ hiển thị 8 item ở mỗi trang
  const paginationProduct = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end); // cắt mảng
  }, [filteredProducts, page]);

  // Change Page
  const handleChangePage = (e, value) => {
    setPage(value);

    // ✅ Giữ nguyên q, chỉ update page
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.set("page", String(value)); // ✅ chỉ update page
        return p;
      },
      { replace: true }
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const safeTotal = Math.max(1, totalPage);
    if (Number(page) > safeTotal) setPage(1);
  }, [totalPage, page]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Inventory Manager
        </Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#1565c0",
              transform: "translateY(-2px)",
            },
          }}
        >
          Add Product
        </Button>
      </Box>
      <Box>
        <FilterBar 
          product={product}
        />
      </Box>
      {/* Search Box */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />

        {searchInput && (
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            {filteredProducts.length === 0
              ? "No products found"
              : `Total: ${filteredProducts.length}`}
          </Typography>
        )}
      </Box>

      <Paper elevation={1}>
        <ProductTable
          products={paginationProduct}
          loading={isLoading}
          onRefetch={refetchdata}
          currentPage={page}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Paper>
      {/* ✅ Pagination */}
      {totalPage >= 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPage}
            page={pageUrl}
            onChange={handleChangePage}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
      <CreateItemProduct
        open={openCreate}
        onClose={handleClose}
        onRefetch={refetchdata}
      />
    </Container>
  );
}

export default ListProduct;
