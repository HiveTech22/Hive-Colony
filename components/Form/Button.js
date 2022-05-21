const Button = ({ type = "submit", className, ...props }) => (
    <button type={type} className={`${className} button`} {...props} />
);

export default Button;
