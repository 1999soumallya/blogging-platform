// Just define all feature and required message for scalability
module.exports = {
    commonError: (error) => {
        return { message: 'Internal server error!', success: false, error: error.toString() }
    },
    validationError: (errors) => {
        return { message: "Please fill all mandatory field", success: false, errors: errors }
    },
    middleware: {
        validToken: "Provide valid token to perform this operation.",
        unauthorized: "Your are not authorized to access this platform.",
        requireToken: "Provide valid token to access this platform.",
        unauthorizedOperation: "Your are not authorized to access this operation.",
    },
    authorization: {
        register: {
            success: "You are successfully registered",
            failed: "Your registration process failed",
        },
        login: {
            success: "Login Successful",
            noUser: "Invalid username or password",
            failed: "Login process failed please try after some time",
            wrong: "Wrong Password!",
        },
        details: {
            success: "User details successfully fetched",
            failed: "User details fetch process failed",
            notFound: "User is not found provide correct one"
        },
        logout: {
            success: "Logout Successful",
            failed: "Logout process failed"
        },
    },
    blogs: {
        create: {
            success: "New blog is successfully create",
            failed: "Blog creation process failed",
        },
        update: {
            success: "Blog is successfully updated",
            failed: "Blog update process failed",
            notfound: "Blog is not found provide correct one",
        },
        delete: {
            success: "Blog is successfully deleted",
            failed: "Blog delete process failed",
            notfound: "Blog is not found provide correct one"
        },
        getAll: {
            success: `All blog are successfully fetched`,
            failed: `Blog fetch process failed`
        },
        singleDetails: {
            notfound: "Blog is not found provide correct one",
            success: `Blog details is successfully fetched`,
            failed: `Blog details fetch process failed`
        }
    },
};