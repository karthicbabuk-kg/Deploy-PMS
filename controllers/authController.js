const User = require('../models/User');

exports.authenticateUser = async (req, res) => {
    const { role, username, password } = req.query; // Extract role, username, and password from the request

    try {
        // Check if the user exists with the given role, username, and password
        const user = await User.findOne(role, username, password);

        if (user) {
            req.session.user = { role: user.role, username: user.username };
            res.redirect('/' + role); // Redirect based on the role
        } else {
            res.status(401).send('Unauthorized: Invalid username, password, or role');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.ensureAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
};
