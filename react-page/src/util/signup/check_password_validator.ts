export type check_pass_validate_errors = "" | "no_match_password";
export const check_pass_validate_default_message: { [key in check_pass_validate_errors]: string } = {
    "": "いいね！",
    "no_match_password": "パスワードが一致していません。"
}

export type check_pass_validate_response = {
    valid: boolean,
    error: check_pass_validate_errors
}

export const checkPasswordValidate = (password1: string, password2: string) => {
    let result: check_pass_validate_response = {error: "", valid: true};
    if (password1 !== password2) {
        result.valid = false;
        result.error = "no_match_password";
    }
    return result;
}