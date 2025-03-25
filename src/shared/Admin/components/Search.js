const Search = ({ idSearch, searchId, handleSearch }) => {
    return (
        <form className="search-admin" role="search">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={idSearch || ''}
                    onChange={searchId}
                />
                <button onClick={handleSearch} type="button">
                    <i class="glyphicon glyphicon-search"></i>
                </button>
            </div>
        </form>
    );
};

export default Search;
