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
  AccordionActions,
  AccordionDetails,
} from "@mui/material";
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

  // local state
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

  // helper update URL
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
    setCategory(value);
    updateParams((params) => {
      if (value) {
        params.set("status", value);
      } else {
        params.delete("status");
      }
    });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  const handlePriceCommit = (value) => {
    console.log(value);
  };

  const handleCreatedAt = (value) => {
    setCreateAt(value);
    updateParams((params) => {
      if (value) {
        params.set("createAt", value);
      } else {
        params.delete("createAt");
      }
    });
  };

  //Reset Filter
  const handleReset = () => {
    setCategory("");
    setStatus("");
    setPriceRange([minPrice, maxPrice]);
    setCreateAt("");

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("caterory");
      params.delete("status");
      params.delete("priceMin");
      params.delete("priceMax");
      params.delete("createAt");
      return params;
    });
  };

  // Count active filters
//   const activeCount = [
//     categoryUrl,
//     statusUrl,
//     priceMinUrl !== minPrice || priceMaxUrl !== maxPrice,
//     createdAtUrl,
//   ].filter(Boolean).length;
  return (
    <Accordion>
      {/* <AccordionDetails>Filter Product</AccordionDetails> */}
      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 170 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => handleCategory(e.target.value)}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 170 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => handleStatus(e.target.value)}
            >
              {/* <MenuItem value="">All</MenuItem> */}
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ minWidth: 280, flex: 1 }}>
            <Typography
              variant="body2"
              sx={{ mb: 0.5, color: "text.secondary" }}
            >
              Price Range: {priceRange[0].toLocaleString()} VND -{" "}
              {priceRange[1].toLocaleString()} VND
            </Typography>
            <Slider
              value={priceRange}
              onChange={(e) => handlePriceChange(e.target.value)}
              onChangeCommitted={(e) => handlePriceCommit(e.target.value)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${(value / 1000000).toFixed(1)}M`}
              min={minPrice}
              max={maxPrice}
              step={100000}
            />
          </Box>

          <TextField
            size="small"
            type="date"
            label="Created At"
            value={createAt}
            onChange={(e) => handleCreatedAt(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ textTransform: "none", borderRadius: 2, ml: "auto" }}
          >
            Reset
          </Button>
        </Stack>
      </Paper>
      <AccordionActions>
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </AccordionActions>
    </Accordion>
  );
}

export default FilterBar;
