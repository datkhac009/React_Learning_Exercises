import {
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Button,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterBar({ product }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = 0;
  const maxPrice = 100000000;
  // filter category, status
  const categoryUrl = searchParams.get("category") || "";
  const statusUrl = searchParams.get("status") || "";

  //price range
  const priceMinUrl = Number(searchParams.get("priceMin")) || 0;
  const priceMaxUrl = Number(searchParams.get("priceMax")) || 0;
  // date
  const createdAtUrl = searchParams.get("createdAt") || "";

  //state
  const [category, setCategory] = useState(categoryUrl);
  const [status, setStatus] = useState(statusUrl);
  const [priceRange, setPriceRange] = useState([
    priceMinUrl || 0,
    priceMaxUrl || 1000000,
  ]);
  const [createAt, setCreateAt] = useState(createdAtUrl);

  // Khi back/forward hoặc reload đổi URL -> sync lại state
  useEffect(() => {
    setCategory(categoryUrl);
  }, [categoryUrl]);
  useEffect(() => {
    setStatus(statusUrl);
  }, [statusUrl]);
  useEffect(() => {
    setPriceRange([priceMinUrl || minPrice, priceMaxUrl || maxPrice]);
  }, [priceMinUrl, priceMaxUrl]);
  useEffect(() => {
    setCreateAt((prev) => (prev === createdAtUrl ? prev : createdAtUrl));
  }, [createdAtUrl]);

  const categories = useMemo(() => {
    return [...new Set(product.map((p) => p.category).filter(Boolean))];
  }, [product]);

  // update URL
  const updateParams = (fn) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      fn(p);
      p.set("page", "1"); // đổi filter -> về trang 1
      return p;
    });
  };

  const handleCategory = (value) => {
    setCategory(value);
    updateParams((params) => {
      if (value) {
        params.set("category", value);
      } else {
        params.delete("category");
      }
    });
  };
  const handleStatus = (value) => {
    setStatus(value);
    updateParams((params) => {
      if (value) params.set("status", value);
      else params.delete("status");
    });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  const handlePriceCommit = (value) => {
    updateParams((params) => {
      params.set("priceMin", String(value[0]));
      params.set("priceMax", String(value[1]));
    });
  };

  const handleCreatedAt = (value) => {
    setCreateAt(value);
    updateParams((params) => {
      if (value) params.set("createdAt", value);
      else params.delete("createdAt");
    });
  };

  //Reset Filter
  const handleReset = () => {
    setCategory("");
    setStatus("");
    setPriceRange([minPrice, maxPrice]);
    setCreateAt("");

    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.delete("category");
        p.delete("status");
        p.delete("priceMin");
        p.delete("priceMax");
        p.delete("createdAt");
        p.set("page", "1");
        return p;
      },
      { replace: true }
    );
  };

  const hasActiveFilters =
    category ||
    status ||
    createAt ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  return (
    <Accordion
      defaultExpanded
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px !important",
        "&:before": { display: "none" },
        overflow: "hidden",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? theme.palette.grey[900] : "#f9fafb",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[100],
          borderBottom: "1px solid",
          borderColor: "divider",
          minHeight: 56,
          "&.Mui-expanded": {
            minHeight: 56,
          },
          "& .MuiAccordionSummary-content": {
            my: 1.5,
            alignItems: "center",
            gap: 1.5,
          },
          "& .MuiSvgIcon-root": {
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.7)"
                : "rgba(0,0,0,0.54)",
          },
        }}
      >
        <FilterListIcon
          sx={{
            color: "primary.main",
            fontSize: 22,
          }}
        />
        <Typography variant="body1" fontWeight={600} color="text.primary">
          Filters
        </Typography>

        {hasActiveFilters && (
          <Box
            sx={{
              ml: "auto",
              mr: 2,
              px: 1.5,
              py: 0.25,
              borderRadius: 1,
              backgroundColor: "primary.main",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            Active
          </Box>
        )}
      </AccordionSummary>

      <AccordionDetails>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 1.5,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[850]
                : "#ffffff",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={2}>
            {/* Category + Status */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl sx={{ flex: 3 }}>
                <InputLabel shrink>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => handleCategory(e.target.value)}
                  displayEmpty
                  notched
                  sx={{ height: 46 }}
                >
                  <MenuItem value="">
                    <em>All Categories</em>
                  </MenuItem>
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 2 }}>
                <InputLabel shrink>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => handleStatus(e.target.value)}
                  displayEmpty
                  notched
                  sx={{ height: 46 }}
                >
                  <MenuItem value="">
                    <em>All Status</em>
                  </MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Price + Date*/}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>

              {/* Price */}
              <Box sx={{ flex: 3, minWidth: 0, position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: -9,
                    left: 12,
                    px: 0.5,
                    fontSize: 12,
                    color: "text.secondary",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.grey[850]
                        : "#fff",
                    zIndex: 2,
                  }}
                >
                  Price
                </Box>

                <Box
                  sx={{
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    height: 46,
                    px: 2,
                    position: "relative",
                    overflow: "hidden", 
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      position: "absolute",
                      top: 6,
                      left: "50%",
                      transform: "translateX(-50%)",
                      pointerEvents: "none",
                      whiteSpace: "nowrap",
                      maxWidth: "calc(100% - 32px)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      zIndex: 1,
                    }}
                  >
                    {priceRange[0].toLocaleString()} –{" "}
                    {priceRange[1].toLocaleString()} VND
                  </Typography>

                  <Slider
                    size="small"
                    value={priceRange}
                    onChange={(_, v) => handlePriceChange(v)}
                    onChangeCommitted={(_, v) => handlePriceCommit(v)}
                    min={minPrice}
                    max={maxPrice}
                    step={100000}
                    sx={{
                      width: "100%",
                      mt: 1.6,
                    }}
                  />
                </Box>
              </Box>

              {/* Date */}
              <TextField
                type="date"
                label="Created At"
                value={createAt}
                onChange={(e) => handleCreatedAt(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  flex: 2,
                  "& .MuiInputBase-root": { height: 46 },
                  "& .MuiInputBase-input": { textAlign: "center" },
                }}
              />
            </Stack>

            {/* Reset button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{
                  textTransform: "none",
                  borderRadius: 1,
                  minWidth: 30,
                  height: 36,
                }}
              >
                Reset
              </Button>
            </Box>
          </Stack>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
}

export default FilterBar;
