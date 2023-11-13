import {useEffect, useState} from "react";

/**
 * 用于计算 ant table scroll y 的值
 *
 * @param tableRef
 * @return {{y: number}}
 */
function useTableScroll(tableRef) {
    const [y, setY] = useState(0);
    const [tableHeaderHeight, setTableHeaderHeight] = useState();

    useEffect(() => {
        const doc = tableRef.current;
        const tHeight = doc.clientHeight;
        const thHeight = doc.getElementsByClassName("ant-table-thead")[0].clientHeight
        setTableHeaderHeight(thHeight);
        setY(tHeight - thHeight)
    }, [tableHeaderHeight]);


    return {y}
}


export default useTableScroll;