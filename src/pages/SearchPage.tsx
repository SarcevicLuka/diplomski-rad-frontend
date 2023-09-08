import { useState } from "react";
import CustomCard from "../components/CustomCard";
import SearchForm from "../components/forms/SearchForm";
import DefaultLayout from "../layouts/Default";
import SearchResultsList from "../components/lists/SearchResultsList";
import { SearchFormData } from "../components/forms/types";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<SearchFormData>();

  return (
    <DefaultLayout>
      <CustomCard title="Search">
        <>
          <SearchForm setSearchTerm={setSearchTerm} />
          <SearchResultsList searchTerm={searchTerm} />
        </>
      </CustomCard>
    </DefaultLayout>
  );
}

export default SearchPage;
