var Terminal = Terminal || function(cmdRequest, cmdResponse) {

    var cmdRequest_ = document.querySelector(cmdRequest);
    var cmdResponse_ = document.querySelector(cmdResponse);

    const WHOAMI = [
        "You are nothing more than a object of `Human` class that is referenced by some name, doing it's stuff in biophysical runtime environment of machine `Earth`."
    ];

    const WHOAREYOU = [
        "Unlike you, I'm not an object of `Human` class but I'm a programm."
    ];

    const ILOVEYOU = [
        "I respect your feelings, but i'm a program and understands only instructions."
    ];

    const JOKES = [
        "The best thing about a boolean is even if you are wrong, you are only off by a bit. (Anonymous)",
        "Without requirements or design, programming is the art of adding bugs to an empty text file. (Louis Srygley)",
        "Before software can be reusable it first has to be usable. (Ralph Johnson)",
        "The best method for accelerating a computer is the one that boosts it by 9.8 m/s2. (Anonymous)",
        "I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing. (Oktal)",
        "If builders built buildings the way programmers wrote programs, then the first woodpecker that came along wound destroy civilization. (Gerald Weinberg)",
        "There are two ways to write error-free programs; only the third one works. (Alan J. Perlis)",
        "Ready, fire, aim: the fast approach to software development. Ready, aim, aim, aim, aim: the slow approach to software development. (Anonymous)",
        "It’s not a bug – it’s an undocumented feature. (Anonymous)",
        "One man’s crappy software is another man’s full time job. (Jessica Gaston)",
        "A good programmer is someone who always looks both ways before crossing a one-way street. (Doug Linder)",
        "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. (Martin Golding",
        "Programming is like sex. One mistake and you have to support it for the rest of your life. (Michael Sinz)",
        "Deleted code is debugged code. (Jeff Sickel)",
        "Walking on water and developing software from a specification are easy if both are frozen. (Edward V Berard)",
        "If debugging is the process of removing software bugs, then programming must be the process of putting them in. (Edsger Dijkstra)",
        "Software undergoes beta testing shortly before it’s released. Beta is Latin for “still doesn’t work. (Anonymous)",
        "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the universe trying to produce bigger and better idiots. So far, the universe is winning. (Rick Cook)",
        "It’s a curious thing about our industry: not only do we not learn from our mistakes, we also don’t learn from our successes. (Keith Braithwaite)",
        "There are only two kinds of programming languages: those people always bitch about and those nobody uses. (Bjarne Stroustrup)",
        "In order to understand recursion, one must first understand recursion. (Anonymous)",
        "The cheapest, fastest, and most reliable components are those that aren’t there. (Gordon Bell)",
        "The best performance improvement is the transition from the nonworking state to the working state. (J. Osterhout)",
        "The trouble with programmers is that you can never tell what a programmer is doing until it’s too late. (Seymour Cray)",
        "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job. (Mosher’s Law of Software Engineering)"
    ];

    const CMDS_ = [
        'cat', 'clear', 'date', 'echo', 'file', 'help', 'history', 'ls', 'tellmesomething', 'whoami', 'whatis', 'whoareyou'
    ];

    const LS_ME = [
        'about.hts', 'contact.hts', 'education.hts', 'experience.hts', 'projects.hts', 'skills.hts'
    ];

    var userCmdHistory = [];
    var historyIndex = 0;
    var tempHistory = 0;

    window.addEventListener('click', function(e) {
        cmdRequest_.focus();
    }, false);

    cmdRequest_.addEventListener('click', function(e) {
        this.value = this.value;
    }, false);
    cmdRequest_.addEventListener('keydown', function(e) {
        if (userCmdHistory.length) {
            if (e.keyCode == 38 || e.keyCode == 40) {
                if (userCmdHistory[historyIndex]) {
                    userCmdHistory[historyIndex] = this.value;
                } else {
                    tempHistory = this.value;
                }
            }

            if (e.keyCode == 38) {
                if (historyIndex > 0) {
                    historyIndex--;
                }
            } else if (e.keyCode == 40) {
                if (historyIndex < userCmdHistory.length) {
                    historyIndex++;
                }
            }

            if (e.keyCode == 38 || e.keyCode == 40) {
                this.value = userCmdHistory[historyIndex] ? userCmdHistory[historyIndex] : tempHistory;
                this.value = this.value;
            }
        }
    }, false);

    cmdRequest_.addEventListener('keydown', function(e) {

        if (e.keyCode == 9) {
            e.preventDefault();
        } else if (e.keyCode == 13) {
            if (this.value) {
                userCmdHistory[userCmdHistory.length] = this.value;
                historyIndex = userCmdHistory.length;
            }
            var line = this.parentNode.parentNode.cloneNode(true);
            line.removeAttribute('id')
            line.classList.add('line');
            var input = line.querySelector('input.command-line-area');
            input.autofocus = false;
            input.readOnly = true;
            cmdResponse_.appendChild(line);

            if (this.value && this.value.trim()) {
                var args = this.value.split(' ').filter(function(val, i) {
                    return val;
                });
                var cmd = args[0].toLowerCase();
                args = args.splice(1);
            }

            switch (cmd) {
                case 'cat':
                    if (args[0].toLowerCase() == 'about.hts') {
                        output("A Third year Computer Science  student studying at Higher Institute of Technological Studies of Nabeul, Tunisia. I'm a Self-Motivated learner and command a good hold over the Basics of Programming. Computer Science began with the Hello World! program several years ago. My first language through which i have interacted with machines was C Programming language. Actually i spend more time on PHP, Java and bash i  love Linux so i used to use it as primary OS. moreover i write some JS script and i am a big supporter of FSF and OpenSource movment.");
                    } else if (args[0].toLowerCase() == 'projects.hts') {
                        output("SanskritaJyotsna<br>fileCoDoc<br>ChitChat<br>Ultrasonic Map Maker<br>");
                    } else if (args[0].toLowerCase() == 'skills.hts') {
                        output("Programming Languages :- C Programming, C++, JAVA Core & Advanced, JavaScript");
                        output("Scripting Languages&nbsp;&nbsp; :- PHP, Shell-Script");
                        output("Databases&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- MySql, MongoDB");
                        output("IDE's&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- Eclipse, IntelliJ IDEA, Dev C++, Atom");
                        output("Frameworks&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:- BootStrap(Web), Spring(Java)");
                    } else if (args[0].toLowerCase() == 'education.hts') {
                        output("NIIT University&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;August 2015 - Present<br>Bachelor of Technology(CSE)<br><br>CGPA : 7.69");
                        output("P.B.A.S Inter College&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;July 2013 - 2014<br>12th Standard<br><br>Result : 80%");
                        output("<br>**Key Interest**<br> Data Structure,<br>Design and Analysis of Algorithms,<br>Computer Architecture,<br>DataBases,<br>Operating Systems,<br>Networks,<br>Software Engineering");
                    } else if (args[0].toLowerCase() == 'achievement.hts') {

                    } else if (args[0].toLowerCase() == 'contact.hts') {
                        output("E-mail : <a href=\"mailto:aminelch95@gmail.com\" target=\"_blank\"><i>aminelch@gmail.com</i></a><br>Github : <a href=\"https://github.com/aminelch/\" target=\"_blank\"><i>@aminelch</i></a><br>Linkedin : <a href=\"https://www.linkedin.com/in/aminelch/\" target=\"_blank\"><i>aminelch</i></a>");
                    } else if (args[0].toLowerCase() == 'experience.hts') {
                        output("-");
                    } else {
                        output('cat: ' + args[0] + ' : No such file or directory');
                    }
                    break;
                case 'file':
                    if (args.length) {
                        if (LS_ME.indexOf(args[0]) != -1)

                            output(args[0] + ": ASCII text");
                        else {
                            output(args[0] + ": cannot open `" + args[0] + "` (No such file or directory)");
                        }
                    } else {
                        output("usage: file <u>file_name</u>");
                    }
                    break;
                case 'help':
                    output("HTS shell,<br>These shell commands are defined internally.<br>Type `help` to see this list.<br>Enter `whatis cmd` to see the one line description of command cmd.");
                    output('<div class="help">' + CMDS_.join('<br>') + '</div>');
                    break;
                case 'ls':
                    output('<div class="ls">' + LS_ME.join('<br>') + '</div>');
                    break;
                case 'history':
                    output(userCmdHistory.join('<br>'));
                    break;
                case 'whoami':
                    var whoamiindex = Math.floor(Math.random() * WHOAMI.length);
                    output(WHOAMI[whoamiindex]);
                    break;
                case 'whoareyou':
                    var whoareyouindex = Math.floor(Math.random() * WHOAREYOU.length);
                    output(WHOAREYOU[whoareyouindex]);
                    break;
                case 'iloveyou':
                    var iloveyouindex = Math.floor(Math.random() * ILOVEYOU.length);
                    output(ILOVEYOU[iloveyouindex]);
                    break;
                case 'tellmesomething':
                    var jokeindex = Math.floor(Math.random() * JOKES.length);
                    output(JOKES[jokeindex]);
                    break;
                case 'whatis':
                    if (args.length > 0) {
                        var i = 0;
                        for (i = 0; i < args.length; i++) {
                            if (args[i].toLowerCase() == "ls") {
                                output("ls&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- list directory contents");
                            } else if (args[i].toLowerCase() == "cat") {
                                output("cat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- concatenate files and print on the standard output");
                            } else if (args[i].toLowerCase() == "clear") {
                                output("clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- clear the terminal screen");
                            } else if (args[i].toLowerCase() == "date") {
                                output("date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- print or set the system date and time");
                            } else if (args[i].toLowerCase() == "echo") {
                                output("echo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- display a line of text");
                            } else if (args[i].toLowerCase() == "file") {
                                output("file&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- determine file type");
                            } else if (args[i].toLowerCase() == "history") {
                                output("history&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- HTS History Library");
                            } else if (args[i].toLowerCase() == "whoami") {
                                output("whoami&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- print a message");
                            } else if (args[i].toLowerCase() == "whatis") {
                                output("whatis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- display one-line manual page descriptions");
                            } else {
                                output(args[i] + ": command not found");
                            }
                        }
                    } else {
                        output('Whatis what?');
                    }
                    break;
                case 'date':
                    output(new Date());
                    break;
                case 'echo':
                    output(args.join(' '));
                    break;
                case 'clear':
                    cmdResponse_.innerHTML = '';
                    this.value = '';
                    return;
                default:
                    if (cmd) {
                        output(cmd + ': command not found');
                    }
            };
            window.scrollTo(0, document.body.scrollHeight);
            this.value = '';
        }
    }, false);

    function output(html) {
        cmdResponse_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
    }

    return {
        init: function() {
            output('<h2 style="letter-spacing: 4px; color:lime;">HTS Shell</h2><p>' + new Date() + '</p><p>Hello visitor!<br>I\'m HTS shell, designed by Amine Lch Student Of IT on Higher Institute of Technological Studies of Nabeul.<br>I was developed to help visitors to know about my owner in a little geeky way.</p><p>Enter `ls` to list the directory content.<br>Enter `cat file_name` to display the content of file_name.<br>Enter `help` for more information.</p>');
        },
        output: output
    }
};