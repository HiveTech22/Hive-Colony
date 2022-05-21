const AuthCard = ({ logo, children }) => (
    <>
        <div className="flex justify-center items-center mb-2">{logo}</div>

        <div className="">{children}</div>
    </>
);

export default AuthCard;
