$(function () {
    const base = "http://localhost/school/project_school_ver_2/";
    // ================
    // VALIDATION FORM
    // ================
    // check email valid
    function is_email(email) {
        let patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (patt.test(email)) return true;
        return false;
    }
    // check password valid
    function is_password(password) {
        // Tối thiểu tám ký tự, ít nhất một chữ cái và một số
        let patt = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (patt.test(password)) return true;
        return false;
    }
    // form error
    function form_error(status, notifi, _this, action_of) {
        if (!status) {
            $(".error").css({
                "font-style": "italic",
                "color": "#f00",
                "font-size": ".65rem",
                "margin-top": "5px",
            });
            _this.css({
                "border-color": "rgb(242, 142, 142)"
            });
            _this.next(action_of.notification).empty();
            _this.next(action_of.notification).append(notifi);
        } else {
            _this.css({
                "border-color": "#bbb"
            });
            _this.next(".error").attr('style', '');
            _this.next(action_of.notification).empty();
        }
    }

    // redirect
    function redirect(base_URL) {
        window.location = base_URL;
    }

    // user
    //-- login
    var login = {
        wrapper: ".section--login",
        input_email: "input[name='email__address']",
        input_password: "input[name='password']",
        email: "",
        password: "",
        notification: "span.error",
        button_login: "button[name='btn_login']",
        timing: 1200
    }

    var register = {
        wrapper: ".section--register",
        input_email: "input[name='email__address']",
        input_password: "input[name='password']",
        input_confirm__password: "input[name='confirm__password']",
        email: "",
        password: "",
        confirm__password: "",
        notification: "span.error"
    }

    // check email login
    $(login.wrapper).delegate(login.input_email, 'blur', function () {
        let email_login = $(this).val();
        let notifi = "";
        let status = false;
        if (email_login.length == 0) {
            notifi = "Vui lòng nhập một địa chỉ email.";
        } else {
            if (!is_email(email_login)) {
                notifi = "Định dạng email không hợp lệ.";
            } else {
                status = true;
                login.email = email_login;
            }
        }
        let action_of = login;
        form_error(status, notifi, $(this), action_of);
    });

    // check password login
    $(login.wrapper).delegate(login.input_password, 'blur', function () {
        let password_login = $(this).val();
        let notifi = "";
        let status = false;
        if (password_login.length == 0) {
            notifi = "Vui lòng nhập mật khẩu của bạn.";
        } else {
            if (!is_password(password_login)) {
                notifi = "Định dạng mật khẩu không hợp lệ.";
            } else {
                status = true;
                login.password = password_login;
            }
        }
        let action_of = login;
        form_error(status, notifi, $(this), action_of);
    });

    $(login.wrapper).delegate(login.button_login, 'click', function () {
        let error = new Array();
        let email = $(login.input_email).val();
        let password = $(login.input_password).val();
        login.email = email;
        login.password = password;
        if (login.email.length == 0) {
            let _error = "Vui lòng nhập một địa chỉ email.";
            error.push(_error);
        }
        if (login.password.length == 0) {
            let _error = "Vui lòng nhập mật khẩu của bạn.";
            error.push(_error);
        }
        if (error.length == 0) {
            $(this).empty();
            $(this).append('<div class="lds-facebook"><div></div><div></div><div></div></div>');
            setTimeout(function () {
                $(this).empty();
                redirect("index.html");
            }, login.timing);
        }
        event.preventDefault();
    });

    // check email regis
    $(register.wrapper).delegate(register.input_email, 'blur', function () {
        let email_register = $(this).val();
        let notifi = "";
        let status = false;
        if (email_register.length == 0) {
            notifi = "Vui lòng nhập một địa chỉ email.";
        } else {
            if (!is_email(email_register)) {
                notifi = "Định dạng email không hợp lệ.";
            } else {
                status = true;
                register.email = email_register;
            }
        }
        let action_of = register;
        form_error(status, notifi, $(this), action_of);
    });

    // check password regis
    $(register.wrapper).delegate(register.input_password, 'blur', function () {
        let password_register = $(this).val();
        let notifi = "";
        let status = false;
        if (password_register.length == 0) {
            notifi = "Vui lòng nhập một mật khẩu.";
        } else {
            if (!is_password(password_register)) {
                notifi = "Tối thiểu tám ký tự, ít nhất một chữ cái và một số.";
            } else {
                status = true;
                register.password = password_register;
            }
        }
        let action_of = register;
        form_error(status, notifi, $(this), action_of);
    });

    // check confirm password
    $(register.wrapper).delegate(register.input_confirm__password, 'blur', function () {
        let password_confirm__register = $(this).val();
        let notifi = "";
        let status = false;
        if (password_confirm__register.length == 0) {
            notifi = "Vui lòng nhập một mật khẩu.";
        } else {
            if (!is_password(password_confirm__register)) {
                notifi = "Định dạng mật khẩu không hợp lệ.";
            } else {
                if (password_confirm__register != register.password) {
                    notifi = "Mật khẩu của bạn không khớp, vui lòng thử lại.";
                } else {
                    status = true;
                    register.confirm__password = password_confirm__register;
                }
            }
        }
        let action_of = register;
        form_error(status, notifi, $(this), action_of);
    });
});