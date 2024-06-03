const FormDesc = ({ label, name, defaultValue, size, rows }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
        rows={rows}
      />
    </div>
  );
};

export default FormDesc;
