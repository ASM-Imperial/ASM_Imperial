# Pagination Implementation for AllCollections Component

## Tasks
- [ ] Add React state for currentPage (default 1) and itemsPerPage (16)
- [ ] Calculate totalPages dynamically using Math.ceil(carpets.length / itemsPerPage)
- [ ] Slice the carpets array to get current page items
- [ ] Update the grid to render only current page carpets
- [ ] Add pagination controls UI below the grid (Previous, page numbers, Next)
- [ ] Implement event handlers for page navigation
- [ ] Ensure pagination handles edge cases (first/last page)
