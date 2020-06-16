const getCookieByName = function getCookieByName( name ) {
    const cookies = '; ' + document.cookie;
    const required_cookie = cookies.split('; ' + name + '=');
    if (required_cookie.length === 2) {
        return String(required_cookie.pop().split(';').shift());
    } else {
        return "";
    }
}

export default getCookieByName;
