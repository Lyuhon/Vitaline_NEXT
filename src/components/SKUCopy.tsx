"use client";

import { useTranslations } from 'next-intl';

interface SKUCopyProps {
    sku: string;
}

const SKUCopy: React.FC<SKUCopyProps> = ({ sku }) => {
    const t = useTranslations('product');

    const handleCopy = () => {
        navigator.clipboard.writeText(sku.trim())
            .then(() => alert(t('skuCopied')))
            .catch(() => alert(t('skuCopyError')));
    };

    return (
        <div className="sku_here" style={{ marginBottom: "20px" }}>
            <span style={{ fontWeight: "600" }}>{t('skuLabel')} </span>
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