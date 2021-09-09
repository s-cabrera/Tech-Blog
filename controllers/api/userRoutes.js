const router = require('express').Router();
const { User } = require('../../models');

/* Endpoint ('/api/user/') */

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json(`No user found with the username: ${req.body.username}`);
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json('Incorrect email or password, please try again');
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json("Something went wrong with the login process");
    }
});

router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);

        //Check to see if email is already used
        const emailExists = await User.findOne({ where: { email: req.body.email } });

        const usernameExists = await User.findOne({ where: { username: req.body.username } });

        if (!emailExists && !usernameExists) {
            const userData = await User.create(req.body);
            if (userData) {
                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.logged_in = true;
                    res.status(200).json(userData);
                });
            }
            
            else{
                res.status(400).json("Your password needs to be at least 8 characters!");
            }
        }
        else if(usernameExists){
            res.status(401).json('Username already exists');
        }
        else {
            res.status(401).json('Email already in use');
        }
    } catch (err) {
        res.status(400).json("Something happened with the signup process!");
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;