function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const form = {
            email: document.querySelector("#loginUsername"),
            password: document.querySelector("#loginPassword")
        };

        // Perform your AJAX/Fetch login
    
        fetch("http://localhost:8080/api/v1/account/login", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify([form.email.value, form.password.value]),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.error) {
                setFormMessage(loginForm, "error", "Invalid username/password combination");
            }
            else {
                window.open(
                    "menu.html"
                );
            }
        })
        .catch((err) => {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
            console.log(err);
        });
    });
    

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 3) {
                setInputError(inputElement, "Username must be at least 3 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});




// let button = form.submit.addEventListener("click", (e) => {
//     e.preventDefault();
    
//     fetch(URL, {
//         method: "POST",
//         headers: {
//             Accept: "application/json, text/plain, */*",
//             "Content-Type": "application/json",
//           },
//         body: JSON.stringify({
//             email: form.email.value,
//             password: form.password.value
//         }),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         if (data.error) {
//             setFormMessage(loginForm, "error", "Invalid username/password combination");
//         }
//         else {
//             window.open(
//                 "menu.html"
//             );
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });