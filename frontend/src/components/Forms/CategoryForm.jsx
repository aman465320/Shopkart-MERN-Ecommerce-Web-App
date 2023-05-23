import React from "react";

const CategoryForm = ({ handleSubmit, category, setCategory }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
