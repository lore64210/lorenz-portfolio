export default function AccordeonHeader({
    header,
    index,
    setSelectedIndex,
    selectedIndex,
    headerClassName = "",
}) {
    const handleClick = () => {
        setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    return (
        <div
            className={`${headerClassName} accordeon-header`}
            onClick={handleClick}
            style={
                selectedIndex === index
                    ? {
                          padding: "0.5em",
                          backgroundColor: "orange",
                          color: "#222831",
                      }
                    : {}
            }
        >
            {header}
        </div>
    );
}
