import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Pagination,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductTable from "./ProductTable";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import { sortProducts } from "../../utils/sortProduct";

function ListProduct({ product, isLoading, refetchdata }) {
  // themeMobie
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 10;

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
    const start = (page - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, page, itemsPerPage]);

  //  Nếu data thay đổi (filter/sort) làm page hiện tại vượt totalPage
  const totalPage = Math.max(
    1,
    Math.ceil(sortedProducts.length / itemsPerPage)
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
    <>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="800"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Inventory Manager
          </Typography>
        </Box>

        {/* Search */}
        <Paper
          elevation={2}
          sx={{
            p: 0.5,
            mb: 2.5,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1a1a1a" : "white",
            borderColor: "divider",
          }}
        >
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
            itemsPerPage={itemsPerPage}
            sortField={sortField}
            sortDir={sortDir === "desc" ? "desc" : "asc"} // đảm bảo luôn hợp lệ
          />
        </Paper>

        {/* Pagination dropdown  */}
        <Box
          sx={{
            mt: 2,
            px: { xs: 1, sm: 2 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: { xs: 1.25, sm: 2 },
          }}
        >
          {/* Info */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            Shows line {(page - 1) * itemsPerPage + 1} -{" "}
            {Math.min(page * itemsPerPage, sortedProducts.length)}/
            {sortedProducts.length}
          </Typography>

          {/* Controls */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            {/* Pagination */}
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePage}
              color="primary"
              variant="outlined"
              shape="rounded"
              showFirstButton={!isMobile}
              showLastButton={!isMobile}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={1}
              size={isMobile ? "small" : "medium"}
              sx={{
                "& .MuiPaginationItem-root": { borderRadius: 1 },
                "& .Mui-selected": {
                  backgroundColor: "#1976d2 !important",
                  color: "white !important",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "rgb(17, 82, 147)",
                  color: "white",
                },
              }}
            />

            {/* Items per page selector */}
            <Select
              size="small"
              value={itemsPerPage}
              onChange={(e) => {
                setSearchParams(
                  (prev) => {
                    const p = new URLSearchParams(prev);
                    p.set("itemsPerPage", String(e.target.value));
                    p.set("page", "1");
                    return p;
                  },
                  { replace: true }
                );
              }}
              sx={{
                minWidth: 140,
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              <MenuItem value={10}>10 line / page</MenuItem>
              <MenuItem value={25}>25 line / page</MenuItem>
              <MenuItem value={50}>50 line / page</MenuItem>
            </Select>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ListProduct;
