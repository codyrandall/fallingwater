module.exports = (str, e) => {
    console.log(str);
    if(e) {
        console.log(e.stack);
    }
    process.exit(1);
};
