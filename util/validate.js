var badwordsArray = [
    
];


module.exports = {
    validateEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    containsBadWords: (input) => {
        const lowerCaseInput = input.toLowerCase();
        return badwordsArray.some(word => lowerCaseInput.includes(word));
    }
};