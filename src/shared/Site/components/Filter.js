const Filter = ({ changeSort }) => {
    return (
        <div className="filter">
            <span className="filter-text">Sắp xếp sản phẩm</span>
            <select
                className="filter-list"
                onChange={(e) => {
                    changeSort(e.target.value);
                }}
            >
                <option value="_idv-1">Mới nhất</option>
                <option value="_idv1">Cũ nhất</option>
                <option value="pricev1">Giá thấp đến cao</option>
                <option value="pricev-1">Giá cao đến thấp</option>
            </select>
        </div>
    );
};

export default Filter;
