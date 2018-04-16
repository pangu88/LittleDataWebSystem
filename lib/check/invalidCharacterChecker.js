var invalidCharacterChecker = {};

invalidCharacterChecker.check = function (s) {
    for (var i = 0; i < s.length; i ++) {
        var c = s[i];
        if (!(c>='a' && c<='z' || c>='A' && c<='Z' || c>='0' && c <= '9')) {
            console.log(`find invalid character '${c}' at index ${i}`);
            return false;
        }
    }
    return true;
}

module.exports = invalidCharacterChecker;