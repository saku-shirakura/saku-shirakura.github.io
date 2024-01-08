export type pass_validate_errors = "" | "invalid_password_length" | "must_contain_3typesOfChar" | "invalid_char_type";

export const pass_validate_default_message: { [key in pass_validate_errors]: string } = {
    "": "いいね！",
    "invalid_char_type": "パスワードは、大文字、小文字、数字、記号「!@#$%^&*()」で構成されなければなりません。",
    "invalid_password_length": "パスワードは８文字以上である必要があります。",
    "must_contain_3typesOfChar": "パスワードには、大文字、小文字、数字、記号「!@#$%^&*()」うち、いずれか3種類を含む必要があります。",
}

export type pass_validate_response = {
    valid: boolean,
    error: pass_validate_errors,
    score: number
}

export const isInvalidPasswordCharType = (password: string) => {
    // 文字種は、大文字、小文字、数字、記号「!@#$%^&*()」で構成されなければならない。
    return !password.match(/^[a-zA-Z!@#$%^&*()0-9]*$/);
}

export const isInvalidPasswordCharLength = (password: string) => {
    // password validator
    //^[a-zA-Z!@#$%^&*()0-9]{8,}$
    // 文字数は8文字以上でなければならない。
    return !password.match(/^[a-zA-Z!@#$%^&*()0-9]{8,}$/);
}

export const calculateScoreBasePasswordLength = (password: string) => {
    // y = 1/40 * x ^ 2 - ( 1/40 * 8 ^ 2 )
    return Math.pow(password.length, 2) / 40 - 1.6;
}

export const countCharTypes = (password: string) => {
    let count = 0;
    count += password.match(/[a-z]/) ? 1 : 0;
    count += password.match(/[A-Z]/) ? 1 : 0;
    count += password.match(/[!@#$%^&*()]/) ? 1 : 0;
    count += password.match(/[0-9]/) ? 1 : 0;
    return count;
}

export const deductScoreCharConsecutive = (password: string) => {
    // 同じ文字が連続しているなら、3回目から1文字ごとに1点減点。
    let score = 0;
    const match_charConsecutive = password.match(/([a-zA-Z!@#$%^&*()0-9])\1{2,}/g) || null;
    if (match_charConsecutive)
        match_charConsecutive.map(value => {
            const tmp = value.length - 2;
            if (tmp >= 0)
                score += tmp * 1.5;
        });
    return score;
}

export const deductScorePatternConsecutive = (password: string) => {
    let score = 0;
    // 3文字以上の同じパターンが連続で繰り返されている場合、2回目から1回ごとに、1点減点。
    const match_strConsecutive = [...password.matchAll(/([a-zA-Z!@#$%^&*()0-9]{3,})\1+/g)];
    match_strConsecutive.map(value => {
        const tmp = value[0].length / value[1].length - 1;
        if (tmp >= 0)
            score += tmp * 2;
    });
    return score;
}

export const validatePassword = (password: string) => {
    // 0 - 2 -> 低
    // 3 - 5 -> 中
    // 6 - 9 -> 高
    // 10以上 -> 最高
    let validate: pass_validate_response = {
        valid: true,
        error: "",
        score: 0
    };

    if (isInvalidPasswordCharType(password)) {
        validate.valid = false;
        validate.error = "invalid_char_type";
        return validate;
    }

    if (isInvalidPasswordCharLength(password)) {
        validate.valid = false;
        validate.error = "invalid_password_length";
        return validate;
    }

    // 加点 //
    // 文字数による得点。
    validate.score = calculateScoreBasePasswordLength(password);
    // 文字種がいくつ含まれるか？
    const count = countCharTypes(password);

    // 文字種が3種未満なら、無効なパスワードとして応答
    if (count < 3) {
        validate.valid = false;
        validate.error = "must_contain_3typesOfChar";
        return validate;
    }
    validate.score += count * 2;
    // 減点 //

    // 同じ文字が連続しているなら、3回目から1文字ごとに1点減点。
    validate.score -= deductScoreCharConsecutive(password);

    // 3文字以上の同じパターンが連続で繰り返されている場合、2回目から1回ごとに、1点減点。
    validate.score -= deductScorePatternConsecutive(password);

    return validate;
}