// components/CleanFullDescInfo.js
'use client'
import { useEffect } from 'react';

const CleanFullDescInfo = () => {
    useEffect(() => {
        // Получаем все элементы с классом 'full_desc_info'
        const fullDescElements = document.querySelectorAll('.full_desc_info');

        fullDescElements.forEach(container => {
            // 1. Удаление <p> элементов с содержимым только 't'
            const pElements = container.querySelectorAll('p');

            pElements.forEach(p => {
                const trimmedText = p.textContent.trim();
                if (trimmedText === 't') {
                    p.remove();
                } else {
                    // Замена iHerb на Vitaline в параграфах
                    if (p.textContent.includes('iHerb')) {
                        p.textContent = p.textContent.replace(/iHerb/g, 'Vitaline');
                    }
                }
            });

            // 2. Обработка текстовых узлов
            const treeWalker = document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {
                        const text = node.textContent.trim();
                        if (text === 't') {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        return NodeFilter.FILTER_SKIP;
                    }
                },
                false
            );

            let currentNode = treeWalker.nextNode();
            while (currentNode) {
                const nodeToRemove = currentNode;
                currentNode = treeWalker.nextNode();
                nodeToRemove.parentNode.removeChild(nodeToRemove);
            }

            // 3. Замена iHerb на Vitaline в оставшихся текстовых узлах
            const textWalker = document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            let textNode = textWalker.nextNode();
            while (textNode) {
                if (textNode.textContent.includes('iHerb')) {
                    textNode.textContent = textNode.textContent.replace(/iHerb/g, 'Vitaline');
                }
                textNode = textWalker.nextNode();
            }
        });
    }, []); // Пустой массив зависимостей ensures this runs once on mount

    return null; // Этот компонент не рендерит ничего
};

export default CleanFullDescInfo;