// ─── BRAWL.AI Question Database ─────────────────────────────────
// 1000+ questions generated from 50 patterns × 20 variants each.
// Each question: { id, title, difficulty, category, description, example:{input,output}, answer[], hint, xp, tags }

const gen = (pfx, title, diff, cat, desc, hint, xp, tags, variants) =>
  variants.map(([inp, out], i) => ({
    id: `${pfx}-${i+1}`,
    title,
    difficulty: diff,
    category: cat,
    description: desc,
    example: { input: String(inp), output: String(out) },
    answer: [String(out)],
    hint: `${hint} → ${out}`,
    xp,
    tags,
  }));

// ══════════════════════════════════════════════════════════════
// EASY — ARRAYS
// ══════════════════════════════════════════════════════════════
const EA1 = gen('ea-max','Find Maximum','Easy','Arrays',
  'Return the [[maximum]] element in the array.',
  'Scan all elements, track the largest',10,['Array','Search'],[
  ['[3,7,2,9,4]',9],['[1,5,8,2,6]',8],['[10,3,15,7,2]',15],['[4,4,4,4,5]',5],
  ['[100,200,50,75]',200],['[-5,-1,-3,-2]',-1],['[0,0,1,0]',1],['[7]',7],
  ['[1,2,3,4,5]',5],['[5,4,3,2,1]',5],['[3,3,3,8,3]',8],['[11,22,33,44]',44],
  ['[9,1,9,1,9]',9],['[6,2,8,4,10]',10],['[50,100,25,75]',100],['[1,1000,1,1]',1000],
  ['[2,4,6,8,10]',10],['[13,7,19,3]',19],['[42,17,39,8]',42],['[5,5,5,6]',6],
]);

const EA2 = gen('ea-min','Find Minimum','Easy','Arrays',
  'Return the [[minimum]] element in the array.',
  'Scan all elements, track the smallest',10,['Array','Search'],[
  ['[3,7,2,9,4]',2],['[1,5,8,2,6]',1],['[10,3,15,7,2]',2],['[4,4,4,4,5]',4],
  ['[100,200,50,75]',50],['[-5,-1,-3,-2]',-5],['[0,0,1,0]',0],['[7]',7],
  ['[1,2,3,4,5]',1],['[5,4,3,2,1]',1],['[3,3,3,8,3]',3],['[11,22,33,44]',11],
  ['[9,1,9,1,9]',1],['[6,2,8,4,10]',2],['[50,100,25,75]',25],['[1,1000,1,1]',1],
  ['[2,4,6,8,10]',2],['[13,7,19,3]',3],['[42,17,39,8]',8],['[5,5,5,6]',5],
]);

const EA3 = gen('ea-sum','Sum of Array','Easy','Arrays',
  'Return the [[sum]] of all elements in the array.',
  'Add every element together',10,['Array','Math'],[
  ['[1,2,3,4,5]',15],['[10,20,30]',60],['[1,1,1,1]',4],['[5,5,5,5,5]',25],
  ['[0,0,0,0]',0],['[100,200,300]',600],['[7,3,5]',15],['[2,4,6,8]',20],
  ['[1,10,100]',111],['[-1,-2,-3]',-6],['[0,1]',1],['[3,7]',10],
  ['[11,9]',20],['[50,50]',100],['[25,25,25,25]',100],['[1,2,3]',6],
  ['[10,10,10,10]',40],['[4,3,2,1]',10],['[6,8,4,2]',20],['[12,13]',25],
]);

const EA4 = gen('ea-first','First Element','Easy','Arrays',
  'Return the [[first]] element of the array.',
  'Access index 0',10,['Array','Indexing'],[
  ['[3,7,2,9,4]',3],['[1,5,8,2,6]',1],['[10,3,15,7,2]',10],['[42,17,39]',42],
  ['[100,200,50]',100],['[0,5,9]',0],['[7,8,9]',7],['[99,1,2,3]',99],
  ['[-1,0,1]',-1],['[5,5,5]',5],['[2024,2025]',2024],['[1000,1]',1000],
  ['[0,0,0]',0],['[13,7,19]',13],['[4,3,2,1]',4],['[6,8,4,2]',6],
  ['[50,25,75]',50],['[11,22,33]',11],['[9,1,9]',9],['[5,5,6]',5],
]);

const EA5 = gen('ea-last','Last Element','Easy','Arrays',
  'Return the [[last]] element of the array.',
  'Access index length-1',10,['Array','Indexing'],[
  ['[3,7,2,9,4]',4],['[1,5,8,2,6]',6],['[10,3,15,7,2]',2],['[42,17,39]',39],
  ['[100,200,50]',50],['[0,5,9]',9],['[7,8,9]',9],['[99,1,2,3]',3],
  ['[-1,0,1]',1],['[5,5,5]',5],['[2024,2025]',2025],['[1000,1]',1],
  ['[0,0,0]',0],['[13,7,19]',19],['[4,3,2,1]',1],['[6,8,4,2]',2],
  ['[50,25,75]',75],['[11,22,33]',33],['[9,1,9]',9],['[5,5,6]',6],
]);

// ══════════════════════════════════════════════════════════════
// EASY — STRINGS
// ══════════════════════════════════════════════════════════════
const ES1 = gen('es-len','String Length','Easy','Strings',
  'Return the [[length]] of the given string.',
  'Count every character',10,['String','Basic'],[
  ['"hello"',5],['"world"',5],['"brawl"',5],['"ai"',2],['"code"',4],
  ['"python"',6],['"java"',4],['"array"',5],['"stack"',5],['"queue"',5],
  ['"algorithm"',9],['"function"',8],['"variable"',8],['"string"',6],['"number"',6],
  ['"boolean"',7],['"object"',6],['"loop"',4],['"data"',4],['"node"',4],
]);

const ES2 = gen('es-rev','Reverse String','Easy','Strings',
  '[[Reverse]] the given string.',
  'Read characters right to left',10,['String','Basic'],[
  ['"hello"','"olleh"'],['"world"','"dlrow"'],['"abc"','"cba"'],['"12345"','"54321"'],
  ['"brawl"','"lwarb"'],['"code"','"edoc"'],['"java"','"avaj"'],['"ai"','"ia"'],
  ['"stack"','"kcats"'],['"loop"','"pool"'],['"python"','"nohtyp"'],['"cyber"','"rebyc"'],
  ['"neon"','"noen"'],['"data"','"atad"'],['"node"','"edon"'],['"test"','"tset"'],
  ['"array"','"yarra"'],['"queue"','"eueuq"'],['"tree"','"eert"'],['"graph"','"hparg"'],
]);

const ES3 = gen('es-pal','Is Palindrome','Easy','Strings',
  'Return [[true]] if the string is a [[palindrome]], else [[false]].',
  'Check if string equals its reverse',10,['String','Logic'],[
  ['"racecar"','true'],['"hello"','false'],['"madam"','true'],['"level"','true'],
  ['"world"','false'],['"radar"','true'],['"noon"','true'],['"code"','false'],
  ['"civic"','true'],['"refer"','true'],['"python"','false'],['"kayak"','true'],
  ['"java"','false'],['"deed"','true'],['"stack"','false'],['"abcba"','true'],
  ['"abcd"','false'],['"aaa"','true'],['"abba"','true'],['"xyz"','false'],
]);

const ES4 = gen('es-vowel','Count Vowels','Easy','Strings',
  'Count the number of [[vowels]] (a,e,i,o,u) in the string.',
  'Count a,e,i,o,u occurrences',10,['String','Counting'],[
  ['"hello"',2],['"world"',1],['"python"',1],['"algorithm"',3],['"interface"',4],
  ['"array"',2],['"queue"',3],['"stack"',1],['"tree"',2],['"graph"',1],
  ['"code"',2],['"data"',2],['"ai"',2],['"java"',2],['"brawl"',1],
  ['"string"',1],['"function"',3],['"variable"',4],['"operator"',4],['"recursion"',4],
]);

const ES5 = gen('es-upper','Uppercase String','Easy','Strings',
  'Return the [[uppercase]] version of the string.',
  'Convert all letters to uppercase',10,['String','Transform'],[
  ['"hello"','"HELLO"'],['"world"','"WORLD"'],['"brawl"','"BRAWL"'],['"code"','"CODE"'],
  ['"java"','"JAVA"'],['"ai"','"AI"'],['"stack"','"STACK"'],['"node"','"NODE"'],
  ['"data"','"DATA"'],['"loop"','"LOOP"'],['"python"','"PYTHON"'],['"cyber"','"CYBER"'],
  ['"neon"','"NEON"'],['"tree"','"TREE"'],['"graph"','"GRAPH"'],['"array"','"ARRAY"'],
  ['"queue"','"QUEUE"'],['"test"','"TEST"'],['"flag"','"FLAG"'],['"swap"','"SWAP"'],
]);

// ══════════════════════════════════════════════════════════════
// EASY — MATH
// ══════════════════════════════════════════════════════════════
const EM1 = gen('em-fact','Factorial','Easy','Math',
  'Compute [[n!]] (factorial of n).',
  'Multiply n × (n-1) × ... × 1',10,['Math','Recursion'],[
  ['0!',1],['1!',1],['2!',2],['3!',6],['4!',24],['5!',120],['6!',720],['7!',5040],
  ['8!',40320],['9!',362880],['10!',3628800],['3!+2!',8],['4!-3!',18],
  ['2!+2!',4],['5!-4!',96],['6!-5!',600],['4!/2',12],['3!*2',12],['2!^3',8],['1!+1!',2],
]);

const EM2 = gen('em-power','Power of 2','Easy','Math',
  'Return 2 raised to the power of n: [[2^n]].',
  'Multiply 2 by itself n times',10,['Math','Binary'],[
  ['2^0',1],['2^1',2],['2^2',4],['2^3',8],['2^4',16],['2^5',32],['2^6',64],['2^7',128],
  ['2^8',256],['2^9',512],['2^10',1024],['2^11',2048],['2^12',4096],['2^13',8192],
  ['2^14',16384],['2^15',32768],['2^16',65536],['2^3+2^2',12],['2^4-2^3',8],['2^2*2^3',32],
]);

const EM3 = gen('em-fizz','FizzBuzz','Easy','Math',
  'Output [[FizzBuzz]] if divisible by 3 and 5, [[Fizz]] if by 3, [[Buzz]] if by 5, else the number.',
  'Check divisibility by 3 and 5',10,['Math','Logic'],[
  [15,'FizzBuzz'],[3,'Fizz'],[5,'Buzz'],[1,1],[30,'FizzBuzz'],[9,'Fizz'],[25,'Buzz'],
  [7,7],[45,'FizzBuzz'],[12,'Fizz'],[10,'Buzz'],[11,11],[60,'FizzBuzz'],[6,'Fizz'],
  [20,'Buzz'],[13,13],[90,'FizzBuzz'],[21,'Fizz'],[35,'Buzz'],[17,17],
]);

const EM4 = gen('em-iseven','Is Even','Easy','Math',
  'Return [[true]] if the number is [[even]], else [[false]].',
  'Check if number % 2 === 0',10,['Math','Logic'],[
  [2,'true'],[3,'false'],[0,'true'],[7,'false'],[100,'true'],[99,'false'],
  [4,'true'],[5,'false'],[1000,'true'],[1001,'false'],[12,'true'],[13,'false'],
  [8,'true'],[9,'false'],[20,'true'],[21,'false'],[50,'true'],[51,'false'],
  [64,'true'],[65,'false'],
]);

const EM5 = gen('em-fib','Fibonacci Number','Easy','Math',
  'Return the nth [[Fibonacci]] number (0-indexed, F(0)=0, F(1)=1).',
  'F(n) = F(n-1) + F(n-2)',10,['Math','Recursion'],[
  ['F(0)',0],['F(1)',1],['F(2)',1],['F(3)',2],['F(4)',3],['F(5)',5],['F(6)',8],
  ['F(7)',13],['F(8)',21],['F(9)',34],['F(10)',55],['F(11)',89],['F(12)',144],
  ['F(13)',233],['F(14)',377],['F(15)',610],['F(16)',985],['F(17)',1597],
  ['F(18)',2584],['F(19)',4181],
]);

// ══════════════════════════════════════════════════════════════
// EASY — STACK & SORTING (quick warm-ups)
// ══════════════════════════════════════════════════════════════
const EStack1 = gen('e-stk-top','Stack Top','Easy','Stack',
  'After push operations, what is the [[top]] of the stack?',
  'The last pushed element is on top',10,['Stack','LIFO'],[
  ['push(1),push(2),push(3) → top?',3],['push(5),push(10) → top?',10],
  ['push(7) → top?',7],['push(1),push(2) → top?',2],['push(9),push(4),push(6) → top?',6],
  ['push(3),push(3) → top?',3],['push(100) → top?',100],['push(2),push(4),push(8) → top?',8],
  ['push(0),push(1) → top?',1],['push(42) → top?',42],
  ['push(1),push(2),push(3),pop(),top?',2],['push(5),push(6),pop(),top?',5],
  ['push(7),push(8),push(9),pop(),top?',8],['push(1),pop(),push(2),top?',2],
  ['push(10),push(20),pop(),pop(),push(30),top?',30],
  ['push(3),push(6),push(9),pop(),pop(),top?',3],
  ['push(1),push(2),push(3),pop(),pop(),top?',1],
  ['push(5),push(10),push(15),pop(),top?',10],
  ['push(2),push(4),pop(),push(8),top?',8],
  ['push(9),push(7),push(5),pop(),top?',7],
]);

const ESort1 = gen('e-sort-bubble','Bubble Sort Step','Easy','Sorting',
  'After ONE pass of bubble sort, what is the [[last element]]?',
  'The largest element bubbles to the end in one pass',10,['Sorting','Array'],[
  ['[3,1,2]',3],['[5,2,4,1]',5],['[9,7,5,3]',9],['[4,2,6,1]',6],
  ['[10,3,2,7]',10],['[1,3,2]',3],['[8,5,3,9]',9],['[2,1,4,3]',4],
  ['[6,4,2,8]',8],['[5,1,3,2]',5],['[7,8,6,5]',8],['[1,2,3,4]',4],
  ['[4,3,2,1]',4],['[3,5,1,4]',5],['[9,2,7,4]',9],['[6,1,8,3]',8],
  ['[2,7,1,5]',7],['[10,1,5,2]',10],['[3,8,2,6]',8],['[1,9,4,7]',9],
]);

// ══════════════════════════════════════════════════════════════
// MEDIUM — ARRAYS
// ══════════════════════════════════════════════════════════════
const MA1 = gen('ma-two','Two Sum Indices','Medium','Arrays',
  'Find two indices whose values add up to [[target]]. Return as [i,j].',
  'Use a hash map or nested loop to find the pair',20,['Array','HashMap'],[
  ['[2,7,11,15], target=9','[0,1]'],['[3,2,4], target=6','[1,2]'],
  ['[1,5,3,2], target=8','[1,2]'],['[4,6,2,8], target=10','[0,3]'],
  ['[1,2,3,4], target=7','[2,3]'],['[5,5], target=10','[0,1]'],
  ['[2,3,5,7], target=9','[1,3]'],['[1,4,7,3], target=10','[1,2]'],
  ['[3,5,6,2], target=8','[0,2]'],['[2,6,4,8], target=10','[0,3]'],
  ['[1,3,5,7], target=12','[2,3]'],['[4,2,6,8], target=6','[0,1]'],
  ['[10,20,30], target=50','[1,2]'],['[1,9,5,3], target=10','[0,1]'],
  ['[7,3,4,2], target=7','[1,2]'],['[5,3,8,1], target=9','[0,2]'],
  ['[2,4,6,8], target=14','[2,3]'],['[1,6,3,9], target=12','[1,3]'],
  ['[3,7,2,5], target=12','[1,2]'],['[4,4,4,4], target=8','[0,1]'],
]);

const MA2 = gen('ma-2nd','Second Largest','Medium','Arrays',
  'Find the [[second largest]] element in the array.',
  'Sort descending, pick index 1',20,['Array','Sorting'],[
  ['[1,5,3,8,4]',5],['[3,7,2,9,4]',7],['[10,3,15,7,2]',10],['[4,6,2,8,1]',6],
  ['[5,5,5,6,6]',5],['[1,2,3,4,5]',4],['[9,8,7,6]',8],['[100,50,75,25]',75],
  ['[1,1,2,2]',1],['[3,3,3,4]',3],['[10,9,8,7]',9],['[20,15,10,5]',15],
  ['[2,4,6,8,10]',8],['[11,22,33,44]',33],['[5,3,1,4,2]',4],['[50,100,75,25]',75],
  ['[6,2,8,4,10]',8],['[7,3,9,5,1]',7],['[13,7,19,3]',13],['[42,17,39,8]',39],
]);

const MA3 = gen('ma-miss','Missing Number','Medium','Arrays',
  'Find the [[missing number]] in the sequence 1 to n.',
  'Expected sum = n*(n+1)/2, subtract actual sum',20,['Array','Math'],[
  ['[1,2,4,5] (n=5)',3],['[1,3,4,5] (n=5)',2],['[2,3,4,5] (n=5)',1],
  ['[1,2,3,5] (n=5)',4],['[1,2,3,4] (n=5)',5],['[1,3,4,5,6] (n=6)',2],
  ['[1,2,4,5,6] (n=6)',3],['[2,3,4,5,6] (n=6)',1],['[1,2,3,4,6] (n=6)',5],
  ['[1,2,3,4,5,6] missing... (n=7)',7],['[1,2,3,5,6,7] (n=7)',4],
  ['[2,3,4,5,6,7] (n=7)',1],['[1,2,4,5,6,7] (n=7)',3],
  ['[1,3,4,5,6,7] (n=7)',2],['[1,2,3,4,5,7] (n=7)',6],
  ['[1,2,3,4] (n=4) missing?... all here; n+1',5],
  ['[1,2,4] (n=4)',3],['[2,3,4] (n=4)',1],['[1,3,4] (n=4)',2],['[1,2,3] (n=4)',4],
]);

const MA4 = gen('ma-dist','Count Distinct','Medium','Arrays',
  'Return the number of [[distinct]] (unique) elements in the array.',
  'Use a set to count unique values',20,['Array','Hashing'],[
  ['[1,2,2,3,3,3]',3],['[1,1,1,1]',1],['[1,2,3,4,5]',5],['[5,5,4,4,3,3]',3],
  ['[1,2,1,2,1]',2],['[7,8,9,7,8]',3],['[1,1,2,2,3,3,4,4]',4],['[10,10,10]',1],
  ['[1,2,3,3,2,1]',3],['[4,4,4,4,4]',1],['[1,3,5,7,9]',5],['[2,4,6,8,2,4]',4],
  ['[0,0,1,1,2,2]',3],['[5,6,7,8,9,5]',5],['[1,2,3,4,4,3]',4],
  ['[10,20,30,10,20]',3],['[1,1,1,2,3]',3],['[7,7,8,8,9,9]',3],
  ['[3,3,3,3,4,5]',3],['[1,2,3,4,5,1]',5],
]);

const MA5 = gen('ma-rot','Rotate Array Left by 1','Medium','Arrays',
  '[[Rotate]] the array left by 1 position. Show the resulting array.',
  'Move first element to end',20,['Array','Rotation'],[
  ['[1,2,3,4]','[2,3,4,1]'],['[5,6,7,8]','[6,7,8,5]'],['[3,1,4,1]','[1,4,1,3]'],
  ['[9,0,1,2]','[0,1,2,9]'],['[7,8,9]','[8,9,7]'],['[1,5,3]','[5,3,1]'],
  ['[2,4,6,8]','[4,6,8,2]'],['[10,20,30]','[20,30,10]'],['[0,1,2,3,4]','[1,2,3,4,0]'],
  ['[1,1,1,2]','[1,1,2,1]'],['[3,5,7]','[5,7,3]'],['[4,3,2,1]','[3,2,1,4]'],
  ['[1,0]','[0,1]'],['[8,6,4,2]','[6,4,2,8]'],['[9,7,5,3,1]','[7,5,3,1,9]'],
  ['[2,3,5,7]','[3,5,7,2]'],['[1,2]','[2,1]'],['[5,4,3]','[4,3,5]'],
  ['[6,3,9,1]','[3,9,1,6]'],['[12,6,3]','[6,3,12]'],
]);

const MA6 = gen('ma-dup','Find Duplicate','Medium','Arrays',
  'Find the [[duplicate]] element in the array.',
  'The element appearing more than once',20,['Array','Hashing'],[
  ['[1,3,4,2,2]',2],['[3,1,3,4,2]',3],['[1,1,2,3]',1],['[2,3,4,2,5]',2],
  ['[5,1,5,2,3]',5],['[4,4,1,2,3]',4],['[6,1,2,3,6]',6],['[1,2,3,3]',3],
  ['[7,1,2,7,3]',7],['[9,1,9,2,3]',9],['[2,2,3,4,5]',2],['[1,4,4,2,3]',4],
  ['[5,6,5,7,8]',5],['[3,4,5,3,6]',3],['[8,7,8,6,5]',8],['[1,2,6,4,6]',6],
  ['[9,8,7,9,6]',9],['[2,3,4,5,2]',2],['[7,6,5,7,4]',7],['[3,4,3,5,6]',3],
]);

// ══════════════════════════════════════════════════════════════
// MEDIUM — STRINGS
// ══════════════════════════════════════════════════════════════
const MS1 = gen('ms-ana','Anagram Check','Medium','Strings',
  'Return [[true]] if the two strings are [[anagrams]], else [[false]].',
  'Sort both strings and compare',20,['String','Sorting'],[
  ['"listen","silent"','true'],['"hello","world"','false'],['"anagram","nagaram"','true'],
  ['"rat","car"','false'],['"triangle","integral"','true'],['"abc","cba"','true'],
  ['"node","done"','true'],['"code","coed"','true'],['"cat","bat"','false'],
  ['"cinema","iceman"','true'],['"dog","cat"','false'],['"eat","tea"','true'],
  ['"java","cave"','false'],['"arc","car"','true'],['"pots","stop"','true'],
  ['"brawl","warbl"','false'],['"race","care"','true'],['"stack","tasks"','false'],
  ['"note","tone"','true'],['"slow","owls"','true'],
]);

const MS2 = gen('ms-revw','Reverse Words','Medium','Strings',
  '[[Reverse]] the order of words in the sentence (not the characters).',
  'Split by space, reverse array, join',20,['String','Array'],[
  ['"hello world"','"world hello"'],['"the sky is blue"','"blue is sky the"'],
  ['"brawl ai"','"ai brawl"'],['"code is fun"','"fun is code"'],
  ['"a b c"','"c b a"'],['"one two three"','"three two one"'],
  ['"stack overflow"','"overflow stack"'],['"go east"','"east go"'],
  ['"left right"','"right left"'],['"keep coding"','"coding keep"'],
  ['"neural net"','"net neural"'],['"data and code"','"code and data"'],
  ['"fight or flight"','"flight or fight"'],['"up and down"','"down and up"'],
  ['"in out shake"','"shake out in"'],['"red blue green"','"green blue red"'],
  ['"first last"','"last first"'],['"abc def ghi"','"ghi def abc"'],
  ['"loop break"','"break loop"'],['"true false"','"false true"'],
]);

const MS3 = gen('ms-long','Longest Word','Medium','Strings',
  'Return the [[longest word]] in the sentence.',
  'Split by space, find max length word',20,['String','Searching'],[
  ['"code is fun"','"code"'],['"the sky is blue"','"blue"'],['"brawl ai wars"','"brawl"'],
  ['"go east now"','"east"'],['"stack and queue"','"stack"'],['"python rocks"','"python"'],
  ['"a long sentence"','"sentence"'],['"one more time"','"time"'],
  ['"very very important"','"important"'],['"neural networks"','"networks"'],
  ['"data structures"','"structures"'],['"algorithm design"','"algorithm"'],
  ['"binary search"','"binary"'],['"merge sort"','"merge"'],
  ['"dynamic programming"','"programming"'],['"two pointer"','"pointer"'],
  ['"hash map use"','"hash"'],['"array list"','"array"'],
  ['"recursion base"','"recursion"'],['"string builder"','"builder"'],
]);

const MS4 = gen('ms-cnt','Count Occurrences','Medium','Strings',
  'Count how many times the [[character]] appears in the string.',
  'Iterate and count matches',20,['String','Counting'],[
  ['"hello", char="l"',2],['"banana", char="a"',3],['"mississippi", char="s"',4],
  ['"programming", char="g"',2],['"brawl", char="r"',1],['"aabbcc", char="b"',2],
  ['"success", char="s"',3],['"pepper", char="p"',3],['"minimum", char="m"',3],
  ['"character", char="c"',2],['"occurrence", char="r"',2],['"abcabcabc", char="a"',3],
  ['"llll", char="l"',4],['"python", char="o"',1],['"java", char="a"',2],
  ['"coding", char="i"',1],['"level", char="l"',2],['"radar", char="r"',2],
  ['"reference", char="e"',3],['"algorithm", char="g"',1],
]);

// ══════════════════════════════════════════════════════════════
// MEDIUM — STACK / QUEUE / SEARCHING / SORTING
// ══════════════════════════════════════════════════════════════
const MStk1 = gen('ms-par','Valid Parentheses','Medium','Stack',
  'Return [[true]] if all parentheses/brackets are [[valid]], else [[false]].',
  'Use a stack: push open, pop and match close',20,['Stack','String'],[
  ['"()"','true'],['"()[]{}"','true'],['"(]"','false'],['"([)]"','false'],
  ['"{[]}"','true'],['"((("','false'],['""','true'],['"(())"','true'],
  ['"([{}])"','true'],['"[(])"','false'],['"{{{}}}x"','false'],
  ['"((()))"','true'],['"(((("','false'],['"{}(){}"','true'],
  ['"[{()}]"','true'],['"(["','false'],['"]}{"','false'],['"({})([])"','true'],
  ['"((()))()"','true'],['"([({})])"','true'],
]);

const MSearch1 = gen('ms-bin','Binary Search Result','Medium','Searching',
  'Return the [[index]] of the target using [[binary search]], or -1 if not found.',
  'Repeatedly halve the search space',20,['Searching','Array'],[
  ['[1,3,5,7,9], target=7',3],['[1,3,5,7,9], target=1',0],
  ['[1,3,5,7,9], target=9',4],['[1,3,5,7,9], target=4',-1],
  ['[2,4,6,8,10], target=6',2],['[2,4,6,8,10], target=2',0],
  ['[2,4,6,8,10], target=10',4],['[2,4,6,8,10], target=5',-1],
  ['[1,2,3,4,5,6,7], target=4',3],['[10,20,30,40,50], target=30',2],
  ['[10,20,30,40,50], target=10',0],['[10,20,30,40,50], target=50',4],
  ['[1,5,10,15,20], target=15',3],['[3,6,9,12,15], target=6',1],
  ['[1,2,3,4,5], target=5',4],['[1,2,3,4,5], target=1',0],
  ['[5,10,15,20,25], target=20',3],['[4,8,12,16,20], target=12',2],
  ['[1,3,5,7,9,11], target=11',5],['[2,6,10,14,18], target=6',1],
]);

// ══════════════════════════════════════════════════════════════
// MEDIUM — DP & RECURSION lite
// ══════════════════════════════════════════════════════════════
const MDp1 = gen('md-stair','Climb Stairs (ways)','Medium','Recursion',
  'Count [[ways]] to climb n stairs taking 1 or 2 steps at a time.',
  'f(n) = f(n-1) + f(n-2), f(1)=1, f(2)=2',20,['Recursion','DP'],[
  ['n=1',1],['n=2',2],['n=3',3],['n=4',5],['n=5',8],['n=6',13],
  ['n=7',21],['n=8',34],['n=9',55],['n=10',89],['n=11',144],['n=12',233],
  ['n=13',377],['n=14',610],['n=15',987],['n=16',1597],['n=17',2584],
  ['n=18',4181],['n=19',6765],['n=20',10946],
]);

const MDp2 = gen('md-gcd','GCD (Euclidean)','Medium','Math',
  'Return the [[GCD]] (Greatest Common Divisor) of the two numbers.',
  'Use Euclidean: gcd(a,b) = gcd(b, a%b)',20,['Math','Recursion'],[
  ['gcd(12,8)',4],['gcd(48,18)',6],['gcd(100,75)',25],['gcd(7,3)',1],
  ['gcd(9,6)',3],['gcd(28,21)',7],['gcd(56,98)',14],['gcd(15,5)',5],
  ['gcd(36,24)',12],['gcd(81,27)',27],['gcd(13,7)',1],['gcd(24,16)',8],
  ['gcd(30,45)',15],['gcd(60,40)',20],['gcd(100,60)',20],['gcd(42,28)',14],
  ['gcd(77,11)',11],['gcd(35,14)',7],['gcd(18,12)',6],['gcd(50,25)',25],
]);

// ══════════════════════════════════════════════════════════════
// HARD — ARRAYS / DP / STRINGS
// ══════════════════════════════════════════════════════════════
const HA1 = gen('ha-kad','Max Subarray Sum (Kadane)','Hard','Arrays',
  'Find the [[maximum subarray sum]] using Kadane\'s algorithm.',
  'Track current sum and reset to 0 when negative',40,['Array','DP'],[
  ['[-2,1,-3,4,-1,2,1,-5,4]',6],['[1]',1],['-2,-3,-4,-1',-1],
  ['[5,4,-1,7,8]',23],['[1,-2,3,-4,5]',5],['[2,3,-4,5,6]',12],
  ['[-1,-2,-3]',-1],['[8,-2,3,-4,5]',10],['[4,-2,2,3,-5,8]',10],
  ['[3,5,-9,1,3,-2,3,4,-6,1]',9],['[-5,1,2,-3,4,-1]',4],
  ['[1,2,3,4,5]',15],['[−1,2,3,−4,5]',6],['[6,−3,−2,7,−1]',8],
  ['[1,−1,1,−1,1]',1],['[2,−5,4,−3,5]',6],['[−2,−1,−3,−4]',-1],
  ['[10,−3,5,−2,4]',14],['[3,−2,5,−1,7]',12],['[1,2,−5,4,5]',9],
]);

const HA2 = gen('ha-long','Longest Substring (No Repeats)','Hard','Strings',
  'Find the [[length]] of the longest substring without [[repeating characters]].',
  'Sliding window with a hash set',40,['String','Sliding Window'],[
  ['"abcabcbb"',3],['"bbbbb"',1],['"pwwkew"',3],['"abcde"',5],
  ['"aab"',2],['"dvdf"',3],['"abba"',2],['"tmmzuxt"',5],
  ['"wobgrovw"',6],['"aabaab!bb"',3],['"geeksforgeeks"',7],
  ['"aaaaaa"',1],['"abcdefg"',7],['"au"',2],['"aab"',2],
  ['"nfpdmpi"',5],['"ohomm"',3],['"anviaj"',5],['"aabc"',3],['"abcdba"',4],
]);

const HA3 = gen('ha-stair','Min Coins','Hard','Math',
  'Return [[minimum coins]] needed to make the given amount (coins: 1,5,10,25).',
  'Greedy with denominations 25,10,5,1',40,['DP','Greedy'],[
  ['amount=30',2],['amount=11',2],['amount=1',1],['amount=5',1],
  ['amount=6',2],['amount=41',4],['amount=100',4],['amount=7',3],
  ['amount=36',3],['amount=51',3],['amount=26',2],['amount=15',2],
  ['amount=31',3],['amount=46',3],['amount=3',3],['amount=25',1],
  ['amount=50',2],['amount=75',3],['amount=99',9],['amount=10',1],
]);

const HA4 = gen('ha-merge','Merge Intervals','Hard','Arrays',
  '[[Merge]] all overlapping intervals. How many intervals remain?',
  'Sort by start, merge overlapping',40,['Array','Sorting'],[
  ['[[1,3],[2,6],[8,10]]',2],['[[1,4],[4,5]]',1],['[[1,2],[3,4],[5,6]]',3],
  ['[[1,4],[2,3]]',1],['[[1,3],[2,6],[8,10],[15,18]]',3],
  ['[[1,5],[6,8]]',2],['[[1,6],[5,9]]',1],['[[1,3],[3,5],[5,7]]',1],
  ['[[2,3],[4,5],[6,7],[8,9]]',4],['[[1,10],[2,3]]',1],
  ['[[1,2],[2,3],[3,4]]',1],['[[1,4],[0,4]]',1],['[[0,0],[1,2]]',2],
  ['[[1,3],[0,4],[2,5]]',1],['[[1,2],[3,5],[4,7],[6,8]]',3],
  ['[[1,4],[5,6],[7,8],[9,10]]',4],['[[0,1],[2,3],[4,5],[6,7]]',4],
  ['[[1,100]]',1],['[[1,3],[3,4],[4,7]]',1],['[[2,4],[4,6],[6,8],[8,10]]',1],
]);

const HA5 = gen('ha-fib-r','Recursive Fibonacci','Hard','Recursion',
  'Return fib(n) using [[recursion]] (0-indexed). What is fib(n)?',
  'fib(n) = fib(n-1) + fib(n-2)',40,['Recursion','DP'],[
  ['fib(10)',55],['fib(15)',610],['fib(20)',6765],['fib(12)',144],
  ['fib(18)',2584],['fib(5)',5],['fib(7)',13],['fib(9)',34],
  ['fib(11)',89],['fib(13)',233],['fib(14)',377],['fib(16)',987],
  ['fib(17)',1597],['fib(19)',4181],['fib(6)',8],['fib(8)',21],
  ['fib(25)',75025],['fib(22)',17711],['fib(21)',10946],['fib(23)',28657],
]);

const HA6 = gen('ha-pow','Power Function','Hard','Recursion',
  'Return the result of x raised to the power n: [[x^n]] (assume n≥0).',
  'Multiply x by itself n times recursively',40,['Recursion','Math'],[
  ['2^10',1024],['3^5',243],['5^3',125],['2^8',256],['4^4',256],
  ['7^2',49],['6^3',216],['2^15',32768],['3^7',2187],['10^3',1000],
  ['9^2',81],['2^12',4096],['5^4',625],['3^4',81],['4^3',64],
  ['8^3',512],['2^6',64],['7^3',343],['6^4',1296],['3^6',729],
]);

const HA7 = gen('ha-lcs','LCS Length','Hard','Arrays',
  'Find the [[length]] of the Longest Common Subsequence of the two strings.',
  'Classic DP: match chars or take max of directions',40,['DP','String'],[
  ['"abcde","ace"',3],['"abc","abc"',3],['"abc","def"',0],
  ['"ABCBDAB","BDCAB"',4],['"brawl","rawl"',4],['"code","node"',3],
  ['"abcde","aecbd"',3],['"AGGTAB","GXTXAYB"',4],
  ['"MZJAWXU","XMJYAUZ"',4],['"abc","ac"',2],['"abc","bc"',2],
  ['"sunday","saturday"',5],['"sea","eat"',2],['"abc","cbca"',2],
  ['"ABCD","ACDF"',3],['"GEEKS","GEKS"',4],['"brawl","rawls"',4],
  ['"1234","124"',3],['"abcba","abba"',4],['"XYZW","XYW"',3],
]);

const HA8 = gen('ha-upath','Unique Paths in Grid','Hard','DP',
  'Count [[unique paths]] from top-left to bottom-right in an m×n grid (only right/down).',
  'dp[i][j] = dp[i-1][j] + dp[i][j-1]',40,['DP','Math'],[
  ['2×2 grid',2],['2×3 grid',3],['3×2 grid',3],['3×3 grid',6],
  ['3×4 grid',10],['4×3 grid',10],['4×4 grid',20],
  ['2×4 grid',4],['4×2 grid',4],['5×5 grid',70],
  ['2×5 grid',5],['5×2 grid',5],['3×5 grid',15],['5×3 grid',15],
  ['3×6 grid',21],['6×3 grid',21],['4×5 grid',35],['5×4 grid',35],
  ['2×6 grid',6],['6×2 grid',6],
]);

const HA9 = gen('ha-qs','Quick Sort Pivot Element','Hard','Sorting',
  'After ONE partition pass with [[last element as pivot]], what is the pivot\'s final index?',
  'Count elements less than pivot',40,['Sorting','Array'],[
  ['[8,3,1,7,0,10,2], pivot=2',2],['[1,5,8,2,6,4], pivot=4',3],
  ['[3,5,2,1,6,4], pivot=4',3],['[9,3,7,1,5], pivot=5',3],
  ['[4,2,6,8,1,3], pivot=3',2],['[5,1,3,2,4], pivot=4',3],
  ['[7,4,2,6,1,3,5], pivot=5',4],['[1,2,3,4,5], pivot=5',4],
  ['[5,4,3,2,1], pivot=1',0],['[3,1,2], pivot=2',1],
  ['[6,3,9,2,5,1,4], pivot=4',3],['[2,8,7,1,3,5,6], pivot=6',4],
  ['[1,3,2,4], pivot=4',3],['[4,1,3,2], pivot=2',1],
  ['[5,6,1,3,2,4], pivot=4',3],['[8,2,4,7,1,3,6], pivot=6',4],
  ['[1,2,3], pivot=3',2],['[3,2,1], pivot=1',0],
  ['[4,3,2,1,5], pivot=5',4],['[9,1,7,2,6,3,5], pivot=5',4],
]);

const HA10 = gen('ha-dp-coin','Coin Change (min coins, infinite supply)','Hard','DP',
  'Minimum [[coins]] to make amount. Coins available: [1,2,5]. Return -1 if impossible.',
  'BFS or DP: try each coin at each step',40,['DP','Greedy'],[
  ['amount=11',3],['amount=0',0],['amount=1',1],['amount=2',1],
  ['amount=3',2],['amount=4',2],['amount=5',1],['amount=6',2],
  ['amount=7',2],['amount=8',3],['amount=9',3],['amount=10',2],
  ['amount=12',4],['amount=15',3],['amount=20',4],['amount=25',5],
  ['amount=30',6],['amount=7',2],['amount=14',4],['amount=21',5],
]);

// ══════════════════════════════════════════════════════════════
// ASSEMBLE ALL QUESTIONS
// ══════════════════════════════════════════════════════════════
export const ALL_QUESTIONS = [
  ...EA1,...EA2,...EA3,...EA4,...EA5,
  ...ES1,...ES2,...ES3,...ES4,...ES5,
  ...EM1,...EM2,...EM3,...EM4,...EM5,
  ...EStack1,...ESort1,
  ...MA1,...MA2,...MA3,...MA4,...MA5,...MA6,
  ...MS1,...MS2,...MS3,...MS4,
  ...MStk1,...MSearch1,...MDp1,...MDp2,
  ...HA1,...HA2,...HA3,...HA4,...HA5,
  ...HA6,...HA7,...HA8,...HA9,...HA10,
];

export const CATEGORIES = ['All','Arrays','Strings','Stack','Math','Sorting','Searching','Recursion','DP'];
export const DIFFICULTIES = ['All','Easy','Medium','Hard'];
