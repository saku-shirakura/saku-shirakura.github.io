import {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {
    username_validate_default_message,
    username_validate_errors,
    UsernameValidate
} from "../util/signup/username_validator";
import {pass_validate_default_message, pass_validate_errors, validatePassword} from "../util/signup/password_validator";
import {
    check_pass_validate_default_message,
    check_pass_validate_errors,
    checkPasswordValidate
} from "../util/signup/check_password_validator";

export const Signup = () => {

    const getPasswordStrengthMessage = (score: number) => {
        if (score <= 2) {
            return `(強度:低 スコア:${score})`;
        } else if (score <= 5) {
            return `(強度:中 スコア:${score})`;
        } else if (score <= 9) {
            return `(強度:高 スコア:${score})`;
        } else {
            return `(強度:最強 スコア:${score})`;
        }
    }

    // ユーザーネーム
    const [validUsername, setValidUsername] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState<username_validate_errors>("");

    useEffect(() => {
        const timeout = setTimeout(onEndInputUsername, 500);
        return () => clearTimeout(timeout);
    }, [username]);

    const onEndInputUsername = () => {
        const usernameValidateStatus = UsernameValidate(username);
        if (username === "") {
            setValidUsername(false);
            setInvalidUsername(false);
        } else if (usernameValidateStatus.valid) {
            setValidUsername(true);
            setInvalidUsername(false);
        } else {
            setValidUsername(false);
            setInvalidUsername(true);
        }
        setUsernameError(usernameValidateStatus.error);
    }
    // パスワード
    const [validPassword, setValidPassword] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<pass_validate_errors>("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(onEndInputPassword, 500);
        return () => clearTimeout(timeout);
    }, [password]);

    const onEndInputPassword = () => {
        const passwordValidateStatus = validatePassword(password);

        if (password === "") {
            setValidPassword(false);
            setInvalidPassword(false);
        } else if (passwordValidateStatus.valid) {
            setValidPassword(true);
            setInvalidPassword(false);
        } else {
            setValidPassword(false);
            setInvalidPassword(true);
        }
        setPasswordError(passwordValidateStatus.error);
        setPasswordStrength(passwordValidateStatus.score);
    }

    // 確認用パスワード
    const [validCheckPassword, setValidCheckPassword] = useState(false);
    const [invalidCheckPassword, setInvalidCheckPassword] = useState(false);
    const [checkPassword, setCheckPassword] = useState("");
    const [checkPasswordError, setCheckPasswordError] = useState<check_pass_validate_errors>("");

    useEffect(() => {
        const timeout = setTimeout(onEndInputCheckPassword, 500);
        return () => clearTimeout(timeout);
    }, [checkPassword]);

    const onEndInputCheckPassword = () => {
        const checkPasswordValidateStatus = checkPasswordValidate(checkPassword, password);
        if (checkPassword === "") {
            setValidCheckPassword(false);
            setInvalidCheckPassword(false);
        } else if (checkPasswordValidateStatus.valid) {
            setValidCheckPassword(true);
            setInvalidCheckPassword(false);
        } else {
            setValidCheckPassword(false);
            setInvalidCheckPassword(true);
        }
        setCheckPasswordError(checkPasswordValidateStatus.error);
    }

    return (
        <>
            <div className="signup__form">
                <Form>
                    <Form.Group className="mb-3" controlId="signupForm.ControlUsername">
                        <Form.Label>ユーザー名</Form.Label>
                        <Form.Control type="text" placeholder="username"
                                      isValid={validUsername}
                                      isInvalid={invalidUsername}
                                      onChange={event => setUsername(event.currentTarget.value)}
                                      required
                        />
                        <Form.Control.Feedback type="invalid">
                            {username_validate_default_message[usernameError]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="signupForm.ControlPassword1">
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control type="password" placeholder="パスワード"
                                      isInvalid={invalidPassword}
                                      isValid={validPassword}
                                      onChange={event => setPassword(event.currentTarget.value)}
                                      required
                        />
                        <Form.Control.Feedback type="valid">
                            {getPasswordStrengthMessage(passwordStrength)}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            {pass_validate_default_message[passwordError]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="signupForm.ControlPassword2">
                        <Form.Label>確認用パスワード</Form.Label>
                        <Form.Control type="password" placeholder="確認用パスワード"
                                      isInvalid={invalidCheckPassword}
                                      isValid={validCheckPassword}
                                      onChange={event => setCheckPassword(event.currentTarget.value)}
                                      required
                        />
                        <Form.Control.Feedback type="invalid">
                            {check_pass_validate_default_message[checkPasswordError]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
                <Button variant="primary" type="button" onClick={() => alert("サインアップ成功！！")}>
                    アカウント作成
                </Button>
            </div>
        </>
    );
}