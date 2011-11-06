var samples = {
    'zig-zag': "71,103;72,103;74,99;82,90;92,79;102,68;112,57;119,49;121,46;121,47;124,53;129,63;134,73;139,82;145,87;153,93;160,96;164,98;165,98;165,99;167,99;169,101;171,99;178,91;189,78;201,67;211,58;215,54;217,52;217,53;219,57;222,64;227,74;233,84;238,92;244,96;248,101;251,103;253,102;257,98;267,87;279,74;286,65;291,57;294,54;294,53"
};

test("recognizer", function(){
    var _r = new DollarRecognizer();
    var result = _r.Recognize(stringToPoints(samples['zig-zag']));
    equals(result.Name, "zig-zag");
});

test("converter", function(){
    var c1 = stringToPoints(samples['zig-zag']);
    var cArr = pointsToString(c1);
    var c2 = stringToPoints(cArr);
    deepEqual(c1, c2);
});