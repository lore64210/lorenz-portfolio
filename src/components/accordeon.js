"use client";
import { Fragment, useState } from "react";
import AccordeonHeader from "./accordeonHeader";

export default function Accordeon({ items, headerClassName }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <>
            {items.map(
                ({ header, content, show, key }, index) =>
                    show && (
                        <Fragment key={key ?? index}>
                            <AccordeonHeader
                                headerClassName={headerClassName}
                                items={items}
                                index={index}
                                selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                                header={header}
                            />
                            <div
                                className={`accordeon-content ${
                                    index === selectedIndex ? "open" : ""
                                }`}
                            >
                                {content}
                            </div>
                        </Fragment>
                    )
            )}
        </>
    );
}
