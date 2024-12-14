"use client";

interface SKUCopyProps {
    sku: string;
}

const SKUCopy: React.FC<SKUCopyProps> = ({ sku }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(sku.trim())
            .then(() => alert("Артикул скопирован в буфер обмена!"))
            .catch(() => alert("Ошибка при копировании артикула."));
    };

    return (
        <div className="sku_here" style={{ marginBottom: "20px" }}>
            <span style={{ fontWeight: "600" }}>Артикул: </span>
            <span
                className="sku_copy_click"
                style={{ cursor: "pointer" }}
                onClick={handleCopy}
            >
                {sku}
            </span>
        </div>
    );
};

export default SKUCopy;
