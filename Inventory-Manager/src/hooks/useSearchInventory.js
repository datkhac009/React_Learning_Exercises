import { useCallback,  useState } from "react";

function useSearchInventory(url) {
  const baseurl = `${url.replace(/\/$/, "")}/products`;
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const searchIventory = useCallback(
    async (query) => {
       if (!query?.trim()) {
        setSearchResults([]);
        setError(null);
        return [];
      }
      try {
        setIsSearch(true);
        setError(null);
        const res = await fetch(`${baseurl}?name_like=${encodeURIComponent(query.trim())}`);

        const searchData = await res.json();
        if (query.trim() && searchData.length === 0)
          setError("Không tìm thấy sản phẩm.");
        setSearchResults(searchData);

        return searchData;
      } catch (error) {
        setError(error.message || "Có lỗi xảy ra.");
        setSearchResults([]);
        return [];
      } finally {
        setIsSearch(false);
      }
    },
    [baseurl]
  );
  return { searchIventory, searchResults, isSearch, error };
}

export default useSearchInventory;
