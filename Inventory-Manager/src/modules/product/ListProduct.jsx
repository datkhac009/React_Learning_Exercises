import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductTable from "./ProductTable";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import { sortProducts } from "../../utils/sortProduct";

function ListProduct({product, isLoading, refetchdata}) {

  const [searchParams, setSearchParams] = useSearchParams();

  const ITEMS_PER_PAGE = 8;

  //  1) Read state from URL
  const q = searchParams.get("q") || ""; // keyword

  const page = Number(searchParams.get("page")) || 1; // current page
  const prevPageRef = useRef(); //nhớ page hiện tại

  //Filter bar
  const categoryParam = searchParams.get("category") || "";
  const statusParam = searchParams.get("status") || "";
  const priceMinParam = Number(searchParams.get("priceMin")) || 0;
  const priceMaxParam = Number(searchParams.get("priceMax")) || 100000000;

  //sort table
  const createdAtParam = searchParams.get("createdAt") || "";
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
    const timer = setTimeout(() => {
      const searchQ = searchInput.trim();
      const currentQ = searchParams.get("q") || "";

      if (searchQ === currentQ) return;

      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);

          //  bắt đầu search => nhớ page hiện tại
          if (!currentQ && searchQ) prevPageRef.current = page;

          // xoá search => page cũ
          if (currentQ && !searchQ) {
            p.delete("q");
            p.set("page", String(prevPageRef.current));
            return p;
          }
          // đổi keyword khi đang search
          p.set("q", searchQ);
          return p;
        },
        { replace: true }
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, searchParams, setSearchParams, page]);

  //  5) Filter name,category,status,price,createAt
  const filteredProducts = useMemo(() => {
    let result = [...product];

    // Search by name
    if (q.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Filter by category
    if (categoryParam) {
      result = result.filter((p) => p.category === categoryParam);
    }

    // Filter by status
    if (statusParam) {
      result = result.filter((p) => p.status === statusParam);
    }

    // Filter by price range
    if (priceMinParam > 0 || priceMaxParam < 100000000) {
      result = result.filter((p) => {
        const price = Number(p.price) || 0;
        return price >= priceMinParam && price <= priceMaxParam;
      });
    }

    // Filter by date
    if (createdAtParam) {
      result = result.filter((p) => {
        const productDate = new Date(p.createdAt).toISOString().split("T")[0];
        return productDate === createdAtParam;
      });
    }

    return result;
  }, [
    product,
    q,
    categoryParam,
    statusParam,
    priceMinParam,
    priceMaxParam,
    createdAtParam,
  ]);

  //  Sort (chỉ sort theo 1 field)
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortField, sortDir);
  }, [filteredProducts, sortField, sortDir]);

  //  Pagination hiện 8 dòng 1 trang

  const paginationProduct = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, page]);

  //  Nếu data thay đổi (filter/sort) làm page hiện tại vượt totalPage
  const totalPage = Math.max(
    1,
    Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (page > totalPage) {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          p.set("page", String(totalPage));
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Inventory Manager
        </Typography>
      </Box>

      {/* Search */}
      <Paper elevation={2} sx={{ p: 0.5, mb: 1, backgroundColor: "white" }}>
        <TextField
          fullWidth
          placeholder="Search products by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
            },
          }}
        />
      </Paper>
      {/* FilterBar  */}
      <Box>
        <FilterBar product={product} />
      </Box>

      {/* message total */}
      {(q || categoryParam || statusParam || createdAtParam) && (
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          {filteredProducts.length === 0
            ? "No products found"
            : `Total: ${filteredProducts.length}`}
        </Typography>
      )}

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
    </Container>
  );
}

export default ListProduct;
