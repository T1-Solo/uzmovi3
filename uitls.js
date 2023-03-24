function renderElement(element){
    return (
        document.querySelector(element)
    )
}
function CreateTag(tag) {
    return (
        document.createElement(tag)
    )
}
function textNode(text){
    return (
        document.createTextNode(text)
    )
}
function elementId(element){
    return (
        document.getElementById(element)
    )
}