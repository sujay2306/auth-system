
    const existingUser = User.findOne({ email })
        if (existingUser){
            res.status(401).send("user already exists")
        }