export function inputValueTrim(e) {
    let val = e.target.value.trim()
    if (val === '') {
        val = null;
    }
    return val;
}

export function recursiveRemoveEmptyChildren(arr = []) {
    if (arr?.length <= 0) {
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        if (el.children?.length > 0) {
            recursiveRemoveEmptyChildren(el.children);
        } else {
            el.children = null;
        }
    }
}