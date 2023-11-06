export function inputValueTrim(e) {
    let val = e.target.value.trim()
    if (val === '') {
        val = null;
    }
    return val;
}