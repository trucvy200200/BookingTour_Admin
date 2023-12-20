export const configHeader = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessTokenUser")}`
    }
}