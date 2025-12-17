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
import { useState, useMemo, useEffect } from "react";
import CreateItemProduct from "./CreateItemProduct";
import { useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import { sortProducts } from "../../utils/sortProduct";

function ListProduct() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { product, isLoading, refetchdata } = useProduct(API_BASE_URL);

  const [searchParams, setSearchParams] = useSearchParams();

  const ITEMS_PER_PAGE = 8;

  //  1) Read state from URL 
  const q = searchParams.get("q") || ""; // keyword

  const page = Number(searchParams.get("page")) || 1; // current page
  const sort = searchParams.get("sort") || ""; // "name:asc"
  const [sortField, sortDir] = sort ? sort.split(":") : ["", ""];

  //  2) Local input state (để debounce, không gõ phát là đổi URL ngay)
  const [searchInput, setSearchInput] = useState(q);

  //  3) Back/Forward/Reload: khi URL đổi -> sync lại input
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  //  4) Debounce: user gõ xong 400ms mới cập nhật URL
  useEffect(() => {
    const t = setTimeout(() => {
      const nextQ = searchInput.trim();
      const currentQ = searchParams.get("q") || "";

      // Nếu không đổi gì thì thôi (tránh setSearchParams thừa)
      if (nextQ === currentQ) return;

      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);

          if (nextQ) p.set("q", nextQ);
          else p.delete("q"); // xóa search

          p.set("page", "1"); // keyword đổi => quay về trang 1
          return p;
        },
        { replace: true }
      );
    }, 400);

    return () => clearTimeout(t);
  }, [searchInput, searchParams, setSearchParams]);

  //  5) Filter theo name (dựa trên q trong URL)
  const filteredProducts = useMemo(() => {
    if (!q.trim()) return product;
    return product.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase())
    );
  }, [product, q]);

  //  Sort (chỉ sort theo 1 field)
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortField, sortDir);
  }, [filteredProducts, sortField, sortDir]);

  //  Pagination hiện 8 dòng 1 trang
  const totalPage = Math.max(1 ,Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));

  const paginationProduct = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, page]);

  //  Nếu data thay đổi (filter/sort) làm page hiện tại vượt totalPage => ép về page 1
  useEffect(() => {
    if (page > totalPage) {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          p.set("page", "1");
          return p;
        },
        { replace: true }
      );
    }
  }, [page, totalPage, setSearchParams]);

  //  Change page: chỉ update page trong URL
  const handleChangePage = (_, value) => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.set("page", String(value));
        return p;
      },
      { replace: true }
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //   Toggle sort: asc -> desc -> clear
  const toggleSort = (field) => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        const current = p.get("sort") || "";
        const [currentField, currentDif] = current.split(":");

        let next = "";
        if (currentField !== field) next = `${field}:asc`;
        else if (currentDif === "asc") next = `${field}:desc`;
        else next = ""; // clear sort

        if (next) p.set("sort", next);
        else p.delete("sort");

        return p;
      },
      { replace: true }
    );
  };

  //  Dialog Create
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpen = () => setOpenCreate(true);
  const handleClose = () => setOpenCreate(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
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
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            transition: "all 0.3s ease-in-out",
            "&:hover": { backgroundColor: "#1565c0", transform: "translateY(-2px)" },
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* FilterBar (nếu có) */}
      <Box>
        <FilterBar product={product} />
      </Box>

      {/* Search */}
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
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />

        {q && (
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            {filteredProducts.length === 0
              ? "No products found"
              : `Total: ${filteredProducts.length}`}
          </Typography>
        )}
      </Box>

      {/* Table */}
      <Paper elevation={1}>
        <ProductTable
          toggleSort={toggleSort}
          products={paginationProduct}
          loading={isLoading}
          onRefetch={refetchdata}
          currentPage={page}
          itemsPerPage={ITEMS_PER_PAGE}
          sortField={sortField}
          sortDir={sortDir === "desc" ? "desc" : "asc"} // đảm bảo luôn hợp lệ
        />
      </Paper>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPage}
          page={page}
          onChange={handleChangePage}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Create Dialog */}
      <CreateItemProduct open={openCreate} onClose={handleClose} onRefetch={refetchdata} />
    </Container>
  );
}

export default ListProduct;
