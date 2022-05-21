const Checkbox = ({ disabled = false, className, children, ...props }) => (
    <label className="inline-flex items-center cursor-pointer">
        <input
            disabled={disabled}
            type="checkbox"
            className={`${className} form-checkbox border-0 rounded text-primary ml-1 w-5 h-5 ease-linear transition-all duration-150`}
            {...props}
        />

        <span className="ml-2 text-sm font-semibold text-primary">
            {children}
        </span>
    </label>
);

export default Checkbox;
