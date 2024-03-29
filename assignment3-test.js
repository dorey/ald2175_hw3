var samples = {
    'triangle': '47,19;36,36;29,52;20,67;39,68;55,66;70,67;85,66;71,46;63,35;57,26;50,19',
    'x': '26,32;40,47;51,60;62,74;63,56;60,41;61,30;49,43;39,55;31,67;23,77',
    'rectangle': '18,35;19,48;20,57;20,68;32,68;43,67;58,65;71,65;79,64;76,51;76,43;74,34;73,30;58,33;49,34;36,35;28,35;21,34',
    'circle': '47,33;37,33;28,40;25,49;25,61;32,71;40,76;50,76;64,75;72,70;76,60;75,48;70,37;61,34;55,33;50,33',
    'check': '19,62;27,72;32,79;37,86;43,76;49,69;55,61;62,51;68,44;73,35',
    'caret': '24,68;30,58;36,48;41,41;46,34;54,45;62,54;68,62;73,67;76,73',
    'zig-zag': '8,52;13,44;18,37;22,30;28,40;33,48;38,55;40,58;43,49;47,45;51,40;56,34;62,43;66,48;70,53;73,57;77,52;81,47;84,41;89,36',
    'arrow': '10,64;25,60;36,56;48,52;53,50;63,46;74,42;80,38;67,35;61,33;52,31;47,30;58,33;66,35;73,37;82,39;79,47;78,55;77,64;78,70',
    'left square bracket': '59,24;49,24;43,25;40,25;40,35;42,43;43,51;44,60;45,69;47,79;48,85;54,83;61,82;67,81;71,80',
    'right square bracket': '31,29;39,30;47,30;52,29;53,36;53,44;54,54;55,60;56,68;56,75;57,80;53,83;44,83;37,83;32,82',
    'v': '18,30;23,41;27,50;33,57;37,64;40,69;47,56;50,51;54,42;57,35;59,31',
    'delete': '29,30;38,37;45,44;52,51;58,59;64,64;63,68;57,68;45,68;37,68;31,68;27,69;27,64;32,57;37,53;42,46;50,39;55,33;60,29',
    'left curly brace': '56,17;50,18;46,25;46,30;49,37;50,42;54,48;54,52;53,56;49,61;45,62;42,62;46,62;48,61;54,62;57,68;55,73;55,79;57,86;62,90;69,92;76,90',
    'right curly brace': '34,14;43,20;45,25;47,33;48,38;47,46;49,53;53,53;58,54;54,57;51,61;51,72;53,80;54,87;43,92;34,94',
    'star': '22,83;27,72;30,65;32,57;34,49;39,41;41,32;44,26;48,35;53,47;56,56;60,64;63,72;65,80;69,84;65,86;58,77;50,70;44,64;37,57;27,52;21,46;15,41;21,41;27,44;33,45;42,47;50,49;56,51;62,54;67,56;72,58;66,60;61,64;50,70;44,75;36,79;29,83;26,86',
    'pigtail': '4,81;14,82;19,80;24,77;35,71;37,65;39,58;39,47;35,41;29,37;23,37;18,43;19,48;21,56;26,62;30,67;36,71;42,73;51,77;57,78;68,80;74,80'
};

test("sample_recognizer", function(){
    var r = new $1Recognizer();
    _.each(samples, function(patternStr, patternName){
        var result = r.recognize($1Recognizer.stringToPoints(patternStr))
        equals(patternName, result.Name, "The sample pattern worked for " + patternName);
    });
});

test("converter", function(){
    _.each(samples, function(patternStr, patternName){
        equals($1Recognizer.pointsToString($1Recognizer.stringToPoints(patternStr)), patternStr)
    });
});

test("simple_template", function(){
    var pt1 = "1,1;2,2;3,3;4,4;5,5;6,6;7,7;8,8;9,9;10,10;11,11";

    // in this test, one point is slightly different
    var pt2 = "1,1;2,2;3,3;4,4;5,5;6,7;7,7;8,8;9,9;10,10;11,11";
    var expectedScore = {
        golden: -41,
        protractor: 74
    };
    var r = new $1Recognizer({
        templates: {
            straight: pt1
        }
    });
    _.each(expectedScore, function(expScore, calc){
        r.useCalculation(calc);
        var result = r.recognize($1Recognizer.stringToPoints(pt2));
        var name = result.Name;
        var score = Math.floor(result.Score*100);
        equals("straight", name);
        equals(expScore, score);
    });
});