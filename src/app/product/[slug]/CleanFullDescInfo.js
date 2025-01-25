// components/CleanFullDescInfo.js
'use client'
import { useEffect } from 'react';

const CleanFullDescInfo = () => {
    useEffect(() => {
        // Ваш JavaScript код для удаления <p> элементов и текстовых узлов с "t"

        // Получаем все элементы с классом 'full_desc_info'
        const fullDescElements = document.querySelectorAll('.full_desc_info');

        fullDescElements.forEach(container => {
            // 1. Удаление <p> элементов с содержимым только 't'
            const pElements = container.querySelectorAll('p');

            pElements.forEach(p => {
                const trimmedText = p.textContent.trim();
                if (trimmedText === 't') {
                    p.remove();
                    console.log('Удалён <p> с "t":', p);
                }
            });

            // 2. Удаление текстовых узлов с содержимым только 't'
            // Создаем TreeWalker для обхода всех текстовых узлов внутри контейнера
            const treeWalker = document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {
                        if (node.textContent.trim() === 't') {
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
                console.log('Удалён текстовый узел с "t":', nodeToRemove);
            }
        });
    }, []); // Пустой массив зависимостей ensures this runs once on mount

    return null; // Этот компонент не рендерит ничего
};

export default CleanFullDescInfo;
