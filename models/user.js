exports.createuser = (name, email, password) => {
    // TODO: save in DB
    // eslint-disable-next-line no-console
    console.log(name, email, password);
    return { name, email };
};
