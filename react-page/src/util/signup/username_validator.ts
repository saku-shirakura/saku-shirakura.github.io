export type username_validate_errors = "" | "invalid_char_type" | "invalid_username_length";
export const username_validate_default_message: { [key in username_validate_errors]: string } = {
    "": "いいね！",
    "invalid_char_type": "ユーザー名に使用できる文字は、大文字、小文字、数字、または記号「_.@-]です。",
    "invalid_username_length": "ユーザー名は8文字以上でなければなりません。"
}

export type username_validate_response = {
    valid: boolean,
    error: username_validate_errors
}

export const isInvalidUsernameCharType = (username: string) => {
    return !username.match(/^[a-zA-Z0-9_.@-]+$/);
}

export const isInvalidUsernameLength = (username: string) => {
    return !username.match(/^[a-zA-Z0-9_.@-]{8,}$/);
}

export const UsernameValidate = (username: string) => {
    let result: username_validate_response = {error: "", valid: true};
    if (isInvalidUsernameCharType(username)) {
        result.valid = false;
        result.error = "invalid_char_type";
    } else if (isInvalidUsernameLength(username)) {
        result.valid = false;
        result.error = "invalid_username_length";
    }
    return result;
}